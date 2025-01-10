File: 06-backend-and-db-integration.md

# 06 – Backend & DB Integration

## Goals
1. Connect all front-end stubs to Supabase/PostgreSQL via Drizzle ORM.
2. Replace local mock data with actual DB queries and mutations.
3. Implement server actions for game creation, item uploads, and session management.

## Key Tasks
- Create DB schemas for games, items, sessions, calls, etc., in `db/schema`.
- Write server actions under `actions/db/*` to handle CRUD for:
  - Creating/editing games
  - Generating card data
  - Managing live session calls
- Update the front-end pages to call real server actions.
- Ensure data is persisted and retrieved correctly.

## Completion Criteria
- All “Create New Game” steps write to the DB.
- Live session calls are fetched and stored in real time.
- Player card data (text/image references) is loaded from the DB.
- The application runs end-to-end with real data.
