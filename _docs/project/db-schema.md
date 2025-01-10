# Comprehensive Database Schema

This file outlines our planned database schema for Bingo Manager. It aims for a robust multi-user account approach, session/round logic, and card-tracking that meets all functional requirements in [functionality-requirements.md](./functionality-requirements.md).

> **Note**  
> This schema is still subject to iteration and refinement during implementation.

---

## 1. Profiles & Account Management

Because we are using [Clerk](https://clerk.com/) for auth, some user fields (email, name, etc.) are primarily stored in Clerk. We store the rest in our `profiles` table.

### `profiles` Table

| Column               | Type                | Description                                                                                                                                                         |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`            | `text` (PK)         | References the Clerk user ID.                                                                                                                                       |
| `membership`         | enum `membership`   | Either `"free"` or `"pro"` (extendable if we add more membership tiers).                                                                                            |
| `stripe_customer_id` | `text` (nullable)   | If user is paying customer; otherwise `NULL`.                                                                                                                       |
| `stripe_subscription_id` | `text` (nullable) | If user has an active subscription.                                                                                                                                |
| `account_id`         | `uuid` (nullable)   | If the user belongs to a multi-user "account" or "team," store that ID here. If a user is brand new or uses personal account, can be `NULL` or point to a "personal" row in `accounts`. |
| `created_at`         | `timestamp`         | Defaults to `now()`.                                                                                                                                                |
| `updated_at`         | `timestamp`         | Defaults to `now()`, auto-updates.                                                                                                                                  |

> **Multi-User Accounts**  
> The `account_id` column references a separate table (`accounts`) that collects multiple users under one organizational umbrella. This design lets multiple users collaborate on the same set of Bingo Games if desired (e.g., a school or business scenario).

### `accounts` Table

| Column         | Type         | Description                                                                   |
| -------------- | ------------ | ----------------------------------------------------------------------------- |
| `id`           | `uuid` (PK)  | Auto-generated.                                                               |
| `name`         | `text`       | Display name of the account or organization.                                  |
| `account_type` | `text`       | (Optional) For future expansions, e.g., `"school"`, `"business"`, `"personal"` |
| `created_at`   | `timestamp`  | Defaults to `now()`.                                                          |
| `updated_at`   | `timestamp`  | Defaults to `now()`, auto-updates.                                            |

> **Note**: For advanced permissioning, you might add a pivot table `account_members` with role columns (`owner`, `member`, etc.) if you want more granular permissions. Alternatively, you can keep a simple design that the account “owner” is the main user, and other profiles referencing the same `account_id` are co-members.

---

## 2. Game Model

A Bingo “Game” can be in states like “Draft,” “Live,” or “Completed.” We store the core metadata in `games`.

### `games` Table

| Column           | Type          | Description                                                                                                                 |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `uuid` (PK)   | Auto-generated.                                                                                                             |
| `account_id`     | `uuid`        | References `accounts(id)`; if `NULL`, the game belongs solely to one user (`created_by`).                                   |
| `created_by`     | `text`        | Clerk `user_id` from the `profiles` table.                                                                                 |
| `title`          | `text`        | Name of the Bingo Game.                                                                                                    |
| `description`    | `text`        | Optional.                                                                                                                   |
| `theme`          | `text`        | For UI theming.                                                                                                             |
| `language`       | `text`        | E.g. `en-US`.                                                                                                               |
| `status`         | `text`        | `"Draft"`, `"Live"`, `"Completed"`, etc.                                                                                   |
| `grid_size`      | `int`         | e.g., 3, 4, 5, etc.                                                                                                         |
| `winning_types`  | `text[]`      | e.g. `["single_line", "blackout"]`, stored as array if your DB supports it or separate table if you prefer.                 |
| `call_mode`      | `text`        | `"manual"` or `"timed"`.                                                                                                    |
| `rounds_enabled` | `boolean`     | If multiple rounds are supported.                                                                                          |
| `created_at`     | `timestamp`   | Defaults to `now()`.                                                                                                        |
| `updated_at`     | `timestamp`   | Defaults to `now()`, auto-updates.                                                                                          |

> **Templates**  
> We can add a boolean or store them in a separate `game_templates` table if you want to differentiate.  

---

## 3. Items / GameItems

Each Bingo item can be text or image-based. We store item references in a separate table, linked to the `games` table.

### `game_items` Table

| Column     | Type          | Description                                                                          |
| ---------- | ------------- | ------------------------------------------------------------------------------------ |
| `id`       | `uuid` (PK)   | Auto-generated.                                                                      |
| `game_id`  | `uuid`        | References `games(id)`, cascade on delete.                                           |
| `content`  | `text`        | If text-based.                                                                        |
| `image_url`| `text`        | If image-based. Can be `NULL`.                                                       |
| `order_idx`| `int`         | (Optional) If we want to store a default display order for items.                     |
| `created_at`| `timestamp`  | Defaults to `now()`.                                                                  |
| `updated_at`| `timestamp`  | Defaults to `now()`, auto-updates.                                                   |

> **Note**: If you’re enabling advanced item features (like cropping or separate storage references), add columns as needed.

---

## 4. Bingo Cards

Each Bingo card is an N×N arrangement of items for a single user. If it’s a “printed” card, a user may not exist yet, but we can store a unique URL or code. If it’s an “online” card, we can tie it to a `profiles` user.

### `cards` Table

| Column        | Type          | Description                                                                                  |
| ------------- | ------------- | -------------------------------------------------------------------------------------------- |
| `id`          | `uuid` (PK)   | Auto-generated.                                                                              |
| `game_id`     | `uuid`        | References `games(id)`.                                                                      |
| `owner_user_id` | `text`      | May be `NULL` if an anonymous or printed card. Else references `profiles(user_id)`.          |
| `unique_code` | `text`        | Used for PDF-based “anonymous” card tracking. Could be a short, unique code to identify.     |
| `layout_data` | `jsonb`       | A JSON representation of which items appear in each cell, e.g., `[item_id, item_id, …]`.     |
| `created_at`  | `timestamp`   | Defaults to `now()`.                                                                          |
| `updated_at`  | `timestamp`   | Defaults to `now()`, auto-updates.                                                           |

> **How “marked” cells are stored?**  
> - Option 1: Keep a `marks` array or JSON in the `cards` row, updated as players mark squares.  
> - Option 2: A separate table `card_marks` keyed by `card_id` and `item_id`, storing whether it’s marked.  

For smaller scale, storing as JSON in `cards` is simpler. For large scale real-time concurrency, a separate table might be more performant and consistent.

---

## 5. Sessions & Rounds

When a Bingo game goes “live,” we spin up a “Session” for real-time calls. If the game has multiple rounds, each round is tracked in the same session or separate sessions.

### `sessions` Table

| Column        | Type          | Description                                                                           |
| ------------- | ------------- | ------------------------------------------------------------------------------------- |
| `id`          | `uuid` (PK)   | Auto-generated.                                                                       |
| `game_id`     | `uuid`        | References `games(id)`.                                                               |
| `round_index` | `int`         | If multiple rounds, store which round we’re on.                                       |
| `is_active`   | `boolean`     | `true` if session is ongoing, `false` if ended.                                       |
| `start_time`  | `timestamp`   | When session started.                                                                 |
| `end_time`    | `timestamp`   | When session ended, if any.                                                           |
| `created_at`  | `timestamp`   | Defaults to `now()`.                                                                  |
| `updated_at`  | `timestamp`   | Defaults to `now()`, auto-updates.                                                   |

> **One-Game Approach**  
> If we only run one session at a time per game, the `round_index` can track multiple sub-rounds. Alternatively, store them in a separate `rounds` table for more detail.

### `calls` Table

Tracks each item called in real-time. Optionally store `session_id` plus the index or time.

| Column       | Type          | Description                                                        |
| ------------ | ------------- | ------------------------------------------------------------------ |
| `id`         | `uuid` (PK)   | Auto-generated.                                                    |
| `session_id` | `uuid`        | References `sessions(id)`.                                         |
| `item_id`    | `uuid`        | References `game_items(id)` or a textual label for the item.       |
| `call_order` | `int`         | The order in which items were called.                              |
| `called_at`  | `timestamp`   | Defaults to `now()`.                                               |

---

## 6. Claims & Validation

When a player clicks “Claim Bingo,” we log a row in `claims`.

### `claims` Table

| Column       | Type          | Description                                                                                 |
| ------------ | ------------- | ------------------------------------------------------------------------------------------- |
| `id`         | `uuid` (PK)   | Auto-generated.                                                                             |
| `session_id` | `uuid`        | References `sessions(id)`.                                                                  |
| `card_id`    | `uuid`        | References `cards(id)`.                                                                     |
| `claimed_by` | `text`        | Clerk `user_id` or `NULL` if not a known user (paper card).                                 |
| `claimed_at` | `timestamp`   | Defaults to `now()`.                                                                        |
| `is_valid`   | `boolean`     | `true` or `false` if the Organizer validated or rejected. `NULL` if not yet reviewed.       |
| `validated_at` | `timestamp` | If `is_valid` is set, store the time.                                                      |

---

## 7. ID Generation & Persistence

- **UUIDs** are the default for table primary keys.  
- **Short Codes** or more user-friendly IDs can be stored for “anonymous” flows or PDF-based distribution. For instance, `cards.unique_code` might be a random short string (“H8QZ7P”) so that a user with a PDF can type in “H8QZ7P” to claim.

---

## 8. Performance & Scalability Notes

We plan on:
- **Using Server Actions**: This is how front-end components will query/mutate the DB efficiently.  
- For large events, real-time calls can be done via:
  - **Frequent Server Action** calls or
  - A future enhancement of websockets or dedicated real-time listeners (e.g., Supabase Realtime).

When calling items, we keep concurrency low by letting only the Organizer or Co-Organizer trigger calls. Players push “marks” to the DB or ephemeral local state. We will refine if we see concurrency issues.

---

## 9. Future Enhancements

- **account_members** pivot for more advanced roles.  
- **stats** table to store aggregated results for each session (total calls, time to first bingo, etc.).  
- **archived** or **deleted** status for old games.  

---

**In summary**, these tables cover:

- **Account/Team Management**: `accounts`, `profiles`  
- **Game Structures**: `games`, `game_items`  
- **Cards & Ownership**: `cards` (+ optional `card_marks`)  
- **Live Play**: `sessions`, `calls`, `claims`  

We will align the actual Drizzle schemas in `db/schema/*.ts` with these references. If we discover new requirements, we’ll update accordingly.
