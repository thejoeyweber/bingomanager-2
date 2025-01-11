# 06 – Backend & DB Integration

## Goals
1. Connect front-end stubs to Supabase/PostgreSQL via Drizzle ORM.
2. Replace local data with real DB queries/mutations.
3. Implement server actions for multi-user, multi-round logic (if round-based).
4. Ensure we handle **Lists**, **List Items**, **Card Types**, etc. from [db-schema.md](../db-schema.md).
5. Implement basic email invites via **SendGrid**.

## Key Tasks

1. **Finalize DB Schema**
   - `accounts`, `profiles`, `games`.
   - `lists`, `list_items`.
   - `card_types`, `cards`.
   - `sessions`, `calls`, `claims`.
   - Single-round approach for v1; can extend to multi-round if needed.

2. **Server Actions for CRUD**
   - **Lists**: create/edit a list, add list items (including images via Supabase).
   - **CardTypes**: layout settings, referencing a list.
   - **Cards**: generate from a card type’s item pool.
   - **Sessions & Calls**: start session, store calls, pause/resume.
   - **Claims**: log claims, validate/reject.

3. **Refactor Front-End** (Placeholder → Real DB)
   - The new “Game” page fetches real Lists, Card Types, etc. from the database.
   - Card generation uses real items in the DB (paired with pdf-lib in Step 05).
   - Live Session references actual calls, with minimal polling for real-time.

4. **Multi-User Account Logic**
   - If `account_id` is present, multiple users can see the same `games`.
   - E.g., query all games where `(created_by = userId) OR (account_id = userProfile.account_id)`.

5. **Email Invites with SendGrid**
   - Provide a server action that sends email invites to players, if the user chooses to send them. 
   - Store any relevant logging info (optional).

6. **Performance**
   - Use Next.js Server Actions for efficient DB writes.
   - For real-time concurrency beyond small events, plan on websockets or Supabase Realtime in Step 08.

## Completion Criteria
- All “New Game” flows write data to the DB (game, lists, card types, etc.).
- Sessions store calls in real time (via minimal polling).
- Card ownership (online or PDF) is persisted.
- Email invites can be sent out via SendGrid when generating cards.
- The app runs end-to-end with real data.
