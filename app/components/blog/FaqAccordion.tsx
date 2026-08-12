import type { Faq } from '@/app/lib/blog/types'

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  if (!faqs?.length) return null

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group bg-paper border border-ink/10 rounded-2xl hover:border-terracotta/40 transition-colors"
        >
          <summary className="font-body font-semibold text-ink p-5 cursor-pointer list-none flex justify-between items-center gap-4">
            <span>{faq.question}</span>
            <span className="text-terracotta flex-shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
          </summary>
          <p className="font-body text-ink/70 text-sm leading-relaxed px-5 pb-5">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
