import { Document } from '@contentful/rich-text-types'

export interface BlogPost {
  fields: {
    slug: string
    title: string
    date: string
    excerpt?: string
    content?: Document // Rich text content from Contentful
    featuredImage?: {
      fields: {
        file: {
          url: string
        }
        title: string
      }
    }
  }
  sys: {
    id: string
  }
}

export interface BlogQueryResult {
  items: BlogPost[]
  total: number
}
