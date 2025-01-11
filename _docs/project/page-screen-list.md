# Page & Screen Requirements

Below is each major page/screen in the application. We use the **updated** minimal “New Game” approach outlined in [02.01-core-ui-screens.md](./plan/02.01-core-ui-screens.md). The pages will be built first with stubbed data, then integrated with the backend.

## 1. Landing Page
- **Header**
  - Logo, nav links (Login, Sign Up).
- **Hero Section**
  - Overview of app features, CTA button (“Get Started”).
- **Feature Highlights**
  - Key functionality bullet points.
- **Footer**
  - Disclaimers, socials, about info.

## 2. Authentication
- **Login Page** (`(auth)/login`)
  - Clerk-based email/password or OAuth.
- **Sign-Up Page** (`(auth)/signup`)
  - Clerk-based new user creation.
- **Password Reset**
  - Clerk’s built-in flow.

## 3. Dashboard (Organizer/Co-Organizer)
- **Dashboard Home**
  - List of games (Draft, Live, Completed).
  - Buttons: Edit, Start Session, Reports, etc.
  - “Create New Game” → small dialog for Title, optional Description; navigates to new Draft game.
- **Profile & Settings**
  - Manage user data, subscription, sign out.

## 4. Game Overview Page
- **Overview**
  - Title, description, default call mode, other meta.
- **Lists**
  - Create or attach a list, add items (text or image), mark mandatory if needed.
- **Card Types**
  - Reference a chosen list. 
  - Set grid size, free space, color scheme, etc.
- **Card Generation**
  - Input how many cards, choose PDF (pdf-lib or similar) or link-based.
  - Optionally email invites using SendGrid (to be implemented in Step 06).
- **Session Management**
  - “Start Live Session,” “Add Co-Organizer,” etc.
- **Settings**
  - Toggle public/private, edit items if not live.

## 5. Live Session (Caller) Interface
- **Main Caller Panel**
  - Current item, “Call Next” or auto-call.
  - Past calls, pause/resume, end session.
- **Winner Claims**
  - Notifications, verification modal.

## 6. Player Card Screen
- **Interactive Bingo Card**
  - Mark cells, “Claim Bingo.”
- **Call Feed**
  - Shows recent calls.

## 7. Spectator Screen
- **Live Calls Display**
  - Chronological calls, winners, near-wins if allowed.

## 8. Reports & Analytics
- **Session Summary**
  - Calls, winners, timestamps, export as CSV/PDF.
- **Game History**
  - Past sessions, “Clone Game,” “View Reports.”

Once the above pages and flows are integrated, the app will be ready for real-time session logic (Step 03) and final polish.