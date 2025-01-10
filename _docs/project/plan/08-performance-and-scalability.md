File: 08-performance-and-scalability.md

# 08 – Performance & Scalability

## Goals
1. Ensure the application can support large events (hundreds or thousands of players).
2. Optimize database queries, real-time calls, and any potential concurrency bottlenecks.
3. Finalize offline PDF card generation for participants who cannot go online.

## Key Tasks
- Conduct load testing or basic performance testing on the live session flow.
- Evaluate pagination or chunked data loading if sessions are very large.
- Implement caching or efficient fetching where necessary.
- Provide a reliable offline path for generating and distributing PDFs.

## Completion Criteria
- The app remains responsive under a specified concurrency threshold (to be tested).
- Offline mode for distributing PDFs is seamless and documented in user flows.
- No major bottlenecks in query performance or real-time updates.
