export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// In-memory sliding window fallback for local dev, testing, or unconfigured cloud environments
interface InMemoryEntry {
  timestamps: number[];
}

const memoryStore = new Map<string, InMemoryEntry>();
const WINDOW_MS = 60 * 1000; // 60 seconds
const MAX_REQUESTS = 5; // 5 requests per window

// Clean up stale memory store entries periodically
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryStore.entries()) {
      entry.timestamps = entry.timestamps.filter(ts => now - ts < WINDOW_MS);
      if (entry.timestamps.length === 0) {
        memoryStore.delete(key);
      }
    }
  }, WINDOW_MS);

  if (typeof cleanupTimer.unref === 'function') {
    cleanupTimer.unref();
  }
}

function checkInMemoryRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const entry = memoryStore.get(identifier) || { timestamps: [] };

  // Remove timestamps outside window
  entry.timestamps = entry.timestamps.filter(ts => now - ts < WINDOW_MS);

  if (entry.timestamps.length >= MAX_REQUESTS) {
    const oldest = entry.timestamps[0] || now;
    const reset = oldest + WINDOW_MS;
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset,
    };
  }

  entry.timestamps.push(now);
  memoryStore.set(identifier, entry);

  const reset = now + WINDOW_MS;
  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - entry.timestamps.length,
    reset,
  };
}

// Lazy-load Upstash only when credentials exist in runtime environment
const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

let upstashRatelimitPromise: Promise<any> | null = null;

async function getUpstashRatelimit() {
  if (!redisUrl || !redisToken || process.env.NODE_ENV === 'test') {
    return null;
  }

  if (!upstashRatelimitPromise) {
    upstashRatelimitPromise = (async () => {
      try {
        const { Ratelimit } = await import('@upstash/ratelimit');
        const { Redis } = await import('@upstash/redis');

        const redis = new Redis({
          url: redisUrl,
          token: redisToken,
        });

        return new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '60 s'),
          prefix: 'portfolio:ratelimit:contact',
        });
      } catch (error) {
        console.warn(
          '[RateLimit] Failed to initialize Upstash Redis, using in-memory store:',
          error
        );
        return null;
      }
    })();
  }

  return upstashRatelimitPromise;
}

export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  const upstash = await getUpstashRatelimit();
  if (upstash) {
    try {
      const result = await upstash.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch (error) {
      console.warn(
        '[RateLimit] Redis call failed, falling back to in-memory check:',
        error
      );
      return checkInMemoryRateLimit(identifier);
    }
  }

  return checkInMemoryRateLimit(identifier);
}

export function resetInMemoryStore(): void {
  memoryStore.clear();
}
