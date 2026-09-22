export type UserRole = 'RETAILER' | 'SUPPLIER' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  phone: string;
  companyName: string;
  taxId?: string;
  address?: string;
  city?: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  joinedDate: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  itemCount: number;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  supplierId: number;
  supplierName: string;
  supplierVerified: boolean;
  description: string;
  specifications: Record<string, string>;
  wholesalePrice: number; // Price per unit in wholesale
  retailMSRP: number; // Recommended retail price
  minOrderQuantity: number; // MOQ
  availableStock: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  status: 'ACTIVE' | 'OUT_OF_STOCK' | 'INACTIVE';
  sku: string;
  unit: string; // e.g., 'pcs', 'boxes', 'cartons'
  bulkDiscounts?: {
    minQty: number;
    discountPercent: number;
  }[];
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  imageUrl: string;
  wholesalePrice: number;
  quantity: number;
  subtotal: number;
  supplierId: number;
  supplierName: string;
}

export interface Order {
  id: string; // e.g. ORD-2026-8891
  retailerId: number;
  retailerName: string;
  companyName: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'NET_30' | 'BANK_TRANSFER' | 'CREDIT_CARD';
  paymentStatus: 'PAID' | 'PENDING_APPROVAL' | 'NET_30_TERMS';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface SupplierProfile {
  id: number;
  userId: number;
  companyName: string;
  rating: number;
  responseRate: string;
  totalProducts: number;
  verified: boolean;
  yearsInBusiness: number;
  location: string;
  category: string;
}
