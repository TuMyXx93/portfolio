# WAF and contact endpoint runbook

This runbook defines the production edge controls for `POST /api/contact`. The
rules live in Vercel Firewall because serverless instances are not a reliable
shared counter for rate limiting.

## Rule policy

Apply rules in this order:

1. Observe `POST /api/contact` traffic for at least 24 hours.
2. Rate limit by source IP using a fixed window of 10 requests per 60 seconds.
3. Return the default `429` action when the limit is exceeded.
4. Add a challenge rule for a clearly automated pattern only after reviewing
   false positives in the Firewall traffic view.

Do not rate-limit `GET /api/contact`, static assets, or page navigations. The
application remains responsible for schema validation, honeypot handling and
the 16 KiB streamed body limit; the WAF is an additional edge control.

## Change procedure

1. Create the rule in `Log` mode and record the rule identifier, window,
   counting key and timestamp in the deployment ticket.
2. Review allowed, rate-limited and challenged traffic after 24 hours.
3. Publish the rule in `Rate Limit` mode during a low-traffic window.
4. Verify a normal contact submission, an invalid submission (`400`) and a
   rate-limited submission (`429`) from a controlled test source.
5. Keep the previous rule definition available for immediate rollback.

## Monitoring and rollback

- Alert on a sustained increase in `429`, `502` or `503` responses from the
  contact route.
- If legitimate traffic is blocked, revert to `Log` mode, capture the source
  pattern and adjust the limit before re-enabling enforcement.
- Never log message contents, email addresses or source IPs in application
  logs. Use the Vercel Firewall view for short-lived traffic investigation and
  redact exported evidence.

Reference: [Vercel WAF rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).
