# Functionality & Feature Requirements

All items in this file are part of our initial release scope, now updated with the new approach for Lists, Card Types, etc.

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
  - Round-based or single-round sessions are supported.
- **Card Generation & Distribution**  
  - Generate unique cards in PDF or via online links from a Card Type.
  - Download in bulk or email to participants.
  - Integrate a low-cost email service (e.g., SendGrid) for invites if needed.
- **Templates**  
  - Let users save game setups (Lists, Card Types) as templates.
  - Provide import/export for templates.

## 2. Live Session (Caller) Interface
- **Real-Time Calls**  
  - Randomly display called items from the chosen List or Card Type arrangement.
  - Keep a visible, scrollable call history.
- **Caller Controls**  
  - Pause/resume, skip, or re-draw calls as needed.
  - Display stats (calls count, winner count).
- **Round Transition**  
  - Handle multiple rounds if configured.
  - Optionally display countdown timers.

## 3. Player & Spectator Experience
- **Join a Game**  
  - Via invite link, code, or email.
- **Bingo Card Interaction**  
  - Each card is generated from a Card Type layout.
  - A “Claim Bingo” button alerts the Organizer.
- **Spectator Mode**  
  - Read-only display of calls and progress.

## 4. Collaboration & Sharing
- **Co-Organizers**  
  - Organizer can invite or remove co-organizers with shared access. 
  - For more complexity, use an `account_members` pivot table.
- **Public & Private Sharing**  
  - Optionally password/code-protect a game.
  - Could require sign-in for private events.

## 5. Analytics & Reporting
- **Session Overview**  
  - Called items in order, timestamps, winners.
- **Export**  
  - PDF or CSV for each session’s results.
- **Multi-Session Insights**  
  - Past sessions stored and displayed.

## 6. User Account & Data Management
- **User Profiles**  
  - Clerk-based auth, data in Postgres via Supabase.
- **Roles**  
  - Organizer, Co-Organizer, Player, Spectator, with advanced roles possible later.
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
  - Lists and interface in multiple languages.

## 9. Scalability & Performance
- **Large Events**  
  - Support hundreds or thousands of participants.
- **Offline/Hybrid**  
  - PDF generation for offline cards.
- **Analytics**  
  - Track usage with PostHog.

Use these requirements with [app-flow.md](./app-flow.md) and `.cursorrules` for detailed guidelines.
