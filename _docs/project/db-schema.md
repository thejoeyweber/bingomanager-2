# Comprehensive Database Schema

This file outlines our planned database schema for Bingo Manager, reflecting our **new** approach with **Lists**, **List Items**, **Card Types**, etc. We aim for a robust multi-user account approach, session/round logic, and card-tracking that meets [functionality-requirements.md](./functionality-requirements.md).

---

## 1. Profiles & Account Management

We use [Clerk](https://clerk.com/) for auth, so some user data (email, name, etc.) is primarily in Clerk. We store the rest in our `profiles` table.

### `profiles` Table

| Column               | Type              | Description                                                                                                       |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `user_id`            | text (PK)         | References the Clerk user ID.                                                                                     |
| `membership`         | enum `membership` | Either `"free"` or `"pro"`.                                                                                       |
| `stripe_customer_id` | text (nullable)   | If user is paying customer; otherwise `NULL`.                                                                     |
| `stripe_subscription_id` | text (nullable) | If user has an active subscription.                                                                              |
| `account_id`         | uuid (nullable)   | If user belongs to a multi-user "account" or "team," store that ID. Otherwise `NULL`.                             |
| `created_at`         | timestamp         | Defaults to `now()`.                                                                                              |
| `updated_at`         | timestamp         | Defaults to `now()`, auto-updates.                                                                                |

### `accounts` Table

| Column         | Type       | Description                                                     |
| -------------- | ---------- | --------------------------------------------------------------- |
| `id`           | uuid (PK)  | Auto-generated.                                                 |
| `name`         | text       | Display name of the account or organization.                    |
| `account_type` | text       | (Optional) e.g., `"school"`, `"business"`, `"personal"`.        |
| `created_at`   | timestamp  | Defaults to `now()`.                                            |
| `updated_at`   | timestamp  | Defaults to `now()`, auto-updates.                              |

---

## 2. Game Model

A Bingo “Game” can be “Draft,” “Live,” or “Completed.” The `games` table holds overall metadata.

### `games` Table

| Column         | Type        | Description                                                                    |
| -------------- | ----------- | ------------------------------------------------------------------------------ |
| `id`           | uuid (PK)   | Auto-generated.                                                                |
| `account_id`   | uuid        | References `accounts(id)` if multi-user. `NULL` if single-user.                |
| `created_by`   | text        | Clerk `user_id` from the `profiles` table.                                     |
| `title`        | text        | Name of the Bingo Game.                                                        |
| `description`  | text        | Optional.                                                                      |
| `theme`        | text        | For UI theming.                                                                |
| `language`     | text        | E.g. `en-US`.                                                                  |
| `status`       | text        | `"Draft"`, `"Live"`, `"Completed"`, etc.                                       |
| `call_mode`    | text        | Default call mode if not overridden (`"manual"` or `"timed"`).                 |
| `created_at`   | timestamp   | Defaults to `now()`.                                                           |
| `updated_at`   | timestamp   | Defaults to `now()`, auto-updates.                                             |

> **Note**: In the older schema, we had `grid_size` and `winning_types` in `games`. Now, those are handled by **Card Types** or **Sessions**, as needed. The old approach is **archived**.

---

## 3. Lists & List Items

A **List** is a set of items that can be reused across multiple Games and Card Types.

### `lists` Table

| Column          | Type       | Description                                                               |
| --------------- | ---------- | ------------------------------------------------------------------------- |
| `id`            | uuid (PK)  | Auto-generated.                                                           |
| `name`          | text       | E.g. “Standard 75-ball Bingo” or “My Custom Holiday Words.”               |
| `description`   | text       | Optional.                                                                 |
| `visibility`    | text       | e.g., `"private"`, `"community"`, `"starter"`.                            |
| `owner_user_id` | text       | If user-specific; `NULL` if global or community.                          |
| `created_at`    | timestamp  | Defaults to `now()`.                                                      |
| `updated_at`    | timestamp  | Defaults to `now()`, auto-updates.                                        |

### `list_items` Table

| Column         | Type      | Description                                                                                          |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `id`           | uuid (PK) | Auto-generated.                                                                                      |
| `list_id`      | uuid      | References `lists(id)`, cascade on delete.                                                           |
| `text_content` | text      | If textual (word, phrase, or number). May be `NULL` if using only an image.                          |
| `image_url`    | text      | If image-based. May be `NULL` if purely textual.                                                     |
| `caption`      | text      | Optional caption if `image_url` is set.                                                              |
| `is_mandatory` | boolean   | If `true`, item must appear on all cards referencing this list.                                      |
| `created_at`   | timestamp | Defaults to `now()`.                                                                                 |
| `updated_at`   | timestamp | Defaults to `now()`, auto-updates.                                                                   |

---

## 4. Card Types

A **Card Type** (or “Card Layout”) associates exactly one **List** with specific layout parameters.

### `card_types` Table

| Column             | Type       | Description                                                            |
| ------------------ | ---------- | ---------------------------------------------------------------------- |
| `id`               | uuid (PK)  | Auto-generated.                                                        |
| `game_id`          | uuid       | References `games(id)`.                                                |
| `list_id`          | uuid       | References `lists(id)`.                                                |
| `name`             | text       | E.g. “Round 1: 5x5 Classic.”                                           |
| `grid_size`        | int        | E.g. 5 for 5x5, 4 for 4x4, etc.                                        |
| `has_free_space`   | boolean    |                                                                        |
| `free_space_text`  | text       | E.g. “FREE” if `has_free_space` is true.                               |
| `color_scheme`     | jsonb      | Optional JSON or multiple columns for theming.                         |
| `override_call_mode` | text     | If set, overrides the game’s default call mode.                        |
| `created_at`       | timestamp  | Defaults to `now()`.                                                   |
| `updated_at`       | timestamp  | Defaults to `now()`, auto-updates.                                     |

---

## 5. Bingo Cards

An individual Bingo card is generated from a **Card Type** and an associated list of items.

### `cards` Table

| Column         | Type       | Description                                                               |
| -------------- | ---------- | ------------------------------------------------------------------------- |
| `id`           | uuid (PK)  | Auto-generated.                                                           |
| `card_type_id` | uuid       | References `card_types(id)`.                                              |
| `owner_user_id`| text       | If assigned to a specific user (online). `NULL` if printed/anonymous.     |
| `unique_code`  | text       | For PDF-based or “anonymous” card tracking.                               |
| `layout_data`  | jsonb      | JSON of how items from the List are arranged on this card.                |
| `created_at`   | timestamp  | Defaults to `now()`.                                                      |
| `updated_at`   | timestamp  | Defaults to `now()`, auto-updates.                                        |

---

## 6. Sessions & Rounds

When the game goes “live,” a **Session** is created. For v1, we typically run a single round per session. Future expansions can store multiple rounds in a separate table.

### `sessions` Table

| Column       | Type       | Description                                              |
| ------------ | ---------- | -------------------------------------------------------- |
| `id`         | uuid (PK)  | Auto-generated.                                         |
| `game_id`    | uuid       | References `games(id)`.                                  |
| `is_active`  | boolean    | `true` if ongoing, `false` if ended.                    |
| `start_time` | timestamp  | When session started.                                   |
| `end_time`   | timestamp  | When session ended, if any.                             |
| `created_at` | timestamp  | Defaults to `now()`.                                    |
| `updated_at` | timestamp  | Defaults to `now()`, auto-updates.                      |

### `calls` Table

| Column       | Type       | Description                                                             |
| ------------ | ---------- | ----------------------------------------------------------------------- |
| `id`         | uuid (PK)  | Auto-generated.                                                         |
| `session_id` | uuid       | References `sessions(id)`.                                              |
| `item_id`    | uuid       | References `list_items(id)`.                                            |
| `call_order` | int        | The order in which items were called.                                   |
| `called_at`  | timestamp  | Defaults to `now()`.                                                    |

---

## 7. Claims & Validation

When a player clicks “Claim Bingo,” we store a record in `claims`.

### `claims` Table

| Column         | Type       | Description                                                                              |
| -------------  | ---------- | ---------------------------------------------------------------------------------------- |
| `id`           | uuid (PK)  | Auto-generated.                                                                          |
| `session_id`   | uuid       | References `sessions(id)`.                                                               |
| `card_id`      | uuid       | References `cards(id)`.                                                                  |
| `claimed_by`   | text       | Clerk `user_id` or `NULL` if not a known user (printed card).                            |
| `claimed_at`   | timestamp  | Defaults to `now()`.                                                                     |
| `is_valid`     | boolean    | `true` or `false` if validated/rejected; `NULL` if not reviewed.                         |
| `validated_at` | timestamp  | If `is_valid` is set, store the time.                                                   |

---

## 8. Performance & Scalability

We use Next.js Server Actions to handle DB queries. Real-time calls are handled via minimal polling or refresh for v1, with potential for websockets or Supabase Realtime in [08-performance-and-scalability.md](./plan/08-performance-and-scalability.md).

---

## 9. Future Enhancements

- **account_members** for more advanced roles (beyond v1 if desired).
- Additional stats tables or analytics.
- Archiving or deleting old games.

This schema supports the new approach outlined in [02.01-core-ui-screens.md](./plan/02.01-core-ui-screens.md).
