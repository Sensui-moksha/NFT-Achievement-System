module achievement_system::achievement_nft {
    use std::string::{Self, String};
    use std::vector;
    use std::option::{Self, Option};
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::event::{Self, EventHandle};
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};
    use aptos_token_objects::collection;
    use aptos_token_objects::royalty;
    use aptos_token_objects::token;
    use aptos_token_objects::property_map;

    /// Error codes
    const EACHIEVEMENT_NOT_FOUND: u64 = 1;
    const EINSUFFICIENT_PERMISSIONS: u64 = 2;
    const EACHIEVEMENT_ALREADY_CLAIMED: u64 = 3;
    const EREQUIREMENTS_NOT_MET: u64 = 4;
    const ECOLLECTION_NOT_FOUND: u64 = 5;

    /// Achievement tiers
    const TIER_BRONZE: u8 = 1;
    const TIER_SILVER: u8 = 2;
    const TIER_GOLD: u8 = 3;
    const TIER_PLATINUM: u8 = 4;
    const TIER_DIAMOND: u8 = 5;

    /// Achievement categories
    const CATEGORY_TRADING: u8 = 1;
    const CATEGORY_SOCIAL: u8 = 2;
    const CATEGORY_GAMING: u8 = 3;
    const CATEGORY_DEFI: u8 = 4;
    const CATEGORY_COLLECTION: u8 = 5;
    const CATEGORY_MILESTONE: u8 = 6;
    const CATEGORY_SPECIAL: u8 = 7;

    /// Rarity levels
    const RARITY_COMMON: u8 = 1;
    const RARITY_UNCOMMON: u8 = 2;
    const RARITY_RARE: u8 = 3;
    const RARITY_EPIC: u8 = 4;
    const RARITY_LEGENDARY: u8 = 5;

    /// Achievement definition structure
    struct Achievement has store {
        id: String,
        name: String,
        description: String,
        category: u8,
        tier: u8,
        rarity: u8,
        points_required: u64,
        requirements: String,
        image_uri: String,
        is_active: bool,
        created_at: u64,
    }

    /// User achievement progress
    struct UserProgress has store {
        user_address: address,
        achievement_id: String,
        progress: u64,
        is_claimed: bool,
        claimed_at: Option<u64>,
    }

    /// Main resource for the achievement system
    struct AchievementSystem has key {
        achievements: Table<String, Achievement>,
        user_progress: Table<String, UserProgress>, // Key: user_address + achievement_id
        collection_name: String,
        admin: address,
        // Events
        achievement_created_events: EventHandle<AchievementCreatedEvent>,
        achievement_claimed_events: EventHandle<AchievementClaimedEvent>,
        progress_updated_events: EventHandle<ProgressUpdatedEvent>,
    }

    /// User's achievement collection
    struct UserAchievements has key {
        owned_achievements: vector<String>,
        total_points: u64,
        level: u64,
        joined_at: u64,
    }

    /// Events
    struct AchievementCreatedEvent has drop, store {
        achievement_id: String,
        name: String,
        tier: u8,
        category: u8,
        created_at: u64,
    }

    struct AchievementClaimedEvent has drop, store {
        user_address: address,
        achievement_id: String,
        token_address: address,
        claimed_at: u64,
    }

    struct ProgressUpdatedEvent has drop, store {
        user_address: address,
        achievement_id: String,
        progress: u64,
        updated_at: u64,
    }

    /// Initialize the achievement system
    public entry fun initialize(admin: &signer) {
        let admin_address = signer::address_of(admin);
        
        // Create the main collection for achievement NFTs
        let collection_name = string::utf8(b"Aptos Achievement Collection");
        let description = string::utf8(b"Achievement NFTs for outstanding accomplishments on Aptos");
        let uri = string::utf8(b"https://achievement-system.com/collection");
        
        collection::create_unlimited_collection(
            admin,
            description,
            collection_name,
            option::none(),
            uri,
        );

        // Initialize the achievement system
        move_to(admin, AchievementSystem {
            achievements: table::new(),
            user_progress: table::new(),
            collection_name,
            admin: admin_address,
            achievement_created_events: account::new_event_handle<AchievementCreatedEvent>(admin),
            achievement_claimed_events: account::new_event_handle<AchievementClaimedEvent>(admin),
            progress_updated_events: account::new_event_handle<ProgressUpdatedEvent>(admin),
        });
    }

    /// Create a new achievement (admin only)
    public entry fun create_achievement(
        admin: &signer,
        achievement_id: String,
        name: String,
        description: String,
        category: u8,
        tier: u8,
        rarity: u8,
        points_required: u64,
        requirements: String,
        image_uri: String,
    ) acquires AchievementSystem {
        let admin_address = signer::address_of(admin);
        let system = borrow_global_mut<AchievementSystem>(@achievement_system);
        assert!(admin_address == system.admin, EINSUFFICIENT_PERMISSIONS);

        let achievement = Achievement {
            id: achievement_id,
            name,
            description,
            category,
            tier,
            rarity,
            points_required,
            requirements,
            image_uri,
            is_active: true,
            created_at: timestamp::now_seconds(),
        };

        table::add(&mut system.achievements, achievement_id, achievement);

        // Emit event
        event::emit_event(&mut system.achievement_created_events, AchievementCreatedEvent {
            achievement_id,
            name,
            tier,
            category,
            created_at: timestamp::now_seconds(),
        });
    }

    /// Initialize user achievements tracking
    public entry fun initialize_user(user: &signer) {
        let user_address = signer::address_of(user);
        
        if (!exists<UserAchievements>(user_address)) {
            move_to(user, UserAchievements {
                owned_achievements: vector::empty(),
                total_points: 0,
                level: 1,
                joined_at: timestamp::now_seconds(),
            });
        };
    }

    /// Update user progress for an achievement
    public entry fun update_progress(
        user_address: address,
        achievement_id: String,
        progress: u64,
    ) acquires AchievementSystem {
        let system = borrow_global_mut<AchievementSystem>(@achievement_system);
        let progress_key = generate_progress_key(user_address, achievement_id);
        
        if (table::contains(&system.user_progress, progress_key)) {
            let user_progress = table::borrow_mut(&mut system.user_progress, progress_key);
            user_progress.progress = progress;
        } else {
            table::add(&mut system.user_progress, progress_key, UserProgress {
                user_address,
                achievement_id,
                progress,
                is_claimed: false,
                claimed_at: option::none(),
            });
        };

        // Emit event
        event::emit_event(&mut system.progress_updated_events, ProgressUpdatedEvent {
            user_address,
            achievement_id,
            progress,
            updated_at: timestamp::now_seconds(),
        });
    }

    /// Claim an achievement NFT
    public entry fun claim_achievement(
        user: &signer,
        achievement_id: String,
    ) acquires AchievementSystem, UserAchievements {
        let user_address = signer::address_of(user);
        let system = borrow_global_mut<AchievementSystem>(@achievement_system);
        
        // Check if achievement exists
        assert!(table::contains(&system.achievements, achievement_id), EACHIEVEMENT_NOT_FOUND);
        let achievement = table::borrow(&system.achievements, achievement_id);
        
        // Check user progress
        let progress_key = generate_progress_key(user_address, achievement_id);
        assert!(table::contains(&system.user_progress, progress_key), EREQUIREMENTS_NOT_MET);
        
        let user_progress = table::borrow_mut(&mut system.user_progress, progress_key);
        assert!(!user_progress.is_claimed, EACHIEVEMENT_ALREADY_CLAIMED);
        assert!(user_progress.progress >= achievement.points_required, EREQUIREMENTS_NOT_MET);

        // Initialize user achievements if needed
        initialize_user(user);
        
        // Mint the achievement NFT
        let token_name = achievement.name;
        let description = achievement.description;
        
        let token = token::create_named_token(
            user,
            system.collection_name,
            description,
            token_name,
            option::none(),
            achievement.image_uri,
        );

        let token_address = object::address_from_constructor_ref(&token);

        // Update user progress
        user_progress.is_claimed = true;
        user_progress.claimed_at = option::some(timestamp::now_seconds());

        // Update user achievements
        let user_achievements = borrow_global_mut<UserAchievements>(user_address);
        vector::push_back(&mut user_achievements.owned_achievements, achievement_id);
        user_achievements.total_points = user_achievements.total_points + achievement.points_required;
        user_achievements.level = calculate_level(user_achievements.total_points);

        // Emit event
        event::emit_event(&mut system.achievement_claimed_events, AchievementClaimedEvent {
            user_address,
            achievement_id,
            token_address,
            claimed_at: timestamp::now_seconds(),
        });
    }

    /// Generate progress key for table lookup
    fun generate_progress_key(user_address: address, achievement_id: String): String {
        let user_str = string::utf8(bcs::to_bytes(&user_address));
        string::append(&mut user_str, string::utf8(b"_"));
        string::append(&mut user_str, achievement_id);
        user_str
    }

    /// Calculate user level based on total points
    fun calculate_level(total_points: u64): u64 {
        (total_points / 1000) + 1
    }

    /// View functions

    #[view]
    public fun get_achievement(achievement_id: String): Achievement acquires AchievementSystem {
        let system = borrow_global<AchievementSystem>(@achievement_system);
        *table::borrow(&system.achievements, achievement_id)
    }

    #[view]
    public fun get_user_progress(user_address: address, achievement_id: String): (u64, bool) acquires AchievementSystem {
        let system = borrow_global<AchievementSystem>(@achievement_system);
        let progress_key = generate_progress_key(user_address, achievement_id);
        
        if (table::contains(&system.user_progress, progress_key)) {
            let user_progress = table::borrow(&system.user_progress, progress_key);
            (user_progress.progress, user_progress.is_claimed)
        } else {
            (0, false)
        }
    }

    #[view]
    public fun get_user_achievements(user_address: address): (vector<String>, u64, u64) acquires UserAchievements {
        if (exists<UserAchievements>(user_address)) {
            let user_achievements = borrow_global<UserAchievements>(user_address);
            (user_achievements.owned_achievements, user_achievements.total_points, user_achievements.level)
        } else {
            (vector::empty(), 0, 1)
        }
    }

    #[view]
    public fun is_achievement_claimable(user_address: address, achievement_id: String): bool acquires AchievementSystem {
        let system = borrow_global<AchievementSystem>(@achievement_system);
        let progress_key = generate_progress_key(user_address, achievement_id);
        
        if (table::contains(&system.user_progress, progress_key) && 
            table::contains(&system.achievements, achievement_id)) {
            let user_progress = table::borrow(&system.user_progress, progress_key);
            let achievement = table::borrow(&system.achievements, achievement_id);
            !user_progress.is_claimed && user_progress.progress >= achievement.points_required
        } else {
            false
        }
    }
}