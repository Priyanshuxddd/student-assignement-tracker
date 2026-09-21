# Student Assignment Tracker

## First-load delay on the deployed site

The API is hosted at Render and the database is hosted by Neon. Render Free web
services spin down after 15 minutes without inbound traffic; the next request
starts the service again and can take about a minute. This is the primary cause
of a slow first visit. It is not caused by the React rendering or the
`findMany()` query.

The frontend now keeps the most recently loaded assignments in browser storage,
so return visits show existing data while a fresh request runs. It also explains
when the server is waking up. The backend exposes `GET /health` for monitoring.

To eliminate the delay for every new visitor, change the Render web service to
a paid compute plan so it does not spin down. As a temporary workaround, point
an external uptime monitor at `https://student-assignement-tracker-6.onrender.com/health`
more often than every 15 minutes. Do not use `/robots.txt`: Render does not use
that path to wake a spun-down Free service.

Other common sources of first-request latency are a database that also scales to
zero, a new TLS/DNS connection, an empty connection pool, a serverless function
cold start, cross-region API/database traffic, slow queries or missing indexes,
and oversized frontend bundles. In this application, a cold API measurement was
about 11 seconds versus about 1 second immediately afterward, with almost all
extra time occurring before the API connection was established.
