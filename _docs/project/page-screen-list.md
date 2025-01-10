# Page & Screen Requirements

Below is each major page/screen in the application with the new approach. These pages will be built first with stubbed data, then integrated with the backend.

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
  - “Create New Game” → minimal form (title, description).
- **Profile & Settings**
  - Manage user data, subscription, sign out.

## 4. (Original) Create/Edit Game Wizard
> **Note**: Now largely replaced by the approach in [02.01-core-ui-screens.md](../plan/02.01-core-ui-screens.md). The following steps remain in place for legacy reference:
- **Step 1: Basic Info**  
- **Step 2: Items Setup**  
- **Step 3: Layout & Rules**  
- **Step 4: Review & Save**

## 5. Game Overview Page
- **Overview**  
  - Title, summary of items/rules, default call mode.
- **Lists**  
  - Attach existing list or create a new one (import items).
- **Card Types**  
  - Create multiple card types referencing a chosen list.
  - Configure grid size, free space, colors, etc.
- **Card Generation**  
  - Input how many cards, PDF vs. link, distribution.
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
  - Shows recent calls if needed.

## 8. Spectator Screen
- **Live Calls Display**
  - Chronological calls, winners, near-wins if allowed.

## 9. Reports & Analytics
- **Session Summary**
  - Calls, winners, timestamps, export as CSV/PDF.
- **Game History**
  - Past sessions, “Clone Game,” “View Reports.”

We build these pages in Next.js with placeholders, then integrate actual DB data in later steps.
