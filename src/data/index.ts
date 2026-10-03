export interface DesignImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Design {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  collectionId: string;
  category: string;
  images: DesignImage[];
  price?: string;
  priceType: 'fixed' | 'starting' | 'on-request';
  availability: 'available' | 'made-to-order' | 'sold';
  customizable: boolean;
  featured: boolean;
  tags: string[];
  material?: string;
  craft?: string;
  occasion?: string;
  care?: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  featured: boolean;
  sortOrder: number;
}

export const collections: Collection[] = [
  {
    id: 'jewellery',
    name: 'Jewellery',
    slug: 'jewellery',
    description: 'Timeless pieces designed to complement every occasion.',
    coverImage: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=800&q=80',
    featured: true,
    sortOrder: 1,
  },
  {
    id: 'traditional-ornaments',
    name: 'Traditional Ornaments',
    slug: 'traditional-ornaments',
    description: 'Celebrating Indian craftsmanship and tradition.',
    coverImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    featured: true,
    sortOrder: 2,
  },
  {
    id: 'embroidery',
    name: 'Embroidery',
    slug: 'embroidery',
    description: 'Detailed handcrafted embroidery created with patience and artistry.',
    coverImage: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80',
    featured: true,
    sortOrder: 3,
  },
  {
    id: 'navratri',
    name: 'Navratri Collection',
    slug: 'navratri',
    description: 'Celebrate every Garba night with handcrafted festive ornaments.',
    coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    featured: true,
    sortOrder: 4,
  },
  {
    id: 'custom',
    name: 'Custom Designs',
    slug: 'custom',
    description: 'Have something special in mind? Let us create it for you.',
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    featured: true,
    sortOrder: 5,
  },
];

export const designs: Design[] = [
  {
    id: 'd1',
    name: 'Pearl Drop Chandbali',
    slug: 'pearl-drop-chandbali',
    description: 'Elegant crescent-shaped earrings adorned with delicate pearl drops, perfect for festive occasions.',
    longDescription: 'These crescent-shaped chandbalis feature meticulously placed freshwater pearls that catch the light beautifully. Each pair is handcrafted over several hours, with attention to every curve and setting. The design draws from traditional Mughal-era jewellery while maintaining a contemporary elegance.',
    collectionId: 'jewellery',
    category: 'Earrings',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', alt: 'Pearl Drop Chandbali - Front View', isPrimary: true },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', alt: 'Pearl Drop Chandbali - Detail' },
      { id: 'i3', url: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=800&q=80', alt: 'Pearl Drop Chandbali - Styled' },
    ],
    price: '₹2,800',
    priceType: 'starting',
    availability: 'made-to-order',
    customizable: true,
    featured: true,
    tags: ['earrings', 'pearl', 'festive', 'handmade'],
    material: 'Gold-plated brass, freshwater pearls',
    craft: 'Hand-set stone work',
    occasion: 'Festive, Wedding, Reception',
    care: 'Store in a soft pouch. Avoid contact with perfume.',
  },
  {
    id: 'd2',
    name: 'Kundan Heritage Necklace',
    slug: 'kundan-heritage-necklace',
    description: 'A statement necklace featuring traditional Kundan work with intricate gold detailing.',
    longDescription: 'This heritage necklace showcases the art of Kundan setting — uncut stones set in pure gold foil. The design takes inspiration from Rajasthani royal jewellery, featuring a central medallion surrounded by delicate gold wire work. Each stone is individually set by hand.',
    collectionId: 'jewellery',
    category: 'Necklace',
    images: [
      { id: 'i4', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', alt: 'Kundan Heritage Necklace - Front', isPrimary: true },
      { id: 'i5', url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', alt: 'Kundan Heritage Necklace - Detail' },
      { id: 'i6', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80', alt: 'Kundan Heritage Necklace - Worn' },
    ],
    price: '₹5,500',
    priceType: 'starting',
    availability: 'made-to-order',
    customizable: true,
    featured: true,
    tags: ['necklace', 'kundan', 'bridal', 'traditional'],
    material: 'Gold-plated brass, Kundan stones, enamel',
    craft: 'Kundan setting, Meenakari',
    occasion: 'Bridal, Wedding, Festive',
    care: 'Keep away from moisture. Clean with soft dry cloth.',
  },
  {
    id: 'd3',
    name: 'Navratri Chandbali Ornament',
    slug: 'navratri-chandbali-ornament',
    description: 'Handcrafted festive ornament designed to complement traditional Garba and Navratri styling.',
    longDescription: 'Created specifically for Navratri celebrations, these oversized chandbalis feature vibrant enamel work in traditional festive colors. The design incorporates mirror work elements and dangling beads that move beautifully during Garba dance.',
    collectionId: 'navratri',
    category: 'Earrings',
    images: [
      { id: 'i7', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', alt: 'Navratri Chandbali - Front', isPrimary: true },
      { id: 'i8', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', alt: 'Navratri Chandbali - Detail' },
      { id: 'i9', url: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80', alt: 'Navratri Chandbali - Styled' },
    ],
    price: '₹1,800',
    priceType: 'starting',
    availability: 'available',
    customizable: true,
    featured: true,
    tags: ['navratri', 'chandbali', 'festive', 'garba'],
    material: 'Gold-plated brass, enamel, glass beads',
    craft: 'Enamel work, bead stringing',
    occasion: 'Navratri, Garba, Festive',
    care: 'Handle with care. Store flat in provided box.',
  },
  {
    id: 'd4',
    name: 'Zari Embroidered Clutch',
    slug: 'zari-embroidered-clutch',
    description: 'Luxurious clutch featuring intricate zari embroidery on rich silk fabric.',
    longDescription: 'This clutch showcases traditional zari embroidery — gold and silver thread work done by hand on pure silk. Each piece takes approximately 40 hours to complete. The design features traditional paisley motifs interwoven with delicate floral patterns.',
    collectionId: 'embroidery',
    category: 'Accessory',
    images: [
      { id: 'i10', url: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80', alt: 'Zari Embroidered Clutch - Front', isPrimary: true },
      { id: 'i11', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', alt: 'Zari Embroidered Clutch - Detail' },
      { id: 'i12', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', alt: 'Zari Embroidered Clutch - Interior' },
    ],
    price: '₹3,200',
    priceType: 'starting',
    availability: 'made-to-order',
    customizable: true,
    featured: true,
    tags: ['embroidery', 'zari', 'clutch', 'luxury'],
    material: 'Pure silk, zari thread, satin lining',
    craft: 'Hand embroidery, zari work',
    occasion: 'Wedding, Reception, Festive',
    care: 'Dry clean only. Store in dust bag.',
  },
  {
    id: 'd5',
    name: 'Bridal Matha Patti',
    slug: 'bridal-matha-patti',
    description: 'Traditional forehead ornament crafted for the modern bride.',
    longDescription: 'This matha patti combines traditional design sensibility with contemporary wearability. Featuring a central pendant with delicate chain work that frames the face beautifully. Each stone is hand-set and the chains are individually adjusted for a perfect fit.',
    collectionId: 'traditional-ornaments',
    category: 'Head Ornament',
    images: [
      { id: 'i13', url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', alt: 'Bridal Matha Patti - Front', isPrimary: true },
      { id: 'i14', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', alt: 'Bridal Matha Patti - Detail' },
      { id: 'i15', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80', alt: 'Bridal Matha Patti - Worn' },
    ],
    price: '₹4,500',
    priceType: 'starting',
    availability: 'made-to-order',
    customizable: true,
    featured: true,
    tags: ['bridal', 'matha-patti', 'traditional', 'head-ornament'],
    material: 'Gold-plated brass, Kundan stones, pearls',
    craft: 'Kundan setting, chain work',
    occasion: 'Bridal, Wedding',
    care: 'Store flat. Avoid pulling chains.',
  },
  {
    id: 'd6',
    name: 'Mirror Work Garba Earrings',
    slug: 'mirror-work-garba-earrings',
    description: 'Vibrant jhumka-style earrings with traditional mirror work, perfect for nine nights of dance.',
    longDescription: 'These statement jhumkas feature authentic mirror work (abhala) set in colorful enamel bases. The design celebrates the spirit of Garba with bold colors and movement. Lightweight enough for all-night dancing yet striking enough to be the centerpiece of your outfit.',
    collectionId: 'navratri',
    category: 'Earrings',
    images: [
      { id: 'i16', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', alt: 'Mirror Work Earrings - Front', isPrimary: true },
      { id: 'i17', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', alt: 'Mirror Work Earrings - Side' },
      { id: 'i18', url: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=800&q=80', alt: 'Mirror Work Earrings - Styled' },
    ],
    price: '₹1,500',
    priceType: 'starting',
    availability: 'available',
    customizable: true,
    featured: false,
    tags: ['navratri', 'jhumka', 'mirror-work', 'garba'],
    material: 'Brass, glass mirrors, enamel, thread',
    craft: 'Mirror work, enamel coloring',
    occasion: 'Navratri, Garba, Festive',
    care: 'Handle mirrors gently. Store in box.',
  },
  {
    id: 'd7',
    name: 'Embroidered Potli Bag',
    slug: 'embroidered-potli-bag',
    description: 'Hand-embroidered potli bag with traditional motifs and silk thread work.',
    longDescription: 'This potli bag features detailed thread embroidery depicting traditional Indian motifs — peacocks, lotus flowers, and paisley patterns. Each bag is entirely hand-embroidered using silk threads on a cotton-silk base, taking approximately 25 hours to complete.',
    collectionId: 'embroidery',
    category: 'Bag',
    images: [
      { id: 'i19', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', alt: 'Embroidered Potli - Front', isPrimary: true },
      { id: 'i20', url: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80', alt: 'Embroidered Potli - Detail' },
      { id: 'i21', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', alt: 'Embroidered Potli - Open' },
    ],
    price: '₹2,200',
    priceType: 'starting',
    availability: 'made-to-order',
    customizable: true,
    featured: false,
    tags: ['embroidery', 'potli', 'bag', 'thread-work'],
    material: 'Cotton-silk base, silk embroidery thread',
    craft: 'Silk thread embroidery',
    occasion: 'Festive, Wedding, Casual ethnic',
    care: 'Spot clean with damp cloth. Air dry.',
  },
  {
    id: 'd8',
    name: 'Temple Jewellery Set',
    slug: 'temple-jewellery-set',
    description: 'Classic temple jewellery set featuring necklace, earrings, and maang tikka.',
    longDescription: 'Inspired by the jewellery adorning South Indian temple deities, this set features bold gold-toned pieces with intricate deity motifs and ruby-style stone accents. The set includes a necklace, matching jhumkas, and a maang tikka — complete bridal adornment.',
    collectionId: 'traditional-ornaments',
    category: 'Set',
    images: [
      { id: 'i22', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', alt: 'Temple Jewellery Set - Full', isPrimary: true },
      { id: 'i23', url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', alt: 'Temple Jewellery Set - Necklace Detail' },
      { id: 'i24', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80', alt: 'Temple Jewellery Set - Styled' },
    ],
    price: '₹8,500',
    priceType: 'starting',
    availability: 'made-to-order',
    customizable: true,
    featured: true,
    tags: ['temple', 'set', 'bridal', 'traditional'],
    material: 'Gold-plated brass, stone accents, pearls',
    craft: 'Casting, stone setting, hand finishing',
    occasion: 'Bridal, Temple visit, Classical dance',
    care: 'Wipe after each use. Store separately.',
  },
  {
    id: 'd9',
    name: 'Custom Festive Jhumka',
    slug: 'custom-festive-jhumka',
    description: 'Design your own festive jhumka — choose colors, stones, and size for a truly personal piece.',
    longDescription: 'This is a fully customizable jhumka design where you choose every element — base color, stone type, size, tassel style, and more. Work directly with our artisans to create something uniquely yours. Perfect for matching a specific outfit or creating a signature festive look.',
    collectionId: 'custom',
    category: 'Earrings',
    images: [
      { id: 'i25', url: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=800&q=80', alt: 'Custom Jhumka - Example 1', isPrimary: true },
      { id: 'i26', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', alt: 'Custom Jhumka - Example 2' },
      { id: 'i27', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', alt: 'Custom Jhumka - Example 3' },
    ],
    priceType: 'on-request',
    availability: 'made-to-order',
    customizable: true,
    featured: true,
    tags: ['custom', 'jhumka', 'festive', 'personalized'],
    material: 'Customizable',
    craft: 'Handcrafted to your specifications',
    occasion: 'Any festive occasion',
    care: 'Care instructions provided with piece.',
  },
  {
    id: 'd10',
    name: 'Navratri Hair Accessory Set',
    slug: 'navratri-hair-accessory-set',
    description: 'Decorative hair pins and clips adorned with traditional motifs for your Garba styling.',
    longDescription: 'A curated set of hair accessories designed specifically for Navratri styling. Includes decorative pins, a hair chain (jumka), and ornamental clips — all featuring traditional mirror and bead work that catches the light as you dance.',
    collectionId: 'navratri',
    category: 'Hair Accessory',
    images: [
      { id: 'i28', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80', alt: 'Hair Accessory Set - Full', isPrimary: true },
      { id: 'i29', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', alt: 'Hair Accessory Set - Detail' },
      { id: 'i30', url: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80', alt: 'Hair Accessory Set - Styled' },
    ],
    price: '₹1,200',
    priceType: 'starting',
    availability: 'available',
    customizable: true,
    featured: false,
    tags: ['navratri', 'hair', 'accessory', 'garba'],
    material: 'Brass, glass beads, mirrors',
    craft: 'Bead stringing, mirror setting',
    occasion: 'Navratri, Garba',
    care: 'Store in provided box. Keep dry.',
  },
  {
    id: 'd11',
    name: 'Polki Drop Earrings',
    slug: 'polki-drop-earrings',
    description: 'Elegant polki drop earrings with a contemporary silhouette and traditional setting.',
    longDescription: 'These drop earrings feature uncut diamond-style polki stones set in a modern silhouette. The teardrop shape elongates beautifully and the subtle sparkle makes them versatile enough for both day and evening wear.',
    collectionId: 'jewellery',
    category: 'Earrings',
    images: [
      { id: 'i31', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80', alt: 'Polki Drop Earrings - Front', isPrimary: true },
      { id: 'i32', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', alt: 'Polki Drop Earrings - Side' },
      { id: 'i33', url: 'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=800&q=80', alt: 'Polki Drop Earrings - Worn' },
    ],
    price: '₹3,200',
    priceType: 'starting',
    availability: 'available',
    customizable: false,
    featured: false,
    tags: ['earrings', 'polki', 'drop', 'elegant'],
    material: 'Gold-plated brass, polki-style stones',
    craft: 'Stone setting, hand finishing',
    occasion: 'Festive, Reception, Party',
    care: 'Store in soft pouch. Avoid moisture.',
  },
  {
    id: 'd12',
    name: 'Hand-Embroidered Bridal Dupatta Border',
    slug: 'embroidered-bridal-dupatta-border',
    description: 'Exquisite hand-embroidered border panel for bridal dupattas with zari and sequin work.',
    longDescription: 'This embroidered border panel can be attached to any dupatta or used as a design reference for custom work. Features traditional bridal motifs — kalga, bel, and jaal patterns — executed in real zari thread with sequin and bead accents.',
    collectionId: 'embroidery',
    category: 'Bridal',
    images: [
      { id: 'i34', url: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80', alt: 'Bridal Dupatta Border - Full', isPrimary: true },
      { id: 'i35', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', alt: 'Bridal Dupatta Border - Detail' },
      { id: 'i36', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', alt: 'Bridal Dupatta Border - Texture' },
    ],
    price: '₹6,000',
    priceType: 'starting',
    availability: 'made-to-order',
    customizable: true,
    featured: false,
    tags: ['embroidery', 'bridal', 'zari', 'dupatta'],
    material: 'Zari thread, sequins, beads on net/organza',
    craft: 'Hand embroidery, zari work, sequin appliqué',
    occasion: 'Bridal, Wedding',
    care: 'Dry clean only. Store flat, never fold.',
  },
];

export const faqItems = [
  {
    question: 'How do I place a custom order?',
    answer: 'Visit our Custom Designs page or contact us directly. Share your idea, occasion, color preferences, and budget. We\'ll discuss the design with you and provide a quote.',
  },
  {
    question: 'How long does a custom design take?',
    answer: 'Custom designs typically take 2-4 weeks depending on complexity. We\'ll provide a timeline estimate when you place your order.',
  },
  {
    question: 'Can I modify an existing design?',
    answer: 'Yes! Many of our designs can be customized — different colors, sizes, or stone options. Use the "Ask About Customization" option on any design page.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently we ship within India. International shipping is available on request — please contact us for details.',
  },
  {
    question: 'What is your return/exchange policy?',
    answer: 'Custom-made pieces cannot be returned. Ready pieces can be exchanged within 7 days if unused and in original packaging. Please see our full Terms for details.',
  },
  {
    question: 'How should I care for my jewellery?',
    answer: 'Store pieces in the provided pouch or box. Avoid contact with perfume, water, and chemicals. Clean gently with a soft dry cloth. Each piece comes with specific care instructions.',
  },
  {
    question: 'Do you offer bridal consultations?',
    answer: 'Yes, we offer personal consultations for bridal jewellery and accessories. Contact us to schedule a session.',
  },
  {
    question: 'Are your pieces handmade?',
    answer: 'Yes, every piece from Mimiko Studio is handcrafted by our artisans. We take pride in the time and skill that goes into each creation.',
  },
];
