# 06 – Backend & DB Integration

## Goals
1. Connect all front-end stubs to Supabase/PostgreSQL via Drizzle ORM.
2. Replace local mock data with actual DB queries and mutations.
3. Implement server actions for game creation, item uploads, and session management **using the new multi-user and session/round logic**.
4. Ensure every table/relationship from our [db-schema.md](../db-schema.md) is properly implemented.

## Key Tasks

1. **Finalize DB Schema**  
   - Refer to [db-schema.md](../db-schema.md) for the comprehensive design.
   - Create new schema files in `db/schema/` for:
     - `accounts`
     - `profiles` (expanded to include `account_id`)
     - `games`, `game_items`
     - `cards`
     - `sessions`, `calls`, `claims`
   - Ensure that we also handle relationships such as:
     - `profiles.account_id` -> `accounts.id`  
     - `games.created_by` -> `profiles.user_id`  
     - `cards.owner_user_id` -> `profiles.user_id` (if not null)  
     - `games.account_id` -> `accounts.id`

2. **Server Actions for CRUD**  
   - Create actions to handle:
     - **Accounts**: Create or update an account (if we allow new orgs to form).  
     - **Profiles**: Possibly just read/update since Clerk is the main identity system.  
     - **Games & Items**: CRUD for new games.  
     - **Cards**: Generate a set of cards (in bulk or one-off).  
     - **Sessions & Calls**: Start a live session, store calls, handle session pause/resume.  
     - **Claims**: Insert a new claim, validate or reject it.

3. **Refactor Front-End** (Placeholder Data → Real DB)  
   - Wizard steps in the “Create New Game” flow now write the new game, items, etc. to the DB.  
   - Card generation uses real data to produce cards, storing them in `cards` table.  
   - Live session UI uses server actions to fetch session data in real time, or near-real time.

4. **Multi-User Account Logic**  
   - Ensure that if an `account_id` is present, multiple users can access the same set of `games`.  
   - For example, the `dashboard` queries all `games` where `created_by = userId OR account_id = userProfile.account_id`.

5. **ID/Validation**  
   - Decide how we generate short codes for `cards.unique_code`.  
   - Ensure claims checking references the `calls` to confirm if the card has a winning pattern.

6. **Performance Emphasis**  
   - We use Next.js **Server Actions** for efficient DB writes.  
   - For real-time calls or user interactions, we can add incremental improvements (like Supabase real-time listeners) if needed.

## Completion Criteria
- **All “Create New Game” steps** write data to the DB matching our schema.
- **Live session** creation uses `sessions` and `calls` to store calls in real time (or near-real time).
- **Card ownership** (online or PDF-based) is possible and stored.
- The application runs end-to-end with real data, including multi-user account support.
