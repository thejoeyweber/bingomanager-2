# 05 – Reports & Analytics

## Goals
1. Implement session summary pages with mock data.
2. Provide CSV/PDF export with a chosen library (e.g., **pdf-lib**).
3. Integrate PostHog (front-end only) for basic event tracking.

## Key Tasks
- Build a Session Summary UI (calls, winners, timestamps).
- Implement export for PDF/CSV:
  - **PDF**: Use **pdf-lib** or a similar solution to generate PDF server-side.
  - **CSV**: Simple string generation, then download.
- Insert PostHog tracking calls for key actions (e.g., game creation, session start).

## Completion Criteria
- Organizer sees a stub session summary (calls, winners).
- Export buttons produce a basic CSV and PDF.
- PostHog analytics instrumentation is in place (page views, button clicks).
