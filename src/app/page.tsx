import Link from "next/link"
import type { BlogQueryResult } from "./types"
import { createClient } from "contentful"
import { BlogHeader } from "@/components/blog-header"
import { BlogHero } from "@/components/blog-hero"
import { BlogPostCard } from "@/components/blog-post-card"
import { NewsletterForm } from "@/components/newsletter-form"

const client = createClient({
  space: process.env.SPACE_ID!,
  accessToken: process.env.ACCESS_TOKEN!,
})

const getBlogEntries = async (): Promise<BlogQueryResult> => {
  const entries = await client.getEntries({
    content_type: "pageBlogPost",
  })
  return entries as unknown as BlogQueryResult
}

export default async function Home() {
  const blogEntries = await getBlogEntries()

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <BlogHero />

      <main className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
            Latest Articles
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full"></div>
        </div>

        {blogEntries.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogEntries.items.map((post) => (
              <BlogPostCard key={post.sys.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-foreground mb-2">No articles yet</h3>
            <p className="text-muted-foreground">Check back soon for new content!</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-muted/30 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold font-[family-name:var(--font-playfair)] text-lg text-foreground mb-4">
                Sophisticated Blog
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Premium content for discerning readers who value quality insights and thoughtful perspectives.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <NewsletterForm />
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Sophisticated Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
