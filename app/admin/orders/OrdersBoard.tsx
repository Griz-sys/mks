'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AdminOrder, OrderStatus } from '@/app/lib/admin/orders-api'

const POLL_MS = 5_000
const RING_EVERY_MS = 8_000
const TZ = 'Asia/Kolkata'

type View = 'active' | 'history'
type Action = { label: string; status: OrderStatus; tone: 'primary' | 'danger' }

const isNew = (o: AdminOrder) => o.status === 'SCHEDULED' || o.status === 'PUSHED_TO_POS'
const cookFrom = (o: AdminOrder) => new Date(o.scheduledFor).getTime() - o.prepBufferMinutes * 60_000

function actionsFor(o: AdminOrder): Action[] {
  const cancel: Action = { label: 'Cancel', status: 'CANCELLED', tone: 'danger' }
  if (isNew(o)) return [{ label: 'Start preparing', status: 'PREPARING', tone: 'primary' }, cancel]
  if (o.status === 'PREPARING') return [{ label: 'Mark ready', status: 'READY', tone: 'primary' }, cancel]
  if (o.status === 'READY') return [{ label: 'Picked up', status: 'COMPLETED', tone: 'primary' }]
  return []
}

const money = (v: string | number) => `₹${Number(v).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
const dayKey = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: TZ })

function formatSlot(iso: string): string {
  const d = new Date(iso)
  const time = d.toLocaleTimeString('en-IN', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
  const today = dayKey(new Date())
  const tomorrow = dayKey(new Date(Date.now() + 86_400_000))
  if (dayKey(d) === today) return `Today, ${time}`
  if (dayKey(d) === tomorrow) return `Tomorrow, ${time}`
  return `${d.toLocaleDateString('en-IN', { timeZone: TZ, day: 'numeric', month: 'short' })}, ${time}`
}

function relative(ms: number): string {
  const mins = Math.round(ms / 60_000)
  if (Math.abs(mins) < 60) return `${Math.abs(mins)} min`
  const h = Math.floor(Math.abs(mins) / 60)
  const m = Math.abs(mins) % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

/** Short two-note chime via Web Audio — no sound file needed. */
function chime(ctx: AudioContext) {
  const notes = [880, 1320]
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const start = ctx.currentTime + i * 0.22
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.4, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5)
    osc.connect(gain).connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.5)
  })
}

export default function OrdersBoard() {
  const [view, setView] = useState<View>('active')
  const [orders, setOrders] = useState<AdminOrder[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [unseen, setUnseen] = useState<Set<string>>(new Set())
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [soundOn, setSoundOn] = useState(false)

  const seenIds = useRef<Set<string> | null>(null)
  const audio = useRef<AudioContext | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/orders?view=${view}`, { cache: 'no-store' })
      if (res.status === 401) {
        window.location.href = '/admin/login'
        return
      }
      const body = await res.json()
      if (!res.ok) throw new Error(body?.message ?? `Error ${res.status}`)

      const list = body as AdminOrder[]
      if (view === 'active') {
        // First load just records what's there; anything after that is new.
        const seen = seenIds.current
        if (seen) {
          const fresh = list.filter((o) => !seen.has(o.id)).map((o) => o.id)
          if (fresh.length)
            setUnseen((prev) => {
              const next = new Set(prev)
              fresh.forEach((id) => next.add(id))
              return next
            })
        }
        const nextSeen = seen ?? new Set<string>()
        list.forEach((o) => nextSeen.add(o.id))
        seenIds.current = nextSeen
      }
      setOrders(list)
      setError(null)
      setLastUpdated(new Date())
    } catch (err) {
      setError((err as Error).message)
    }
  }, [view])

  useEffect(() => {
    setOrders(null)
    load()
    const timer = setInterval(load, POLL_MS)
    return () => clearInterval(timer)
  }, [load])

  // Keep ringing until someone acknowledges the new orders.
  useEffect(() => {
    if (!soundOn || unseen.size === 0 || !audio.current) return
    chime(audio.current)
    const timer = setInterval(() => audio.current && chime(audio.current), RING_EVERY_MS)
    return () => clearInterval(timer)
  }, [soundOn, unseen.size])

  useEffect(() => {
    document.title = unseen.size ? `(${unseen.size}) New order! · MK's Admin` : "Orders · MK's Admin"
  }, [unseen.size])

  // Keep a counter tablet's screen awake while sound is on.
  useEffect(() => {
    if (!soundOn || !('wakeLock' in navigator)) return
    let lock: { release: () => Promise<void> } | null = null
    const acquire = async () => {
      try {
        lock = await (navigator as any).wakeLock.request('screen')
      } catch {
        // Not allowed (e.g. battery saver) — harmless.
      }
    }
    const onVisible = () => document.visibilityState === 'visible' && acquire()
    acquire()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      lock?.release().catch(() => {})
    }
  }, [soundOn])

  function enableSound() {
    audio.current ??= new AudioContext()
    audio.current.resume()
    chime(audio.current)
    setSoundOn(true)
  }

  function acknowledge(id?: string) {
    setUnseen((prev) => {
      if (!id) return new Set()
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  async function updateStatus(order: AdminOrder, action: Action) {
    if (action.status === 'CANCELLED' && !confirm(`Cancel order #${shortId(order.id)}? The customer will be notified.`)) return
    acknowledge(order.id)
    setPendingId(order.id)
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: action.status }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        alert(body?.message ?? 'Could not update the order')
      }
      await load()
    } finally {
      setPendingId(null)
    }
  }

  const now = Date.now()
  const active = orders ?? []
  const columns =
    view === 'active'
      ? [
          { title: 'New — cook now', hint: 'Due soon', items: active.filter((o) => isNew(o) && cookFrom(o) <= now) },
          { title: 'Preparing', hint: 'In the kitchen', items: active.filter((o) => o.status === 'PREPARING') },
          { title: 'Ready', hint: 'Waiting for pickup', items: active.filter((o) => o.status === 'READY') },
          { title: 'Upcoming', hint: 'Scheduled for later', items: active.filter((o) => isNew(o) && cookFrom(o) > now) },
        ]
      : []

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl text-ink">Orders</h1>
          <div className="flex rounded-full border border-ink/10 bg-white p-1">
            {(['active', 'history'] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-4 py-1.5 font-body text-sm font-semibold transition ${
                  view === v ? 'bg-ink text-paper' : 'text-ink/60 hover:text-terracotta'
                }`}
              >
                {v === 'active' ? 'Live' : 'History'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="font-body text-xs text-ink/40">
              Updated {lastUpdated.toLocaleTimeString('en-IN', { timeZone: TZ, hour: 'numeric', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
          {soundOn ? (
            <span className="rounded-full bg-green-100 text-green-700 px-3 py-1.5 font-body text-xs font-semibold">🔔 Sound on</span>
          ) : (
            <button
              onClick={enableSound}
              className="rounded-full bg-terracotta text-paper font-body text-sm font-semibold px-4 py-2 hover:bg-terracotta-dark transition"
            >
              🔔 Turn on order alerts
            </button>
          )}
        </div>
      </div>

      {unseen.size > 0 && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-terracotta text-paper px-5 py-4 animate-pulse">
          <p className="font-heading text-xl">
            {unseen.size} new order{unseen.size > 1 ? 's' : ''}!
          </p>
          <button
            onClick={() => acknowledge()}
            className="rounded-full bg-paper text-ink font-body text-sm font-semibold px-4 py-2"
          >
            Got it
          </button>
        </div>
      )}

      {error && (
        <p className="mb-6 rounded-2xl bg-red-50 text-red-700 px-5 py-3 font-body text-sm">
          Can’t reach the order server ({error}). Retrying every few seconds…
        </p>
      )}

      {orders === null && !error ? (
        <p className="font-body text-ink/50">Loading orders…</p>
      ) : view === 'active' ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col) => (
            <section key={col.title} className="min-w-0">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="font-heading text-lg text-ink">
                  {col.title} <span className="text-ink/40">({col.items.length})</span>
                </h2>
                <span className="font-body text-xs text-ink/40">{col.hint}</span>
              </div>
              <div className="space-y-3">
                {col.items.length === 0 && (
                  <p className="rounded-2xl border border-dashed border-ink/15 px-4 py-6 text-center font-body text-sm text-ink/30">
                    Nothing here
                  </p>
                )}
                {col.items.map((o) => (
                  <OrderCard
                    key={o.id}
                    order={o}
                    now={now}
                    highlight={unseen.has(o.id)}
                    pending={pendingId === o.id}
                    onAction={(a) => updateStatus(o, a)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : active.length === 0 ? (
        <p className="font-body text-ink/50">No completed or cancelled orders yet.</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {active.map((o) => (
            <OrderCard key={o.id} order={o} now={now} highlight={false} pending={false} onAction={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}

const shortId = (id: string) => id.slice(-6).toUpperCase()

function OrderCard({
  order,
  now,
  highlight,
  pending,
  onAction,
}: {
  order: AdminOrder
  now: number
  highlight: boolean
  pending: boolean
  onAction: (a: Action) => void
}) {
  const paid = order.payment?.status === 'CAPTURED'
  const due = new Date(order.scheduledFor).getTime() - now
  const finished = order.status === 'COMPLETED' || order.status === 'CANCELLED'

  return (
    <article
      className={`rounded-2xl border bg-white p-4 transition ${
        highlight ? 'border-terracotta ring-2 ring-terracotta/40' : 'border-ink/10'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-heading text-lg text-ink leading-tight">#{shortId(order.id)}</p>
          <p className="font-body text-sm text-ink/70 truncate">{order.user.name || 'Guest'}</p>
          <a href={`tel:${order.user.phone}`} className="font-body text-sm text-terracotta hover:underline">
            {order.user.phone}
          </a>
        </div>
        <div className="text-right shrink-0">
          <p className="font-body text-sm font-semibold text-ink">{formatSlot(order.scheduledFor)}</p>
          {!finished && (
            <p className={`font-body text-xs ${due < 0 ? 'text-red-600 font-semibold' : 'text-ink/50'}`}>
              {due < 0 ? `${relative(due)} late` : `pickup in ${relative(due)}`}
            </p>
          )}
          {order.status === 'CANCELLED' && (
            <span className="mt-1 inline-block rounded-full bg-red-100 text-red-700 px-2 py-0.5 font-body text-xs font-semibold">
              Cancelled
            </span>
          )}
          {order.status === 'COMPLETED' && (
            <span className="mt-1 inline-block rounded-full bg-green-100 text-green-700 px-2 py-0.5 font-body text-xs font-semibold">
              Completed
            </span>
          )}
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 border-t border-ink/5 pt-3">
        {order.items.map((it) => {
          const extras = [...(it.selectedVariations ?? []), ...(it.selectedAddons ?? [])].map((x) => x.name)
          return (
            <li key={it.id} className="font-body text-sm text-ink">
              <span className="font-semibold">{it.quantity} ×</span> {it.menuItem.name}
              {extras.length > 0 && <span className="block pl-5 text-xs text-ink/50">{extras.join(', ')}</span>}
            </li>
          )
        })}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3">
        <span className="font-heading text-lg text-ink">{money(order.totalAmount)}</span>
        <span
          className={`rounded-full px-2.5 py-1 font-body text-xs font-semibold ${
            paid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {paid ? 'Paid online' : 'Collect at pickup'}
        </span>
      </div>

      {actionsFor(order).length > 0 && (
        <div className="mt-3 flex gap-2">
          {actionsFor(order).map((a) => (
            <button
              key={a.status}
              disabled={pending}
              onClick={() => onAction(a)}
              className={`rounded-full font-body text-sm font-semibold px-4 py-2 transition disabled:opacity-50 ${
                a.tone === 'primary'
                  ? 'flex-1 bg-ink text-paper hover:bg-terracotta'
                  : 'border border-red-200 text-red-600 hover:bg-red-50'
              }`}
            >
              {pending && a.tone === 'primary' ? 'Saving…' : a.label}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}
