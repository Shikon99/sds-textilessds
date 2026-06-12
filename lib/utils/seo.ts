import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const siteName = 'SDS Textiles';

export function generateMetadata(
  title: string,
  description: string,
  ogImage?: string,
  path?: string
): Metadata {
  const url = path ? `${baseUrl}${path}` : baseUrl;

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: 'textiles, fabrics, clothing, SDS, premium quality',
    canonical: url,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org/',
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
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: 'PKR',
      price: product.discount_price || product.price,
      availability: 'https://schema.org/InStock',
    },
    sku: product.sku,
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SDS Textiles',
    url: baseUrl,
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20and%20Blue%203D%20Y2k%20Fashion%20Logo%20%283%29-McW3YazEzJmQPkOIqzaRyGw2ORLCPv.png',
    description: 'Premium textile shopping experience',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@sdstextiles.com',
    },
  };
}

export function canonicalUrl(path: string): string {
  return `${baseUrl}${path}`;
}
