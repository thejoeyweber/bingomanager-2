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
2. **Create New Game (4-Step Wizard)**
   - **Step 1: Basic Info**  
     - Title, description, theme, language.
   - **Step 2: Items Setup**  
     - Input text or upload images (with cropping) for game items.
   - **Step 3: Layout & Rules**  
     - Select grid size, winning patterns, color branding, pacing rules.
   - **Step 4: Review & Save**  
     - Show final preview, confirm settings, optionally save as template.

## 3. Game Overview & Preparation
- **Game Overview Page**  
  - Display summary (title, item count, rules).
  - Provide buttons for card generation/distribution.
  - Manage invites (players, co-organizers).
- **Card Generation Flow**  
  - Specify the number of unique cards to generate.
  - Generate PDFs or unique online links.
  - Optionally send bulk invitations by email (requires integration details specified later).

## 4. Live Session (Caller) Interface
- **Start a Live Session**  
  - Initiate call sequence (random shuffle of items).
  - Load session data via server component.
- **Caller Screen**  
  - “Call Next Item” or timed auto-call.
  - Display current item (text/image) in a prominent area.
  - Show a scrollable list of past calls on the side or bottom.
  - Pause/Resume and End Session controls.
- **Winning Claims**  
  - Notify Organizer upon a player’s “Bingo” claim.
  - Verify claim automatically (online card) or manually (printed card).

## 5. Player & Spectator Flows
- **Joining a Game**  
  - Enter via shared link/code.
  - Player is assigned or shown their unique card.
  - Spectator sees calls and results without a playable card.
- **Bingo Card Screen**  
  - Display an interactive grid. Mark cells when called items match.
  - “Claim Bingo” triggers a notification to the Organizer.

## 6. Post-Session & Reports
- **Session Summary**  
  - Chronological call history, timestamped winner claims, total calls.
  - Export results as CSV or PDF.
- **Game History**  
  - Show past sessions for each game.
  - Provide “Clone Game” or “View Reports” options.

These flows must be implemented using stubbed or mock data first, ensuring all UI and transitions are correct. Afterwards, we will integrate final data sources (DB, server actions, etc.).
