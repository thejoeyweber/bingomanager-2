# 03 – Live Session Interface

## Goals
1. Implement the Caller Interface with mock items.
2. Add real-time or simulated calling (pause/resume).
3. Show a scrollable call history.

## Key Tasks
- Build the Caller page UI (refer to [components-list.md](../components-list.md) for `CallHistoryList` and related).
- Randomly pick items from the chosen List or Card Type (no DB yet).
- “Claim Bingo” popup for Organizer to see how verification will look.
- Show session stats (calls count, winners) in stub form.
- For v1 real-time updates, use manual refresh or minimal polling. WebSockets or Supabase Realtime can be added in Step 08 if large concurrency is needed.

## Completion Criteria
- A fully interactive Caller screen with mock data.
- Users can simulate claims from a test Player screen.
- Pause/Resume calls, history displayed in a panel.
- Basic real-time approach (polling or manual refresh) works for smaller sessions.
