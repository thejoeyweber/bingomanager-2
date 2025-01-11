# Functionality & Feature Requirements

All items in this file are part of our initial release scope, updated to reflect the new approach using Lists, Card Types, etc.

## 1. Game Creation & Management
- **Minimal “New Game” Creation**  
  - Provide at least a title; optional description.
  - Game is created in “Draft” status immediately.
- **Lists & Card Types**  
  - A user can attach or create a List (numbers, words, images).
  - One or more Card Types can be created under a Game, each referencing a chosen List.
  - Card Type defines grid size, free space, color scheme, etc.
- **Game Rules & Pacing**  
  - Default call mode (manual vs. timed) can be set at the game level, overridden by a Card Type or Session.
  - Round-based or single-round sessions are supported (for v1, typically single round).
- **Card Generation & Distribution**  
  - Generate unique cards in PDF or via online links from a Card Type.
  - Use [pdf-lib or a similar library](./plan/05-reports-and-analytics.md) for PDFs.
  - Optionally email invites to participants via **SendGrid** (implemented in Step 06).
- **Templates**  
  - Let users save game setups (Lists, Card Types) as templates.
  - Provide import/export for templates if desired.

## 2. Live Session (Caller) Interface
- **Real-Time Calls**  
  - Randomly display called items from the chosen List or Card Type.
  - Keep a visible, scrollable call history.
  - For v1, implement manual refresh or minimal polling. (WebSockets or Supabase Realtime may come in Step 08.)
- **Caller Controls**  
  - Pause/resume, skip, or re-draw calls.
  - Display stats (calls count, winner count).
- **Round Transition**  
  - Handle multiple rounds if configured.
  - Optionally display countdown timers.

## 3. Player & Spectator Experience
- **Join a Game**  
  - Via invite link, code, or email (pending SendGrid in Step 06).
- **Bingo Card Interaction**  
  - A “Claim Bingo” button alerts the Organizer.
- **Spectator Mode**  
  - Read-only display of calls and progress.

## 4. Collaboration & Sharing
- **Co-Organizers**  
  - Organizer can invite or remove co-organizers (account-based logic).
- **Public & Private Sharing**  
  - Optionally password/code-protect a game (beyond v1 scope if desired).
  - Could require sign-in for private events.

## 5. Analytics & Reporting
- **Session Overview**  
  - Called items in order, timestamps, winners.
- **Export**  
  - PDF or CSV for each session’s results (via pdf-lib or similar).
- **Multi-Session Insights**  
  - Past sessions stored and displayed.

## 6. User Account & Data Management
- **User Profiles**  
  - Clerk-based auth, data in Postgres via Supabase.
- **Roles**  
  - Organizer, Co-Organizer, Player, Spectator (and advanced roles later if needed).
- **Data Storage**  
  - Use Drizzle ORM for game configs, cards, session results in the DB.
- **Membership Tiers**  
  - `free` vs. `pro`, updated via Stripe subscription.

## 7. Customization & Branding
- **Theme & Layout**  
  - Provide color schemes, fonts, backgrounds at the Card Type or game level.
- **Image-Based Cards**  
  - Upload images via Supabase Storage, with optional cropping.
- **Prebuilt Themes**  
  - Starter sets (numbers, pop-culture, holidays).

## 8. Accessibility & Internationalization
- **High-Contrast Mode**  
  - Ensure WCAG compliance.
- **Text-to-Speech**  
  - Optional read-out of called items.
- **Multi-Language**  
  - Lists and interface in multiple languages if needed.

## 9. Scalability & Performance
- **Large Events**  
  - Support hundreds or thousands of participants.
- **Offline/Hybrid**  
  - PDF generation for offline cards.
- **Analytics**  
  - Track usage with PostHog.

All features here align with [app-flow.md](./app-flow.md) and the new approach described in [02.01-core-ui-screens.md](./plan/02.01-core-ui-screens.md). 
