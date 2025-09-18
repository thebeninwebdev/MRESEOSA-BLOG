import Link from "next/link"

export function BlogHeader() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="https://mreseosa.com" className="flex items-center space-x-2">
            <h1 className="text-2xl font-[family-name:var(--font-playfair)] text-primary font-bold">
              MR | ESEOSA Blog
            </h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="https://mreseosa.com" className="text-foreground hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <Link href="https://wa.me/2349155276978" target="_blank" className="text-foreground hover:text-primary transition-colors duration-200">
              Reach Out
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
