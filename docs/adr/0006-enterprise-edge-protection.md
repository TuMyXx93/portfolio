# ADR-0006: Edge protection for the contact endpoint

## Status

Accepted — 2026-08-10

## Decision

Use Vercel Firewall as the shared, edge-level rate limiter for `POST
/api/contact`, with application-level validation and a streamed 16 KiB body
limit remaining in the route.

The first rollout is observe-only for 24 hours, followed by a fixed-window
limit of 10 requests per source IP per 60 seconds and the default `429`
response. Challenge rules are opt-in after traffic review.

## Context

An in-memory counter inside a serverless function is not a dependable global
rate limiter: instances can scale independently, restart, or run in different
regions. The endpoint already rejects invalid data, traps honeypot traffic and
fails closed when delivery configuration is missing. The missing control is a
shared edge policy that protects the endpoint and the email provider before a
request reaches application code.

## Consequences

Positive:

- Consistent enforcement across serverless instances and regions.
- No new stateful dependency or customer-data store.
- Adjustable policy, observation and rollback from the Vercel Firewall.

Trade-offs:

- The rule is configured in Vercel, not fully declarative in this repository.
- IP-based limits can affect shared networks; observe mode and rollback are
  mandatory.
- The WAF does not replace schema validation, body limits or delivery
  monitoring.
