const PROBE_URLS = [
  'https://raw.githubusercontent.com',
  'https://github.com',
  'https://google.com',
]

export interface ConnectivityResult {
  online: boolean
  latencyMs: number
  probedUrl: string
}

export async function checkInternetConnectivity(
  timeoutMs = 5000,
  url?: string,
): Promise<ConnectivityResult> {
  const targets = url ? [url] : PROBE_URLS

  for (const target of targets) {
    const start = performance.now()
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), timeoutMs)

      const res = await fetch(target, {
        method: 'HEAD',
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (res.ok || res.status === 200 || res.status === 301 || res.status === 302) {
        return {
          online: true,
          latencyMs: Math.round(performance.now() - start),
          probedUrl: target,
        }
      }
    } catch {
      // Try next URL
    }
  }

  return {
    online: false,
    latencyMs: -1,
    probedUrl: url || PROBE_URLS[0],
  }
}


