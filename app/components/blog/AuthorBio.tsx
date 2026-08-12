export default function AuthorBio({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-5">
      <div className="w-12 h-12 rounded-full bg-terracotta/15 flex items-center justify-center font-heading text-lg text-terracotta flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-heading text-base text-ink">{name}</p>
        <p className="font-body text-xs text-ink/50">
          Writing from MK&apos;s Tandoori kitchen — Sector 75, Noida.
        </p>
      </div>
    </div>
  )
}
