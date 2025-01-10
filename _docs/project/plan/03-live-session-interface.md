# 03 – Live Session Interface

## Goals
1. Implement the Caller Interface with mock items.
2. Add real-time or simulated calling (pause/resume).
3. Show a scrollable call history.

## Key Tasks
- Build the Caller page UI (refer to [components-list.md](../components-list.md)).
- Randomly pick items from the chosen List or Card Type (no DB yet).
- “Claim Bingo” popup for Organizer to see how verification will look.
- Show session stats (calls count, winners) in stub form.

> **Implementation Note**  
> We may do periodic polling or manual refresh for mock real-time. Later, we can adopt websockets or Supabase Realtime if concurrency demands.

## Completion Criteria
- A fully interactive Caller screen with mock data.
- Users can simulate claims from a test Player screen.
- Pause/Resume calls, history displayed in a panel.
