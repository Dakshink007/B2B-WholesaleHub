import { Category, Product, User, Order } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Bulk consumer gadgets, OEM accessories, power banks & components',
    iconName: 'Cpu',
    itemCount: 42
  },
  {
    id: 2,
    name: 'Clothing',
    slug: 'clothing',
    description: 'Wholesale apparel, uniforms, activewear & denim in pallet lots',
    iconName: 'Shirt',
    itemCount: 78
  },
  {
    id: 3,
    name: 'Grocery',
    slug: 'grocery',
    description: 'FMCG packaged goods, organic grains, spices & shelf-stable food',
    iconName: 'ShoppingBag',
    itemCount: 110
  },
  {
    id: 4,
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Stainless steel cookware, storage organizers & home textiles',
    iconName: 'Home',
    itemCount: 54
  },
  {
    id: 5,
    name: 'Stationery',
    slug: 'stationery',
    description: 'School supplies, premium paper reams, pens & corporate desk kits',
    iconName: 'BookOpen',
    itemCount: 36
  },
  {
    id: 6,
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Bulk skincare, hygiene essentials, hair care & salon supplies',
    iconName: 'Sparkles',
    itemCount: 65
  },
  {
    id: 7,
    name: 'Industrial Supplies',
    slug: 'industrial-supplies',
    description: 'PPE safety gear, heavy-duty fasteners, tools & packaging tapes',
    iconName: 'Wrench',
    itemCount: 89
  },
  {
    id: 8,
    name: 'Office Supplies',
    slug: 'office-supplies',
    description: 'Ergonomic chairs, printer toner, filing systems & presentation boards',
    iconName: 'Briefcase',
    itemCount: 47
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    email: 'admin@wholesalehub.com',
    name: 'Sarah Jenkins',
    role: 'ADMIN',
    phone: '+1 (555) 019-2834',
    companyName: 'WholesaleHub Global Operations',
    status: 'ACTIVE',
    joinedDate: '2024-01-10'
  },
  {
    id: 2,
    email: 'supplier@nexuselec.com',
    name: 'Robert Chen',
    role: 'SUPPLIER',
    phone: '+1 (555) 438-9921',
    companyName: 'Nexus Tech Wholesalers Inc.',
    taxId: 'US-TX9932014',
    address: '4400 Innovation Way, Suite 200',
    city: 'Austin, TX',
    status: 'ACTIVE',
    joinedDate: '2024-02-15'
  },
  {
    id: 3,
    email: 'supplier@apollotextiles.com',
    name: 'Elena Rostova',
    role: 'SUPPLIER',
    phone: '+1 (555) 302-8841',
    companyName: 'Apollo Global Garments Ltd.',
    taxId: 'US-GA7712984',
    address: '120 Industrial Boulevard',
    city: 'Atlanta, GA',
    status: 'ACTIVE',
    joinedDate: '2024-03-01'
  },
  {
    id: 4,
    email: 'retailer@metrostore.com',
    name: 'David Patel',
    role: 'RETAILER',
    phone: '+1 (555) 782-9014',
    companyName: 'Metro Retail Mart LLC',
    taxId: 'US-CA4590218',
    address: '850 Market Street, Bay 4',
    city: 'San Francisco, CA',
    status: 'ACTIVE',
    joinedDate: '2024-04-12'
  },
  {
    id: 5,
    email: 'supplier.pending@bioextract.com',
    name: 'Marcus Vance',
    role: 'SUPPLIER',
    phone: '+1 (555) 604-1188',
    companyName: 'BioExtract Naturals Wholesalers',
    taxId: 'US-FL8823109',
    address: '710 Logistics Pkwy',
    city: 'Orlando, FL',
    status: 'PENDING',
    joinedDate: '2026-09-15'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Industrial High-Velocity Cordless Drills (Kit with 2x 20V Batteries)',
    categoryId: 7,
    categoryName: 'Industrial Supplies',
    supplierId: 2,
    supplierName: 'Nexus Tech Wholesalers Inc.',
    supplierVerified: true,
    description: 'Heavy duty brushless motor, 65Nm max torque, ergonomic anti-vibration grip. Designed for contractor and factory operations. Includes blow-molded travel case.',
    specifications: {
      'Motor Type': 'Brushless 20V',
      'Torque': '65 Nm',
      'Chuck Capacity': '13mm Keyless',
      'Warranty': '2-Year Commercial Warranty',
      'Certifications': 'CE, UL, RoHS'
    },
    wholesalePrice: 42.50,
    retailMSRP: 89.99,
    minOrderQuantity: 20,
    availableStock: 850,
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 46,
    status: 'ACTIVE',
    sku: 'IND-DRL-001',
    unit: 'sets',
    bulkDiscounts: [
      { minQty: 50, discountPercent: 5 },
      { minQty: 100, discountPercent: 12 }
    ]
  },
  {
    id: 102,
    name: 'Premium Combed Cotton Crewneck T-Shirts (Assorted Sizes Pack of 50)',
    categoryId: 2,
    categoryName: 'Clothing',
    supplierId: 3,
    supplierName: 'Apollo Global Garments Ltd.',
    supplierVerified: true,
    description: '180 GSM 100% combed ringspun cotton. Pre-shrunk fabric ideal for screen printing, retail resale, or uniform branding. Double-needle stitched neck and armholes.',
    specifications: {
      'Material': '100% Combed Ringspun Cotton',
      'Fabric Weight': '180 GSM',
      'Size Run': 'S, M, L, XL, XXL Pre-Pack',
      'Colorway': 'Solid Black / White / Navy',
      'Pre-Shrunk': 'Yes'
    },
    wholesalePrice: 4.80,
    retailMSRP: 18.00,
    minOrderQuantity: 100,
    availableStock: 12400,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 92,
    status: 'ACTIVE',
    sku: 'GAR-TSH-088',
    unit: 'pcs',
    bulkDiscounts: [
      { minQty: 250, discountPercent: 6 },
      { minQty: 500, discountPercent: 10 }
    ]
  },
  {
    id: 103,
    name: 'Commercial Grade 3-Ply Protective Face Masks (Carton of 2,000 pcs)',
    categoryId: 7,
    categoryName: 'Industrial Supplies',
    supplierId: 2,
    supplierName: 'Nexus Tech Wholesalers Inc.',
    supplierVerified: true,
    description: 'High filtration BFE > 98% non-woven fabric with meltblown electrostatic filter layer. Elastic ear loops and adjustable aluminum nose clip.',
    specifications: {
      'Filtration': 'BFE >= 98%',
      'Ply': '3-Ply Non-Woven',
      'Packaging': '50 pcs/inner box, 40 boxes/carton',
      'Standard': 'EN14683 Type II'
    },
    wholesalePrice: 38.00,
    retailMSRP: 75.00,
    minOrderQuantity: 5,
    availableStock: 320,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 38,
    status: 'ACTIVE',
    sku: 'PPE-MSK-2000',
    unit: 'cartons',
    bulkDiscounts: [
      { minQty: 10, discountPercent: 8 },
      { minQty: 25, discountPercent: 15 }
    ]
  },
  {
    id: 104,
    name: 'USB-C Fast Charging Braided Cables 60W (Bundle of 100 pcs)',
    categoryId: 1,
    categoryName: 'Electronics',
    supplierId: 2,
    supplierName: 'Nexus Tech Wholesalers Inc.',
    supplierVerified: true,
    description: 'Durable nylon braided exterior with reinforced connector strain relief. Supports USB-PD 60W charging and 480Mbps data transfer speed.',
    specifications: {
      'Length': '1.2 meters (4 ft)',
      'Power Rating': '60W (20V/3A)',
      'Material': 'Military-grade Nylon Braid',
      'Packaging': 'Retail Polybag with Barcode'
    },
    wholesalePrice: 1.45,
    retailMSRP: 8.99,
    minOrderQuantity: 100,
    availableStock: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-00913958ee82?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 64,
    status: 'ACTIVE',
    sku: 'ELC-CAB-100',
    unit: 'pcs',
    bulkDiscounts: [
      { minQty: 300, discountPercent: 7 },
      { minQty: 1000, discountPercent: 14 }
    ]
  },
  {
    id: 105,
    name: 'Organic Virgin Cold-Pressed Olive Oil 5L Cans (Pallet Lot of 40 Cans)',
    categoryId: 3,
    categoryName: 'Grocery',
    supplierId: 2,
    supplierName: 'Nexus Tech Wholesalers Inc.',
    supplierVerified: true,
    description: 'First cold press with acidity level below 0.3%. Packaged in UV-resistant food-grade tin containers for long pantry shelf life. Certified Organic.',
    specifications: {
      'Volume': '5 Liters per Can',
      'Origin': 'Mediterranean Basin',
      'Acidity': '< 0.3%',
      'Certifications': 'USDA Organic, Non-GMO Project Verified',
      'Shelf Life': '24 Months'
    },
    wholesalePrice: 32.00,
    retailMSRP: 58.00,
    minOrderQuantity: 10,
    availableStock: 180,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 29,
    status: 'ACTIVE',
    sku: 'FMCG-OIL-005',
    unit: 'cans',
    bulkDiscounts: [
      { minQty: 20, discountPercent: 5 },
      { minQty: 50, discountPercent: 12 }
    ]
  },
  {
    id: 106,
    name: 'Stainless Steel Commercial Insulated Tumblers 500ml (Lot of 50)',
    categoryId: 4,
    categoryName: 'Home & Kitchen',
    supplierId: 3,
    supplierName: 'Apollo Global Garments Ltd.',
    supplierVerified: true,
    description: 'Double-wall 18/8 kitchen grade vacuum insulated body. Keeps liquids hot for 12 hours or ice cold for 24 hours. Blank canvas ready for laser etching or corporate gifts.',
    specifications: {
      'Capacity': '500 ml (17 oz)',
      'Steel Grade': 'SUS304 Food-Grade Stainless',
      'Lid': 'BPA-free Tritan slider lid',
      'Finish': 'Matte powder coated'
    },
    wholesalePrice: 5.50,
    retailMSRP: 22.00,
    minOrderQuantity: 50,
    availableStock: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 52,
    status: 'ACTIVE',
    sku: 'KIT-TMB-500',
    unit: 'pcs',
    bulkDiscounts: [
      { minQty: 150, discountPercent: 6 },
      { minQty: 300, discountPercent: 12 }
    ]
  },
  {
    id: 107,
    name: 'Hardcover Executive Ruled Notebooks 80 GSM (Carton of 80 Books)',
    categoryId: 5,
    categoryName: 'Stationery',
    supplierId: 3,
    supplierName: 'Apollo Global Garments Ltd.',
    supplierVerified: true,
    description: 'Faux-leather PU cover with ribbon bookmark, elastic closure band, and expandable inner document pocket. Acid-free ivory paper prevents ink bleedthrough.',
    specifications: {
      'Page Count': '192 ruled pages (96 sheets)',
      'Paper Weight': '80 GSM Bleed-Resistant',
      'Binding': 'Thread-sewn lay flat',
      'Cover Material': 'Premium PU Leather'
    },
    wholesalePrice: 2.20,
    retailMSRP: 8.50,
    minOrderQuantity: 80,
    availableStock: 3600,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 31,
    status: 'ACTIVE',
    sku: 'STA-NBK-80',
    unit: 'pcs',
    bulkDiscounts: [
      { minQty: 160, discountPercent: 8 },
      { minQty: 400, discountPercent: 15 }
    ]
  },
  {
    id: 108,
    name: 'Hydrating Botanical Hyaluronic Acid Serum 30ml (Display Pack of 36)',
    categoryId: 6,
    categoryName: 'Beauty & Personal Care',
    supplierId: 2,
    supplierName: 'Nexus Tech Wholesalers Inc.',
    supplierVerified: true,
    description: 'Multi-molecular weight hyaluronic acid serum infused with Vitamin B5 and green tea extract. Dermatologically tested, vegan, paraben-free with tamper-evident dropper bottles.',
    specifications: {
      'Volume': '30 ml per bottle',
      'Key Actives': '2% Pure Hyaluronic Acid, 1% D-Panthenol',
      'Packaging': 'Amber glass bottle with gold dropper in retail carton',
      'Testing': 'Cruelty-Free, Dermatologically Certified'
    },
    wholesalePrice: 3.90,
    retailMSRP: 18.99,
    minOrderQuantity: 36,
    availableStock: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 88,
    status: 'ACTIVE',
    sku: 'BTY-SRM-36',
    unit: 'bottles',
    bulkDiscounts: [
      { minQty: 108, discountPercent: 10 },
      { minQty: 288, discountPercent: 18 }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-9810',
    retailerId: 4,
    retailerName: 'David Patel',
    companyName: 'Metro Retail Mart LLC',
    orderDate: '2026-09-17 10:30 AM',
    status: 'IN_TRANSIT',
    subtotal: 1850.00,
    taxAmount: 148.00,
    shippingFee: 65.00,
    totalAmount: 2063.00,
    paymentMethod: 'NET_30',
    paymentStatus: 'NET_30_TERMS',
    shippingAddress: {
      street: '850 Market Street, Bay 4',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'United States'
    },
    trackingNumber: 'FDX-9920148293-US',
    carrier: 'FedEx Freight Logistics',
    estimatedDelivery: '2026-09-22',
    items: [
      {
        id: 1,
        productId: 101,
        productName: 'Industrial High-Velocity Cordless Drills',
        imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        wholesalePrice: 42.50,
        quantity: 20,
        subtotal: 850.00,
        supplierId: 2,
        supplierName: 'Nexus Tech Wholesalers Inc.'
      },
      {
        id: 2,
        productId: 102,
        productName: 'Premium Combed Cotton Crewneck T-Shirts',
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        wholesalePrice: 4.80,
        quantity: 150,
        subtotal: 720.00,
        supplierId: 3,
        supplierName: 'Apollo Global Garments Ltd.'
      },
      {
        id: 3,
        productId: 107,
        productName: 'Hardcover Executive Ruled Notebooks 80 GSM',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        wholesalePrice: 2.20,
        quantity: 80,
        subtotal: 176.00,
        supplierId: 3,
        supplierName: 'Apollo Global Garments Ltd.'
      },
      {
        id: 4,
        productId: 104,
        productName: 'USB-C Fast Charging Braided Cables 60W',
        imageUrl: 'https://images.unsplash.com/photo-1608248597359-00913958ee82?auto=format&fit=crop&w=800&q=80',
        wholesalePrice: 1.45,
        quantity: 100,
        subtotal: 145.00,
        supplierId: 2,
        supplierName: 'Nexus Tech Wholesalers Inc.'
      }
    ],
    statusHistory: [
      {
        status: 'PENDING',
        timestamp: '2026-09-17 10:30 AM',
        note: 'Order placed by retailer with Net-30 enterprise terms.'
      },
      {
        status: 'CONFIRMED',
        timestamp: '2026-09-17 11:45 AM',
        note: 'Approved by Nexus Tech & Apollo Garments wholesale dispatch.'
      },
      {
        status: 'PROCESSING',
        timestamp: '2026-09-17 03:20 PM',
        note: 'Pallet assembly and shrink-wrap packaging completed.'
      },
      {
        status: 'DISPATCHED',
        timestamp: '2026-09-18 09:10 AM',
        note: 'Handed over to carrier FedEx Freight at Dallas hub.'
      },
      {
        status: 'IN_TRANSIT',
        timestamp: '2026-09-19 06:15 AM',
        note: 'En route via Interstate 40 West. Next hub: Sacramento Terminal.'
      }
    ]
  },
  {
    id: 'ORD-2026-9805',
    retailerId: 4,
    retailerName: 'David Patel',
    companyName: 'Metro Retail Mart LLC',
    orderDate: '2026-09-02 02:15 PM',
    status: 'DELIVERED',
    subtotal: 2280.00,
    taxAmount: 182.40,
    shippingFee: 0.00, // free freight
    totalAmount: 2462.40,
    paymentMethod: 'BANK_TRANSFER',
    paymentStatus: 'PAID',
    shippingAddress: {
      street: '850 Market Street, Bay 4',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'United States'
    },
    trackingNumber: 'UPS-FREIGHT-8821903',
    carrier: 'UPS Supply Chain Solutions',
    estimatedDelivery: '2026-09-08',
    items: [
      {
        id: 5,
        productId: 103,
        productName: 'Commercial Grade 3-Ply Protective Face Masks',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
        wholesalePrice: 38.00,
        quantity: 60,
        subtotal: 2280.00,
        supplierId: 2,
        supplierName: 'Nexus Tech Wholesalers Inc.'
      }
    ],
    statusHistory: [
      {
        status: 'PENDING',
        timestamp: '2026-09-02 02:15 PM',
        note: 'Bulk order submitted.'
      },
      {
        status: 'CONFIRMED',
        timestamp: '2026-09-02 03:00 PM',
        note: 'Wire transfer payment verified.'
      },
      {
        status: 'DELIVERED',
        timestamp: '2026-09-08 11:30 AM',
        note: 'Signed by receiving warehouse manager D. Patel.'
      }
    ]
  }
];
