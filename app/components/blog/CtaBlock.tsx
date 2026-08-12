import PillButton from '@/app/components/PillButton'
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  PHONE_SECONDARY,
  PHONE_SECONDARY_TEL,
  MAPS_QUERY_URL,
  SWIGGY_URL,
  ZOMATO_URL,
} from '@/app/lib/constants'

export default function CtaBlock() {
  return (
    <section className="rounded-3xl bg-ink text-paper px-6 py-10 md:px-10 md:py-12 my-12">
      <h2 className="font-heading text-3xl md:text-4xl mb-3">Ready to taste it yourself?</h2>
      <p className="font-body text-paper/60 max-w-xl mb-8">
        {ADDRESS_LINE_1}, {ADDRESS_LINE_2}. Walk in, order online, or call ahead — we roast fresh, to order.
      </p>
      <div className="flex flex-wrap gap-3">
        <PillButton href="/#location" variant="primary">Visit Restaurant</PillButton>
        <PillButton href={SWIGGY_URL} variant="swiggy">Order on Swiggy</PillButton>
        <PillButton href={ZOMATO_URL} variant="zomato">Order on Zomato</PillButton>
        <PillButton href={PHONE_SECONDARY_TEL} variant="outline" className="!border-paper/40 !text-paper hover:!bg-paper hover:!text-ink">
          Call {PHONE_SECONDARY}
        </PillButton>
        <PillButton href={MAPS_QUERY_URL} variant="outline" className="!border-paper/40 !text-paper hover:!bg-paper hover:!text-ink">
          Get Directions
        </PillButton>
      </div>
    </section>
  )
}
