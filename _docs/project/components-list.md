# Components & UI Patterns

This file details specialized components not already covered by Shadcn UI. We will implement these using Tailwind and Shadcn (see [README.md](../README.md#tech-stack) and [Project Instructions](../.cursorrules)).

## 1. Custom / Specialized Components

1. **BingoCardGrid**
   - Renders an N x N grid of items.
   - Accepts an array of item data (text or image) and a “called-items” state.
   - Provides a “mark” action for players or a read-only mode for spectators.
   - Some items may be designated “mandatory” (always included).
   - Built using `Card`, `Button`, or `Table` from `/components/ui`.

2. **GameItemUploader** (or “ListItemUploader”)
   - Handles image uploads with cropping/resizing.
   - Uses Shadcn UI `Dialog` and `Form` to guide the user.
   - Integrates with Next.js server actions for file storage (Supabase).
   - If item is an image, it may also have an optional caption field.

3. **CallHistoryList**
   - Displays a scrollable list of called items (text or thumbnails).
   - Highlights the most recent call automatically.
   - Optionally shows timestamps.

4. **WinnerClaimModal**
   - Appears when a player claims a win.
   - Shows the claimant’s card, highlighting called items.
   - Organizer can confirm or reject the claim.
   - Auto-check if online card, manual override if printed/anonymous.

5. **CardGenerationConfig**
   - A form or modal for generating cards (number of cards, PDF vs. link).
   - Uses Shadcn UI form elements (select, input).
   - On submission, triggers a server action that:
     - Uses **pdf-lib (Step 05)** for PDF creation.
     - Uses **SendGrid (Step 06)** for emailing invites if the user chooses.

## 2. Standard Shadcn UI Components

Since we rely on shadcn/ui, use these instead of reinventing. Available components in `/components/ui/`:

### Layout & Structure
- Accordion
- Aspect Ratio
- Card
- Collapsible
- Drawer
- Navigation Menu
- Resizable
- Scroll Area
- Separator
- Sheet
- Sidebar

### Forms & Input
- Button
- Checkbox
- Combobox
- Form
- Input
- Input OTP
- Label
- Radio Group
- Select
- Slider
- Switch
- Textarea
- Toggle
- Toggle Group

### Data Display
- Avatar
- Badge
- Breadcrumb
- Calendar
- Carousel
- Chart
- Data Table
- Date Picker
- Progress
- Skeleton
- Table

### Overlays & Popups
- Alert
- Alert Dialog
- Command
- Context Menu
- Dialog
- Dropdown Menu
- Hover Card
- Menubar
- Popover
- Toast (via Sonner)
- Tooltip

### Navigation
- Pagination
- Tabs

Refer to [shadcn/ui docs](https://ui.shadcn.com/docs) for usage details.  
Never edit or change the existing shadcn/ui components directly.

## 3. Reusable Patterns
- **Wizard/Stepper**  
  - Legacy concept. Now replaced by a more flexible “Game” page with optional guided steps.
- **Dashboard Layout**  
  - A shared layout with a sidebar for navigation.
- **Overlay Notifications**  
  - Shadcn UI toasts for claims, errors, etc.

## 4. Notes on Styling & Theming
- **Tailwind + Shadcn**  
  - Adhere to consistent spacing and typography from `.cursorrules`.
- **Framer Motion**  
  - Use for interactive animations on transitions or events.

## 5. Integration with the App Structure
- For route-specific components, place them under `app/[route]/_components`.
- For truly shared components, place them under `components/`.

These definitions should be implemented with stubbed data initially, then connected to Drizzle ORM and Supabase in [06-backend-and-db-integration.md](./plan/06-backend-and-db-integration.md).
