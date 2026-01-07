export default function ShippingReturnsPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm tracking-[0.25em] uppercase text-white/60">
          Shipping & Returns
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05] text-white">
          Policies
        </h1>

        <div className="mt-8 max-w-2xl space-y-6 text-white/70 leading-relaxed">
          <p>
            Shipping details will be announced per drop. You’ll receive tracking
            information after dispatch.
          </p>
          <p>
            Returns are handled case-by-case due to limited runs. If your item
            arrives damaged or incorrect, contact us within 7 days.
          </p>
        </div>
      </div>
    </section>
  );
}
