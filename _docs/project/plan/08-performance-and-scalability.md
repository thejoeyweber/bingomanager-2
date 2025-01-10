# 08 – Performance & Scalability

## Goals
1. Support large events (hundreds or thousands of players).
2. Optimize queries, calls, concurrency.
3. Provide an offline path for PDF card generation.

## Key Tasks
- Load testing or basic performance tests for live sessions.
- Implement pagination or chunked loading if item sets or calls are large.
- Use caching or efficient fetching if necessary.
- Provide offline PDF distribution for participants without real-time connectivity.

## Completion Criteria
- The app remains responsive under a specified concurrency threshold.
- Offline PDFs are easy to generate and distribute.
- No major performance bottlenecks in queries or real-time updates.
