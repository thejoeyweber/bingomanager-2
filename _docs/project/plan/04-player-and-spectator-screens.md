# 04 – Player & Spectator Screens

## Goals
1. Implement the Player’s interactive bingo card screen in detail.
2. Implement the Spectator’s read-only interface.
3. Ensure local (mock) real-time marking on the Player card.

## Key Tasks
- Build the BingoCardGrid (see [components-list.md](../components-list.md)).
- Allow click/tap to mark items on the card.
- Add a “Claim Bingo” button that triggers a mock verification flow for the Organizer.
- Build a Spectator screen showing calls in read-only mode, updated by stubs.

## Completion Criteria
- Players can see calls and mark their grid in real time (mock).
- Spectators see calls without interaction.
- “Claim Bingo” triggers the WinnerClaimModal for Organizer review.
