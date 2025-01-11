# App Flow & User Journeys

The following user flows are definitive and must be implemented in the Next.js `app` directory, following the structure specified in [Project Instructions](../.cursorrules) and [README.md](../README.md).

## 1. Landing & Onboarding
- **Landing Page (Unauthenticated)**  
  - Show app features, direct call to action (“Create Your Bingo Game”).
  - Link to sign-up or login pages (in `(auth)`).
- **Sign-Up**  
  - Powered by Clerk (password or OAuth).
  - Completes with user profile creation.
- **Login**  
  - Uses Clerk login or OAuth.
- **Optional Onboarding Tour**  
  - Present a short, skippable tour of core features.

## 2. Dashboard (Organizer/Co-Organizer)
1. **View My Games**  
   - Show existing games with status labels (Draft, Live, Completed).
   - Provide actions: Edit, Start Live Session, View Reports.
2. **Create New Game (Minimal Form)**  
   - **Title** (required), **Description** (optional).
   - On submission, instantly create a Draft game and navigate to its page.
   - Further setup (Lists, Card Types, etc.) is handled within that Game’s page.

## 3. Game Overview & Preparation
- **Game Overview Page**  
  - Display summary (title, item count, rules, default call mode).
  - Provide sections or tabs for:
    - **Lists**: Manage items, images, mandatory flags.
    - **Card Types**: Choose grid size, free space, color branding, etc.
  - Manage invites (players, co-organizers) using **SendGrid** in Step 06.
- **Card Generation Flow**  
  - Specify the number of unique cards to generate.
  - Generate PDFs (using [pdf-lib or a similar library](../plan/05-reports-and-analytics.md)) or unique online links.
  - Optionally send invites by email with **SendGrid** (implemented in Step 06).

## 4. Live Session (Caller) Interface
- **Start a Live Session**  
  - Initiate call sequence (random shuffle of items).
  - Load session data via server component, using manual refresh or minimal polling for real-time in v1.
  - (WebSockets or Supabase Realtime may be added in Step 08.)
- **Caller Screen**  
  - “Call Next Item” or timed auto-call.
  - Display current item (text/image).
  - Show a scrollable list of past calls on the side or bottom.
  - Pause/Resume and End Session controls.
- **Winning Claims**  
  - Notify Organizer upon a player’s “Bingo” claim.
  - Verify claim automatically (online card) or manually (printed card).

## 5. Player & Spectator Flows
- **Joining a Game**  
  - Enter via shared link/code.
  - Player is assigned or shown their unique card (online) or uses a printed/PDF card.
  - Spectator sees calls and results without a playable card.
- **Bingo Card Screen**  
  - Interactive grid to mark cells for online cards. 
  - “Claim Bingo” triggers a notification to the Organizer.

## 6. Post-Session & Reports
- **Session Summary**  
  - Chronological call history, timestamped winner claims, total calls.
  - Export results as CSV or PDF (see [05-reports-and-analytics.md](../plan/05-reports-and-analytics.md)).
- **Game History**  
  - Show past sessions for each game.
  - Provide “Clone Game” or “View Reports” options.

Throughout development:
- Use stubbed or mock data first to ensure UI and transitions are correct.
- Afterwards, integrate final data sources (DB, server actions, etc.) as per [06-backend-and-db-integration.md](../plan/06-backend-and-db-integration.md).
