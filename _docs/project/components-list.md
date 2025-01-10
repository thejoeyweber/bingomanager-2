# Components & UI Patterns

This file details specialized components not already covered by Shadcn UI. We will implement these using Tailwind and Shadcn (see [README.md](../README.md#tech-stack) and [Project Instructions](../.cursorrules)).

## 1. Custom / Specialized Components

1. **BingoCardGrid**
   - Renders an N x N grid of items.
   - Accepts an array of item data (text or image) and a called-items state.
   - Provides a “mark” action for player interactions or read-only mode for spectators.
   - Built using `Card`, `Button`, or `Table` from `/components/ui`.

2. **GameItemUploader**
   - Handles image uploads with built-in cropping/resizing.
   - Uses Shadcn UI `Dialog` and `Form` to guide the user through the process.
   - Integrates with Next.js server actions for final file storage.
   - **Storage**: By default, images are uploaded to **Supabase Storage**. The final `image_url` is stored in the DB.

3. **CallHistoryList**
   - Displays a scrollable list of called items (text or thumbnail).
   - Highlights the most recent call automatically.
   - Optionally shows timestamps.

4. **WinnerClaimModal**
   - Appears when a player claims a win.
   - Uses a Shadcn UI `Dialog` to display the claimant’s card, highlighting called items.
   - Organizer or Co-Organizer can confirm or reject the claim.
   - If the card is an online card, the system can auto-check against the called items; if it’s a printed/anonymous card, the Organizer may manually override.

5. **CardGenerationConfig**
   - A form or modal for generating cards (number of cards, PDF vs. link).
   - Incorporates Shadcn UI form elements (select, input).
   - On submission, triggers server action or local mock action until backend integration is ready.

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

Refer to [shadcn/ui docs](https://ui.shadcn.com/docs) for detailed implementation guides. Do not duplicate these components unless you need specialized variants.

Refer to [`/components/ui/`](../components/ui) for the existing library. Do not duplicate them in separate files unless you need specialized variants. Never edit or change the existing shadcn/ui components directly.

## 3. Reusable Patterns
- **Wizard/Stepper**  
  - We will use a Shadcn UI approach with step-based screens for game creation.
- **Dashboard Layout**  
  - A shared layout with a sidebar for navigation.
- **Overlay Notifications**  
  - Will use Shadcn UI toasts for events like claim notifications or errors.

## 4. Notes on Styling & Theming
- **Tailwind + Shadcn**  
  - Adhere to consistent spacing and typography rules outlined in `.cursorrules`.
- **Framer Motion**  
  - Apply interactive animations to transitions (e.g., confetti on a confirmed win).
  - Ensure performance is maintained for large-scale events.

## 5. Integration with the App Structure
- For route-specific components, place them under `app/[route]/_components`.
- For truly shared components, place them under `components/`.
- Always follow the naming, import, and usage rules described in [Project Instructions](../.cursorrules).

These component definitions will be implemented first with stubbed data. Final integration with Drizzle ORM, Supabase, and other back-end details will occur in subsequent steps.
