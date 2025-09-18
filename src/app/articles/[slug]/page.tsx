import { createClient } from "contentful"
import type { BlogPost } from "../../types"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const client = createClient({
  space: process.env.SPACE_ID!,
  accessToken: process.env.ACCESS_TOKEN!,
})

// Get single blog post by slug
const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const entries = await client.getEntries({
      content_type: "pageBlogPost",
      "fields.slug": slug,
      limit: 1,
    })

    if (entries.items.length === 0) {
      return null
    }

    return entries.items[0] as unknown as BlogPost
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

// Get related blog posts (excluding current post)
const getRelatedPosts = async (currentSlug: string, limit = 3): Promise<BlogPost[]> => {
  try {
    const entries = await client.getEntries({
      content_type: "pageBlogPost",
      "fields.slug[ne]": currentSlug, // Exclude current post
      limit,
    })

    return entries.items as unknown as BlogPost[]
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

// Rich text rendering options
const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="ml-4">{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-emerald-500 pl-6 py-4 mb-6 bg-gray-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const blogPost = await getBlogPost(slug)

  if (!blogPost) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug)
  const { title, content, featuredImage, excerpt } = blogPost.fields

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              alt={featuredImage.fields.title || title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">{title}</h1>
          {excerpt && <p className="text-xl text-gray-600 leading-relaxed font-light">{excerpt}</p>}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {content ? (
            documentToReactComponents(content, renderOptions)
          ) : (
            <p className="text-gray-700 leading-relaxed">
              Content will be displayed here when available from Contentful.
            </p>
          )}
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-serif">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => {
                const { slug, title, excerpt, featuredImage } = post.fields
                return (
                  <article
                    key={slug}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {featuredImage && (
                      <Link href={`/articles/${slug}`}>
                        <Image
                          src={`https:${featuredImage.fields.file.url}`}
                          alt={featuredImage.fields.title || title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    )}
                    <div className="p-6">
                      <Link href={`/articles/${slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-emerald-600 transition-colors font-serif">
                          {title}
                        </h3>
                      </Link>
                      {excerpt && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{excerpt}</p>}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params 

  const blogPost = await getBlogPost(slug)

  if (!blogPost) {
    return {
      title: "Post Not Found",
    }
  }

  const { title, excerpt, featuredImage } = blogPost.fields

  return {
    title: `${title} | Your Blog`,
    description: excerpt || `Read ${title} on our blog`,
    openGraph: {
      title,
      description: excerpt,
      images: featuredImage ? [`https:${featuredImage.fields.file.url}`] : [],
    },
  }
}
