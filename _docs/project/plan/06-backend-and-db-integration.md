# 06 – Backend & DB Integration

## Goals
1. Connect front-end stubs to Supabase/PostgreSQL via Drizzle ORM.
2. Replace local data with real DB queries/mutations.
3. Implement server actions for new multi-user, multi-round logic.
4. Ensure we handle **Lists**, **List Items**, **Card Types**, and more from [db-schema.md](../db-schema.md).

## Key Tasks

1. **Finalize DB Schema**
   - `accounts`, `profiles`, `games`.
   - `lists`, `list_items`.
   - `card_types`, `cards`.
   - `sessions`, `calls`, `claims`.

2. **Server Actions for CRUD**
   - **Lists**: create/edit a list, add list items (including images).
   - **CardTypes**: layout settings, referencing a list.
   - **Cards**: generate from a card type’s item pool.
   - **Sessions & Calls**: start session, store calls, pause/resume.
   - **Claims**: log claims, validate/reject.

3. **Refactor Front-End** (Placeholder → Real DB)
   - The new “Game” page fetches real Lists, Card Types, etc.
   - Card generation uses real items in the DB.
   - Live Session references actual calls.

4. **Multi-User Account Logic**
   - If `account_id` is present, multiple users can see the same `games`.
   - E.g., dashboard queries all games where `(created_by = userId) OR (account_id = userProfile.account_id)`.

5. **ID/Validation**
   - Decide how short codes (`cards.unique_code`) are generated.
   - Ensure claim-checking references the `calls` table to confirm a valid pattern.

6. **Performance**
   - Use Next.js Server Actions for efficient DB writes.
   - Consider real-time updates (websockets, Supabase Realtime) if needed.

## Completion Criteria
- All “New Game” flows write data to the DB (game, lists, card types, etc.).
- Sessions store calls in real time.
- Card ownership (online or PDF) is persisted.
- The app runs end-to-end with real data, including multi-user account support.
