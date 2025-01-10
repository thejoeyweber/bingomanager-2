# Functionality & Feature Requirements

This file outlines the complete functionality and features for the Bingo Creator, Manager, and Helper application. All items listed here are part of our initial release scope. We will implement the entire scope, then build out the functionality and back end after the front end is fully laid out.

## 1. Game Creation & Management
- **Create & Edit Bingo Games**  
  - Provide fields for game title, description, theme, and language.
  - Allow configuration of game items (text or images).
  - Enable selection of grid size (3x3, 4x4, 5x5, etc.).
  - Support various winning patterns (single line, multiple lines, blackout, custom shapes).
- **Game Rules & Pacing**  
  - Allow choice between automatic (timed) or manual calls.
  - Include pause and resume functionality.
  - Support either round-based or single-round structures.
- **Card Generation & Distribution**  
  - Generate unique bingo cards in PDF or via online links.
  - Provide options to download in bulk or email to participants.
  - **Invitations & Emails**: We will integrate a low-cost email service (e.g., SendGrid free tier) to send out game invites or card links where needed.
- **Templates**  
  - Allow users to save game configurations as reusable templates (theme, rules, items).
  - Provide import/export functionality for templates.

## 2. Live Session (Caller) Interface
- **Real-Time Calls**  
  - Randomly display called items (text or images).
  - Keep a visible, scrollable call history.
- **Caller Controls**  
  - Provide buttons to pause/resume, skip, or re-draw calls as needed.
  - Display statistics (number of calls, number of winners).
- **Round Transition**  
  - Allow auto or manual progression to next round (if multiple rounds are configured).
  - Optionally display a countdown timer for each round.

## 3. Player & Spectator Experience
- **Join a Game**  
  - Players can join via invite link, code, or email (public or private).
- **Bingo Card Interaction**  
  - Players see and mark their own bingo cards in real time.
  - A “Claim Bingo” button alerts the Organizer.
- **Spectator Mode**  
  - Provides a read-only display of calls and game progress.

## 4. Collaboration & Sharing
- **Co-Organizers**  
  - Allow Organizer to invite/remove co-organizers with specific permissions.
  - For now, co-organizers may simply share the same `account_id`, granting them management access to the same games. If needed, a pivot table can provide more granular roles later.
- **Public & Private Sharing**  
  - Allow game links to be password/code-protected for private events.
  - Private events may require a game access code or a user to be logged in with an appropriate `account_id`.

## 5. Analytics & Reporting
- **Session Overview**  
  - List called items in order, record timestamps, and track winners.
  - Measure time to first win and other relevant statistics.
- **Export**  
  - Provide PDF or CSV export of each session’s results.
- **Multi-Session Insights**  
  - Store and display past session data in the user’s account.

## 6. User Account & Data Management
- **User Profiles**  
  - Use Clerk for user authentication (see `.cursorrules` and `README.md`).
  - Persist profile data in Postgres via Supabase.
- **Roles**  
  - Define distinct roles: Organizer, Co-Organizer, Player, Spectator.
- **Data Storage**  
  - Store game configurations, card data, and session results in the database.
- **Membership Tiers**  
  - `free` users have certain feature limitations (e.g., max active games).
  - `pro` users (determined via Stripe subscription) unlock advanced features. We’ll use Stripe webhooks to update `profiles.membership`.

## 7. Customization & Branding
- **Theme & Layout**  
  - Provide color schemes, fonts, and backgrounds through Tailwind & Shadcn UI.
- **Image-Based Cards**  
  - Integrate image uploads with built-in cropping/resizing.
  - **Note**: We will store these images in Supabase Storage and reference them via `image_url`.
- **Prebuilt Themes**  
  - Include pre-configured sets (e.g., numbers, pop-culture references, holidays).

## 8. Accessibility & Internationalization
- **High-Contrast Mode**  
  - Ensure compliance with major accessibility guidelines (WCAG).
- **Text-to-Speech**  
  - Optionally read out called items for visually impaired users.
- **Multi-Language**  
  - Allow creation of items and app interface in different languages.

## 9. Scalability & Performance
- **Large Events**  
  - Must handle hundreds or thousands of simultaneous participants.
- **Offline/Hybrid**  
  - Enable PDF generation and offline card usage if real-time connectivity fails.
- **Analytics**  
  - Track usage metrics through PostHog (see README and `.cursorrules`).

Use these requirements in conjunction with the [app-flow.md](./app-flow.md) and the project’s `.cursorrules` for detailed technical guidelines.
