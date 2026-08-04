import type { Product, Collection, JournalArticle, Testimonial, FAQ } from "@/types";

export const collections: Collection[] = [
  {
    id: "1",
    slug: "nocturne",
    name: "Nocturne",
    description: "Evening silhouettes defined by shadow and structure.",
    longDescription:
      "Nocturne captures the quiet drama of evening — architectural tailoring, fluid draping, and a palette drawn from twilight. Each piece is conceived as a study in proportion, designed to move with intention through candlelit spaces.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80",
    imageAlt: "Nocturne collection — architectural evening fashion in deep charcoal",
    category: "fashion",
    productCount: 12,
    featured: true,
  },
  {
    id: "2",
    slug: "lumiere",
    name: "Lumière",
    description: "Skincare and fragrance rituals for luminous skin.",
    longDescription:
      "Lumière is our ode to radiance — formulations developed over years of research, blending rare botanical extracts with advanced science. A daily ritual that transforms skincare into ceremony.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80",
    imageAlt: "Lumière collection — luxury skincare and fragrance on marble surface",
    category: "cosmetics",
    productCount: 8,
    featured: true,
  },
  {
    id: "3",
    slug: "atelier",
    name: "Atelier",
    description: "Objects of permanence for the considered home.",
    longDescription:
      "Atelier presents a curated selection of lifestyle objects — hand-thrown ceramics, woven textiles, and sculptural vessels — each chosen for its material honesty and enduring beauty.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    imageAlt: "Atelier collection — sculptural ceramics and textiles in a minimal interior",
    category: "lifestyle",
    productCount: 15,
    featured: true,
  },
  {
    id: "4",
    slug: "vestige",
    name: "Vestige",
    description: "Heritage tailoring reimagined for the modern wardrobe.",
    longDescription:
      "Vestige draws from archival silhouettes — double-breasted coats, wide-leg trousers, and structured blazers — refined through a contemporary lens. Timeless pieces that anchor any wardrobe.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    imageAlt: "Vestige collection — heritage tailoring in neutral tones",
    category: "fashion",
    productCount: 10,
  },
  {
    id: "5",
    slug: "essence",
    name: "Essence",
    description: "Concentrated beauty essentials with singular purpose.",
    longDescription:
      "Essence distills beauty to its purest form — multi-functional formulations, refined textures, and fragrances composed like olfactory architecture. Less product, more intention.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
    imageAlt: "Essence collection — minimalist luxury cosmetics",
    category: "cosmetics",
    productCount: 6,
  },
  {
    id: "6",
    slug: "sanctuary",
    name: "Sanctuary",
    description: "Textiles and objects that transform space into refuge.",
    longDescription:
      "Sanctuary is an invitation to slow down — cashmere throws, linen bedding, and ambient lighting designed to create spaces of calm. Every object is selected for tactile pleasure and visual serenity.",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80",
    imageAlt: "Sanctuary collection — luxury home textiles in warm neutral palette",
    category: "lifestyle",
    productCount: 11,
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "structured-wool-coat",
    name: "Structured Wool Coat",
    description: "Double-breasted coat in Italian virgin wool with architectural shoulders.",
    longDescription:
      "Cut from the finest Italian virgin wool, this double-breasted coat embodies VULCIRA's commitment to architectural tailoring. Structured shoulders give way to a fluid silhouette, while horn buttons and a silk-lined interior speak to uncompromising craftsmanship.",
    price: 2890,
    category: "fashion",
    collection: "vestige",
    images: [
      { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80", alt: "Structured wool coat in charcoal — front view" },
      { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", alt: "Structured wool coat — detail of horn buttons" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    materials: ["100% Italian Virgin Wool", "Horn Buttons", "Silk Lining"],
    craftsmanship: "Hand-finished in our Milan atelier. Each coat requires over 40 hours of skilled tailoring, including hand-stitched buttonholes and canvas construction for lasting structure.",
    care: "Dry clean only. Store on a padded hanger in a breathable garment bag. Brush lightly after wear to maintain the wool's natural luster.",
    shipping: "Complimentary worldwide shipping. Delivered in signature VULCIRA packaging within 5–7 business days.",
    featured: true,
    bestseller: true,
  },
  {
    id: "2",
    slug: "silk-crepe-blouse",
    name: "Silk Crepe Blouse",
    description: "Fluid blouse in double-faced silk crepe with concealed placket.",
    longDescription:
      "A study in quiet elegance, this blouse is crafted from double-faced silk crepe that drapes effortlessly against the body. The concealed placket and mother-of-pearl buttons maintain a clean, uninterrupted line.",
    price: 890,
    category: "fashion",
    collection: "nocturne",
    images: [
      { src: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80", alt: "Silk crepe blouse in ivory — editorial styling" },
      { src: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80", alt: "Silk crepe blouse — fabric detail" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    materials: ["100% Silk Crepe", "Mother-of-Pearl Buttons"],
    craftsmanship: "French seams throughout. Each blouse is cut on the bias for optimal drape and finished by hand in our Paris workshop.",
    care: "Hand wash cold or dry clean. Iron on low heat with a pressing cloth. Store folded in tissue paper.",
    shipping: "Complimentary worldwide shipping. Delivered within 3–5 business days.",
    bestseller: true,
  },
  {
    id: "3",
    slug: "radiance-serum",
    name: "Radiance Serum",
    description: "Concentrated luminizing serum with rare white truffle extract.",
    longDescription:
      "Our signature Radiance Serum combines rare white truffle extract with stabilized vitamin C and hyaluronic acid. The lightweight formula absorbs instantly, leaving skin visibly luminous and refined over time.",
    price: 320,
    category: "cosmetics",
    collection: "lumiere",
    images: [
      { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80", alt: "Radiance Serum in matte glass bottle" },
      { src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80", alt: "Radiance Serum — texture detail on skin" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    materials: ["White Truffle Extract", "Stabilized Vitamin C", "Hyaluronic Acid", "Squalane"],
    craftsmanship: "Formulated in our Grasse laboratory over three years of development. Each batch is hand-poured and individually numbered.",
    care: "Apply 3–4 drops to cleansed skin morning and evening. Follow with moisturizer. Store in a cool, dry place away from direct sunlight.",
    shipping: "Complimentary worldwide shipping. Delivered within 3–5 business days.",
    featured: true,
    bestseller: true,
  },
  {
    id: "4",
    slug: "noir-parfum",
    name: "Noir Parfum",
    description: "Eau de parfum with notes of oud, iris, and smoked vetiver.",
    longDescription:
      "Noir is an olfactory architecture — opening with the brightness of bergamot before descending into the depth of oud and iris. Smoked vetiver anchors the composition, creating a fragrance that evolves on the skin throughout the day.",
    price: 285,
    category: "cosmetics",
    collection: "essence",
    images: [
      { src: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80", alt: "Noir Parfum in sculptural glass flacon" },
      { src: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80", alt: "Noir Parfum — fragrance notes arrangement" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    materials: ["Bergamot", "Oud", "Iris", "Smoked Vetiver", "Amber"],
    craftsmanship: "Composed by master perfumer Élise Moreau in Grasse. Macerated for six months before bottling in hand-blown glass.",
    care: "Apply to pulse points. Avoid rubbing. Store upright in original box, away from heat and light.",
    shipping: "Complimentary worldwide shipping. Delivered within 3–5 business days.",
    bestseller: true,
  },
  {
    id: "5",
    slug: "cashmere-throw",
    name: "Cashmere Throw",
    description: "Hand-woven cashmere throw in undyed natural tones.",
    longDescription:
      "Woven on traditional looms in the Scottish Highlands, this cashmere throw is left undyed to celebrate the natural variation of the fiber. Generous in size, it drapes beautifully over a sofa or bed.",
    price: 1450,
    category: "lifestyle",
    collection: "sanctuary",
    images: [
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", alt: "Cashmere throw in natural cream draped on linen sofa" },
      { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", alt: "Cashmere throw — weave texture detail" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    materials: ["100% Grade-A Mongolian Cashmere"],
    craftsmanship: "Hand-woven by master weavers in the Scottish Borders. Each throw takes approximately two weeks to complete on traditional shuttle looms.",
    care: "Dry clean recommended. If washing at home, use cold water and cashmere-specific detergent. Lay flat to dry.",
    shipping: "Complimentary worldwide shipping. Delivered within 5–7 business days.",
    featured: true,
  },
  {
    id: "6",
    slug: "ceramic-vessel",
    name: "Ceramic Vessel",
    description: "Hand-thrown stoneware vessel with matte glaze finish.",
    longDescription:
      "Each vessel is individually thrown by ceramicist Yuki Tanaka in her Kyoto studio. The matte glaze — developed exclusively for VULCIRA — creates a tactile surface that catches light subtly, changing character throughout the day.",
    price: 680,
    category: "lifestyle",
    collection: "atelier",
    images: [
      { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", alt: "Hand-thrown ceramic vessel in warm stone glaze" },
      { src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80", alt: "Ceramic vessel — sculptural form detail" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    materials: ["Stoneware Clay", "Matte Glaze"],
    craftsmanship: "Hand-thrown and glazed by Yuki Tanaka. Each piece is unique, signed, and numbered. Fired at 1280°C for durability.",
    care: "Wipe clean with a damp cloth. Not suitable for direct food contact. Display away from direct sunlight to preserve glaze integrity.",
    shipping: "Complimentary worldwide shipping. Delivered within 7–10 business days with custom protective packaging.",
  },
  {
    id: "7",
    slug: "wide-leg-trouser",
    name: "Wide-Leg Trouser",
    description: "High-waisted trouser in Japanese cotton twill with pressed crease.",
    longDescription:
      "Cut from substantial Japanese cotton twill, these wide-leg trousers feature a high waist and precise pressed crease. The clean lines and generous proportion create an elongated silhouette that moves with quiet confidence.",
    price: 750,
    category: "fashion",
    collection: "vestige",
    images: [
      { src: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80", alt: "Wide-leg trouser in sand tone — full length view" },
      { src: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80", alt: "Wide-leg trouser — waist and pleat detail" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    materials: ["100% Japanese Cotton Twill"],
    craftsmanship: "Constructed with a full canvas waistband and hand-finished hems. Each pair is pressed and inspected individually.",
    care: "Machine wash cold on gentle cycle. Hang dry. Press crease with steam iron on cotton setting.",
    shipping: "Complimentary worldwide shipping. Delivered within 3–5 business days.",
  },
  {
    id: "8",
    slug: "velvet-lip-colour",
    name: "Velvet Lip Colour",
    description: "Matte lip colour with nourishing botanical oils.",
    longDescription:
      "A velvet-matte lip colour that delivers rich, buildable pigment without drying the lips. Infused with jojoba and rosehip oils, the formula glides on smoothly and wears for hours with a soft, powdery finish.",
    price: 48,
    category: "cosmetics",
    collection: "essence",
    images: [
      { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80", alt: "Velvet Lip Colour in deep rose shade" },
      { src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80", alt: "Velvet Lip Colour — swatch on model" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
    materials: ["Jojoba Oil", "Rosehip Oil", "Mineral Pigments"],
    craftsmanship: "Poured in small batches in our Paris color laboratory. Each shade is developed through extensive wear-testing.",
    care: "Apply directly from the bullet or with a lip brush. Remove with cleansing oil.",
    shipping: "Complimentary worldwide shipping on qualifying orders.",
    bestseller: true,
  },
  {
    id: "9",
    slug: "satin-evening-gown",
    name: "Satin Evening Gown",
    description: "Floor-length gown in fluid satin with architectural neckline.",
    longDescription:
      "Cut on the bias from Italian satin, this evening gown moves like liquid light. The architectural neckline frames the collarbone with precision, while the train falls in a clean, uninterrupted line — a study in evening restraint.",
    price: 0,
    category: "fashion",
    collection: "nocturne",
    images: [
      { src: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80", alt: "Satin evening gown in deep charcoal — full length" },
      { src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80", alt: "Satin evening gown — neckline detail" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    materials: ["100% Italian Satin", "Silk Lining"],
    craftsmanship: "Hand-finished in our Milan atelier with invisible hems and hand-sewn closures.",
    care: "Dry clean only. Store hanging in a breathable garment bag.",
    shipping: "Complimentary worldwide shipping. Delivered within 5–7 business days.",
    featured: true,
  },
  {
    id: "10",
    slug: "architect-blazer",
    name: "Architect Blazer",
    description: "Single-breasted blazer with sharp shoulders and clean lines.",
    longDescription:
      "A modern interpretation of tailoring's most essential piece. Structured shoulders, a suppressed waist, and horn buttons create a silhouette that is simultaneously powerful and refined.",
    price: 0,
    category: "fashion",
    collection: "vestige",
    images: [
      { src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80", alt: "Architect blazer in navy — front view" },
      { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", alt: "Architect blazer — tailoring detail" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    materials: ["100% Wool Gabardine", "Horn Buttons", "Silk Lining"],
    craftsmanship: "Canvas construction with hand-padded lapels. Finished in our Milan atelier.",
    care: "Dry clean only. Brush after wear and store on a structured hanger.",
    shipping: "Complimentary worldwide shipping. Delivered within 5–7 business days.",
  },
  {
    id: "11",
    slug: "luminous-facial-oil",
    name: "Luminous Facial Oil",
    description: "Nourishing facial oil with rosehip and camellia extracts.",
    longDescription:
      "A lightweight yet deeply nourishing oil that absorbs without residue. Rosehip and camellia extracts work in harmony to restore radiance and strengthen the skin barrier overnight.",
    price: 0,
    category: "cosmetics",
    collection: "lumiere",
    images: [
      { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80", alt: "Luminous Facial Oil in glass dropper bottle" },
      { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80", alt: "Luminous Facial Oil — texture on skin" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80",
    materials: ["Rosehip Oil", "Camellia Extract", "Vitamin E", "Squalane"],
    craftsmanship: "Cold-pressed and blended in our Grasse laboratory in small batches.",
    care: "Apply 4–5 drops to cleansed skin evening. Gently press into face and neck.",
    shipping: "Complimentary worldwide shipping. Delivered within 3–5 business days.",
  },
  {
    id: "12",
    slug: "hand-blown-candleholder",
    name: "Hand-Blown Candleholder",
    description: "Sculptural candleholder in smoked glass with brass base.",
    longDescription:
      "Each candleholder is mouth-blown by artisans in Murano, then paired with a brushed brass base. The smoked glass diffuses candlelight into a warm, ambient glow — an object of quiet ceremony.",
    price: 0,
    category: "lifestyle",
    collection: "atelier",
    images: [
      { src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80", alt: "Hand-blown candleholder in smoked glass" },
      { src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80", alt: "Candleholder — ambient interior styling" },
    ],
    hoverImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    materials: ["Murano Glass", "Brushed Brass"],
    craftsmanship: "Mouth-blown in Murano and finished with a hand-turned brass base. Each piece is unique.",
    care: "Wipe with a soft cloth. Do not expose to extreme temperature changes.",
    shipping: "Complimentary worldwide shipping. Delivered within 7–10 business days.",
  },
];

export const journalArticles: JournalArticle[] = [
  {
    id: "1",
    slug: "the-art-of-quiet-luxury",
    title: "The Art of Quiet Luxury",
    excerpt: "In an age of excess, restraint becomes the ultimate expression of confidence.",
    content: `There is a particular kind of luxury that does not announce itself. It does not shimmer or shout. It exists in the quality of a seam, the weight of a fabric, the way light falls across an unadorned surface.

At VULCIRA, we have always believed that true luxury is felt rather than seen. It lives in the spaces between — in the pause before a gesture, in the confidence of understatement.

This philosophy guides every decision we make, from the selection of raw materials to the architecture of our retail spaces. We do not chase trends. We pursue permanence.

Quiet luxury is not about having less. It is about choosing more carefully. Each object in the VULCIRA world is selected for its ability to endure — aesthetically, materially, emotionally. These are pieces that become part of your life, not part of a season.

We invite you to discover what it means to dress, to adorn, to inhabit your space with intention.`,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
    imageAlt: "Editorial fashion photography — model in minimalist luxury attire",
    category: "Philosophy",
    author: "Isabelle Laurent",
    publishedAt: "2026-01-15",
    readTime: "6 min",
  },
  {
    id: "2",
    slug: "inside-the-milan-atelier",
    title: "Inside the Milan Atelier",
    excerpt: "A rare glimpse into the workshop where VULCIRA's tailoring comes to life.",
    content: `The atelier on Via della Spiga has been our tailoring home since VULCIRA's founding. Behind an unmarked door, a team of twelve master tailors work in concentrated silence, each focused on a single garment.

The process begins with fabric — always sourced from mills we have visited personally. Italian wool from Biella, silk from Como, cotton from Japan. Each bolt is inspected, rested, and cut with precision that can only come from decades of practice.

A VULCIRA coat requires over forty hours of handwork. Canvas is pad-stitched by hand. Buttonholes are sewn with silk thread. The lining is cut to move with the body, never against it.

We believe that when you understand how something is made, you value it differently. This is why we open our atelier doors — not as spectacle, but as testimony to the craft that defines us.`,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80",
    imageAlt: "Milan tailoring atelier — master tailor at work",
    category: "Craftsmanship",
    author: "Marco Bellini",
    publishedAt: "2026-02-03",
    readTime: "8 min",
  },
  {
    id: "3",
    slug: "scent-as-architecture",
    title: "Scent as Architecture",
    excerpt: "How our master perfumer composes fragrance with the precision of a architect.",
    content: `Fragrance, like architecture, is about structure. A building needs foundation, walls, a roof. A perfume needs base notes, heart notes, top notes. Both must stand the test of time.

When Élise Moreau began composing Noir, our signature fragrance, she did not think in terms of ingredients. She thought in terms of space — the way a scent opens a room in the mind, how it creates corridors of memory and emotion.

The process took three years. Hundreds of iterations. Thousands of blotter tests. The result is a fragrance that unfolds slowly, revealing new dimensions with each wearing.

At VULCIRA, we treat perfumery with the same reverence we bring to tailoring. Each flacon is hand-blown. Each batch is macerated for six months. Each bottle is a small monument to the art of composition.`,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80",
    imageAlt: "Perfume composition — glass flacons and raw materials",
    category: "Fragrance",
    author: "Élise Moreau",
    publishedAt: "2026-02-20",
    readTime: "5 min",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "VULCIRA understands that luxury is not about logos. It is about the way a coat falls on your shoulders, the weight of cashmere against your skin. Nothing else comes close.",
    author: "Catherine Moreau",
    title: "Editor-in-Chief, L'Éclat",
  },
  {
    id: "2",
    quote:
      "The Radiance Serum changed my relationship with skincare. It is not a product — it is a ritual. My skin has never looked more refined.",
    author: "Dr. Amara Osei",
    title: "Dermatologist & Author",
  },
  {
    id: "3",
    quote:
      "Every piece from VULCIRA feels like it was made for me alone. The attention to proportion, the quality of materials — this is what fashion should be.",
    author: "James Whitfield",
    title: "Creative Director",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What is your return policy?",
    answer:
      "We offer complimentary returns within 30 days of delivery. Items must be unworn, with all original tags and packaging intact. Contact our concierge team to initiate a return.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes. We ship worldwide with complimentary delivery on all orders. International orders typically arrive within 7–14 business days, depending on destination.",
  },
  {
    question: "How can I care for my VULCIRA garments?",
    answer:
      "Each product includes detailed care instructions. We recommend professional dry cleaning for tailored pieces and hand washing for delicate fabrics. Our care guide is available on every product page.",
  },
  {
    question: "Can I visit a VULCIRA boutique?",
    answer:
      "Our flagship atelier is located at 740 Madison Avenue, New York. We welcome private appointments — please contact our concierge to schedule a visit.",
  },
  {
    question: "Are your products sustainably made?",
    answer:
      "Sustainability is integral to our philosophy. We source materials from certified suppliers, produce in limited quantities to minimize waste, and partner with artisans who share our commitment to responsible craftsmanship.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}
