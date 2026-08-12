export const SESSION_COOKIE = 'mk_admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set')
  return secret
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i]
  return mismatch === 0
}

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload))
  const key = await getKey()
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64))
  const sigB64 = toBase64Url(new Uint8Array(signature))
  return `${payloadB64}.${sigB64}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [payloadB64, sigB64] = token.split('.')
  if (!payloadB64 || !sigB64) return false

  try {
    const key = await getKey()
    const expectedSig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64))
    if (!timingSafeEqual(new Uint8Array(expectedSig), fromBase64Url(sigB64))) return false

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)))
    return typeof payload.exp === 'number' && payload.exp > Date.now()
  } catch {
    return false
  }
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) throw new Error('ADMIN_PASSWORD is not set')
  if (candidate.length !== expected.length) return false
  return timingSafeEqual(new TextEncoder().encode(candidate), new TextEncoder().encode(expected))
}
