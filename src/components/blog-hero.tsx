export function BlogHero() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-foreground text-balance">
            Stories Worth Reading
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            My thoughtful insights, expert perspectives, and compelling narratives that inspire and inform your
            journey.
          </p>
        </div>
      </div>
    </section>
  )
}
