File: page-screen-list.md

# Page & Screen Requirements

This file lists each major page/screen in the application and specifies their UI components. These pages will be fully built out in the front end first, using stubbed data, and integrated with the backend later as described in [Project Instructions](../.cursorrules).

## 1. Landing Page
- **Header**  
  - Logo and nav links (Login, Sign Up).
- **Hero Section**  
  - Overview of app features, “Get Started” CTA button.
- **Feature Highlights**  
  - Brief bullet points showcasing key functionality.
- **Footer**  
  - Company or app info, disclaimers, socials.

## 2. Authentication
- **Login Page** (`(auth)/login`)  
  - Clerk-based email/password, OAuth options.
- **Sign-Up Page** (`(auth)/signup`)  
  - Clerk-based new account creation.
- **Password Reset**  
  - Clerk’s built-in password reset flow.

## 3. Dashboard (Organizer/Co-Organizer)
- **Dashboard Home**  
  - List of games with statuses (Draft, Live, Completed).
  - Action buttons: Edit, Start Session, Reports.
  - “Create New Game” button leading to wizard.
- **Profile & Settings**  
  - Accessible from a global nav or sidebar.
  - Manage user data, subscription (if needed), sign out.

## 4. Create/Edit Game Wizard
- **Step 1: Basic Info**  
  - Inputs for title, description, theme, language.
- **Step 2: Items Setup**  
  - Text box or multi-image upload (with defined cropping).
  - Clear UI for editing item names or removing unwanted items.
- **Step 3: Layout & Rules**  
  - Dropdown for grid size, multiple checkboxes for winning patterns.
  - Pacing controls (manual vs. timed calls).
  - Color or branding pickers using Shadcn UI form elements.
- **Step 4: Review & Save**  
  - Final summary of chosen settings.
  - “Confirm & Save” triggers game creation or update.

## 5. Game Overview Page
- **Title & Summary**  
  - Key info: # of items, chosen grid size, winning pattern(s).
- **Card Generation**  
  - Input for number of cards, PDF vs. online link generation.
  - Download or email distribution options.
- **Session Management**  
  - “Start Live Session,” “Invite Players,” “Add Co-Organizer.”
- **Settings**  
  - Toggle public/private.
  - Edit or reset items if not live.

## 6. Live Session (Caller) Interface
- **Main Caller Panel**  
  - Current called item displayed prominently.
  - Button for “Call Next Item” or auto-call on a timer.
- **History & Controls**  
  - List of all called items (scrollable).
  - Pause/Resume, End Session.
  - Display winner count and session stats.
- **Winner Claims**  
  - Notifications for new claims.
  - Verification dialog with the claiming player’s card.

## 7. Player Card Screen
- **Interactive Bingo Card**  
  - Click/tap to mark items.
  - “Claim Bingo” button.
- **Call Feed**  
  - Recent calls displayed (optional small panel).
  - Highlight called items in real time.

## 8. Spectator Screen
- **Live Calls Display**  
  - Chronological call list for viewers.
  - Show winners or near-wins if Organizer chooses.

## 9. Reports & Analytics
- **Session Summary Page**  
  - Ordered list of calls, winners, times.
  - Export as CSV or PDF.
- **Game History**  
  - Displays past sessions. 
  - “Clone Game” or “View Session Reports” buttons.

All these pages and screens will be rendered in Next.js using the structure in [Project Instructions](../.cursorrules). We will initially mock data and interactions so that the UX is finalized before backend integration.
