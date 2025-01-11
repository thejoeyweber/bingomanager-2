# 08 – Performance & Scalability

## Goals
1. Support large events (hundreds or thousands of players).
2. Optimize queries, calls, concurrency.
3. Provide an offline path for PDF card generation (already using pdf-lib).
4. Introduce real-time websockets or Supabase Realtime if needed.

## Key Tasks
- Load testing or basic performance tests for live sessions.
- Implement pagination or chunked loading if item sets or calls are large.
- Use caching or efficient fetching where needed.
- Use websockets or Supabase Realtime for high-concurrency calling/claiming flows if manual polling is insufficient.
- Provide offline PDFs for participants without real-time connectivity.

## Completion Criteria
- The app remains responsive under higher concurrency usage.
- Offline PDF generation (via pdf-lib) is fully supported.
- Websockets or Supabase Realtime integration is implemented for large events, if required.
- No major performance bottlenecks remain in queries or real-time updates.
