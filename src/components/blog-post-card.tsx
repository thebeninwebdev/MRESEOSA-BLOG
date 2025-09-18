import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/app/types"
import { Card, CardContent } from "@/components/ui/card"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { slug, title, excerpt, featuredImage } = post.fields

  const imageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}`
    : "/blog-featured-image.png"

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link href={`/articles/${slug}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={featuredImage?.fields?.title || title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {title}
            </h2>
            {excerpt && <p className="text-muted-foreground line-clamp-3 leading-relaxed">{excerpt}</p>}
            <div className="pt-2">
              <span className="text-primary font-medium text-sm group-hover:underline">Read more →</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
