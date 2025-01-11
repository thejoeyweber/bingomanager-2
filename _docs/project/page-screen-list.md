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

## 4. (Original) Create/Edit Game Wizard (Legacy)
> **Archived/Outdated**  
> This was the original 4-step wizard concept. It has been **superseded** by the minimal “New Game” approach plus the comprehensive single Game page (Lists, Card Types, etc.). We keep the outline below for historical reference only.

- **Step 1: Basic Info**  
- **Step 2: Items Setup**  
- **Step 3: Layout & Rules**  
- **Step 4: Review & Save**

## 5. Game Overview Page
- **Overview**  
  - Title, description, default call mode, other meta.
- **Lists**  
  - Create or attach a list, add items (text or image).
  - Mark mandatory items as needed.
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

## 6. Live Session (Caller) Interface
- **Main Caller Panel**
  - Current item, “Call Next” or auto-call.
  - Past calls, pause/resume, end session.
- **Winner Claims**
  - Notifications, verification modal.

## 7. Player Card Screen
- **Interactive Bingo Card**
  - Mark cells, “Claim Bingo.”
- **Call Feed**
  - Shows recent calls.

## 8. Spectator Screen
- **Live Calls Display**
  - Chronological calls, winners, near-wins if allowed.

## 9. Reports & Analytics
- **Session Summary**
  - Calls, winners, timestamps, export as CSV/PDF.
- **Game History**
  - Past sessions, “Clone Game,” “View Reports.”

The next steps integrate actual DB data in [06-backend-and-db-integration.md](./plan/06-backend-and-db-integration.md).
