export type ProductCategory = "fashion" | "cosmetics" | "lifestyle";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: ProductCategory;
  collection: string;
  images: { src: string; alt: string }[];
  hoverImage?: string;
  materials: string[];
  craftsmanship: string;
  care: string;
  shipping: string;
  featured?: boolean;
  bestseller?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  category: ProductCategory | "all";
  productCount: number;
  featured?: boolean;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
