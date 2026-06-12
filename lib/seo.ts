export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  ogUrl?: string
  author?: string
  canonical?: string
  twitterHandle?: string
}

export function generateMetadata(seo: SEOMetadata) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    authors: seo.author ? [{ name: seo.author }] : [],
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      url: seo.ogUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
      creator: seo.twitterHandle,
    },
    alternates: seo.canonical ? { canonical: seo.canonical } : {},
  }
}

export function generateStructuredData(type: string, data: Record<string, any>) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return {
    __html: JSON.stringify(baseStructure),
  }
}

export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    brand: {
      '@type': 'Brand',
      name: 'SDS Textiles',
    },
    offers: {
      '@type': 'Offer',
      url: `https://sdstextiles.com/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.stock_quantity > 0 ? 'InStock' : 'OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 0,
      reviewCount: product.total_ratings || 0,
    },
  }
}

export function generateBreadcrumbs(items: Array<{ label: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://sdstextiles.com${item.url}`,
    })),
  }
}
