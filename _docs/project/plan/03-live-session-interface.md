# 03 – Live Session Interface

## Goals
1. Implement the Caller Interface design with mock items.
2. Add real-time or simulated item calling, including pause/resume.
3. Provide a scrollable call history and a mechanism for skipping a call.

## Key Tasks
- Build the Caller page UI, referencing [components-list.md](../components-list.md#callhistorylist).
- Display a random call from a mock data set (no DB).
- Implement a “Claim Bingo” notification popup to show how it will look for the Organizer.
- Show session stats (number of calls, potential winners) in stubbed form.

> **Implementation Approach (Real-Time Data)**  
> Initially, we may rely on **periodic polling** or manual refresh calls to fetch new calls/claims from the server. If concurrency grows or we need more immediate updates, we can adopt **Supabase Realtime** or websockets in the future.

## Completion Criteria
- The Caller screen is fully interactive with mock calls.
- The user can simulate claims from a separate stubbed player view or a test button.
- The session can be paused/resumed, and calls displayed in the history panel.
