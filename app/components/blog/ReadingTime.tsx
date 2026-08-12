export default function ReadingTime({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest text-ink/40">
      <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6v4l3 2" strokeLinecap="round" />
      </svg>
      {text}
    </span>
  )
}
