File: 04-player-and-spectator-screens.md

# 04 – Player & Spectator Screens

## Goals
1. Implement the Player’s interactive bingo card screen in detail.
2. Implement the Spectator’s read-only view of calls and progression.
3. Ensure real-time item marking (locally simulated) on the Player card.

## Key Tasks
- Build the BingoCardGrid component for players, referencing [components-list.md](../components-list.md#bingocardgrid).
- Enable click/tap marking of items on the card.
- Add a “Claim Bingo” button that triggers a mock verification flow in the Organizer’s view.
- Build a Spectator screen that shows calls in a read-only format, updated locally by stubs.

## Completion Criteria
- Players can see calls and mark their grid.
- Spectators see calls without interaction.
- “Claim Bingo” triggers the WinnerClaimModal in the Organizer’s interface (stubbed).
