# 07 – Claims & Validation

## Goals
1. Implement real-time claim checking for online cards.
2. Provide robust server-side logic for verifying a user’s claim.
3. Allow manual overrides for printed cards.

## Key Tasks
- Extend BingoCardGrid to track which cells each user has marked in the DB (if online).
- Build server logic to compare called items with marked cells.
- Enable manual override if the Organizer wants to confirm a printed card offline.
- Provide relevant UI notifications (Organizer and claimant).

## Completion Criteria
- Claims stored and validated accurately in the DB.
- Organizer can confirm or reject claims promptly.
- Printed card users have a manual entry/override path.
