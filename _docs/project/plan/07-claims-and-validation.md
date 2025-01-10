File: 07-claims-and-validation.md

# 07 – Claims & Validation

## Goals
1. Implement real-time claim checking (if using online cards).
2. Provide robust logic on the server side for verifying a user’s claim.
3. Allow manual overrides if Organizer wants to confirm a printed card.

## Key Tasks
- Extend the BingoCardGrid to track which cells are marked in the database for each user (if online).
- Build server-side logic to compare called items with the user’s marked cells.
- Enable manual override for Organizer’s acceptance or rejection of a claim.
- Add relevant notifications in the UI (Organizer and claimant).

## Completion Criteria
- Claims are stored and checked accurately in the DB.
- Organizer can confirm or reject claims in near-real-time.
- Printed card users have a method for manual entry or override.
