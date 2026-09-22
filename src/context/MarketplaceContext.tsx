import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, Category, CartItem, Order, OrderStatus, UserRole } from '../types';
import { INITIAL_CATEGORIES, INITIAL_USERS, INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

export type AppPage = 
  | 'home'
  | 'products'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'retailer-dashboard'
  | 'supplier-dashboard'
  | 'add-product'
  | 'manage-products'
  | 'orders'
  | 'order-tracking'
  | 'admin-dashboard'
  | 'profile'
  | 'login'
  | 'register'
  | 'java-hub';

interface MarketplaceContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  users: User[];
  categories: Category[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  
  // Actions
  addToCart: (product: Product, quantity: number) => { success: boolean; message?: string };
  updateCartQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  placeOrder: (shippingAddress: any, paymentMethod: 'NET_30' | 'BANK_TRANSFER' | 'CREDIT_CARD') => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'supplierId' | 'supplierName' | 'supplierVerified'>) => Product;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  approveSupplier: (userId: number) => void;
  suspendSupplier: (userId: number) => void;
  registerUser: (userData: Partial<User>) => User;
  loginUser: (email: string) => boolean;
  login: (email: string, role?: UserRole) => void;
  register: (userData: Partial<User>) => User;
  switchUserRole: (role: UserRole) => void;
  addCategory: (cat: Omit<Category, 'id' | 'itemCount'>) => void;
  navigateToProduct: (productId: number) => void;
  navigateToOrderTracking: (orderId: string) => void;
  resetDatabase: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('wh_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('wh_current_user');
    if (saved) return JSON.parse(saved);
    // Default to Retailer David Patel
    return INITIAL_USERS.find(u => u.role === 'RETAILER') || INITIAL_USERS[0];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wh_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const addCategory = (cat: Omit<Category, 'id' | 'itemCount'>) => {
    const newCat: Category = {
      ...cat,
      id: categories.length + 1,
      itemCount: 0
    };
    setCategories(prev => [...prev, newCat]);
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('wh_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('wh_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [activePage, setActivePage] = useState<AppPage>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(101);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('ORD-2026-9810');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('wh_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('wh_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('wh_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wh_orders', JSON.stringify(orders));
  }, [orders]);

  const switchRole = (role: UserRole) => {
    const target = users.find(u => u.role === role && u.status === 'ACTIVE');
    if (target) {
      setCurrentUser(target);
    }
  };

  const navigateToProduct = (productId: number) => {
    setSelectedProductId(productId);
    setActivePage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOrderTracking = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActivePage('order-tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity: number) => {
    if (quantity < product.minOrderQuantity) {
      return {
        success: false,
        message: `Minimum Order Quantity for this product is ${product.minOrderQuantity} ${product.unit}. You requested ${quantity}.`
      };
    }

    if (quantity > product.availableStock) {
      return {
        success: false,
        message: `Requested quantity exceeds available stock (${product.availableStock} ${product.unit}).`
      };
    }

    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        return prev.map(item =>
          item.productId === product.id
            ? {
                ...item,
                quantity: newQty,
                subtotal: newQty * product.wholesalePrice
              }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: Date.now(),
          productId: product.id,
          product,
          quantity,
          unitPrice: product.wholesalePrice,
          subtotal: quantity * product.wholesalePrice
        };
        return [...prev, newItem];
      }
    });

    return { success: true };
  };

  const updateCartQuantity = (itemId: number, quantity: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const validQty = Math.max(item.product.minOrderQuantity, quantity);
          return {
            ...item,
            quantity: validQty,
            subtotal: validQty * item.product.wholesalePrice
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (
    shippingAddress: any,
    paymentMethod: 'NET_30' | 'BANK_TRANSFER' | 'CREDIT_CARD'
  ): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const taxAmount = +(subtotal * 0.08).toFixed(2);
    const shippingFee = subtotal > 1500 ? 0 : 75.00;
    const totalAmount = +(subtotal + taxAmount + shippingFee).toFixed(2);

    const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const newOrder: Order = {
      id: orderNumber,
      retailerId: currentUser.id,
      retailerName: currentUser.name,
      companyName: currentUser.companyName || 'Retail Partner',
      orderDate: nowStr,
      status: 'PENDING',
      subtotal,
      taxAmount,
      shippingFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'NET_30' ? 'NET_30_TERMS' : 'PAID',
      shippingAddress: {
        street: shippingAddress.street || '450 Industrial Ave',
        city: shippingAddress.city || 'Commerce City',
        state: shippingAddress.state || 'CA',
        zipCode: shippingAddress.zipCode || '90040',
        country: 'United States'
      },
      trackingNumber: `WH-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'FreightHub Expedited Logistics',
      estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      items: cart.map((item, idx) => ({
        id: idx + 1,
        productId: item.productId,
        productName: item.product.name,
        imageUrl: item.product.imageUrl,
        wholesalePrice: item.product.wholesalePrice,
        quantity: item.quantity,
        subtotal: item.subtotal,
        supplierId: item.product.supplierId,
        supplierName: item.product.supplierName
      })),
      statusHistory: [
        {
          status: 'PENDING',
          timestamp: nowStr,
          note: `Wholesale order submitted with payment terms: ${paymentMethod}. Awaiting dispatch authorization.`
        }
      ]
    };

    // Deduct stock from products
    setProducts(prev =>
      prev.map(prod => {
        const cartMatch = cart.find(c => c.productId === prod.id);
        if (cartMatch) {
          const newStock = Math.max(0, prod.availableStock - cartMatch.quantity);
          return {
            ...prod,
            availableStock: newStock,
            status: newStock === 0 ? 'OUT_OF_STOCK' : prod.status
          };
        }
        return prod;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setSelectedOrderId(newOrder.id);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const nowStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const defaultNotes: Record<OrderStatus, string> = {
            PENDING: 'Order registered and queued for wholesale credit review.',
            CONFIRMED: 'Order confirmed and authorized for pallet staging.',
            PROCESSING: 'Warehouse picking and palletization in progress.',
            DISPATCHED: 'Loaded into line-haul trailer at supplier distribution center.',
            IN_TRANSIT: 'Shipment actively moving across interstate freight network.',
            DELIVERED: 'Shipment signed for at dock delivery station.',
            CANCELLED: 'Order cancelled and allocated inventory restored.'
          };

          return {
            ...ord,
            status,
            statusHistory: [
              ...ord.statusHistory,
              {
                status,
                timestamp: nowStr,
                note: note || defaultNotes[status] || `Status updated to ${status}`
              }
            ]
          };
        }
        return ord;
      })
    );
  };

  const addProduct = (
    productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'supplierId' | 'supplierName' | 'supplierVerified'>
  ): Product => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      rating: 5.0,
      reviewCount: 0,
      supplierId: currentUser.id,
      supplierName: currentUser.companyName || currentUser.name,
      supplierVerified: true
    };

    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const approveSupplier = (userId: number) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: 'ACTIVE' } : u))
    );
  };

  const suspendSupplier = (userId: number) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, status: 'SUSPENDED' } : u))
    );
  };

  const registerUser = (userData: Partial<User>): User => {
    const newUser: User = {
      id: Date.now(),
      email: userData.email || '',
      name: userData.name || '',
      role: userData.role || 'RETAILER',
      phone: userData.phone || '',
      companyName: userData.companyName || '',
      taxId: userData.taxId || '',
      address: userData.address || '',
      city: userData.city || '',
      status: userData.role === 'SUPPLIER' ? 'PENDING' : 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const loginUser = (email: string): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const login = (email: string, role?: UserRole) => {
    let found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (role && found.role !== role) {
        found = { ...found, role };
      }
      setCurrentUser(found);
    } else {
      const demoUser: User = {
        id: users.length + 1,
        name: email.split('@')[0],
        email: email,
        role: role || 'RETAILER',
        companyName: `${email.split('@')[0]} Enterprises`,
        phone: '+1 (555) 300-8800',
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'ACTIVE'
      };
      setCurrentUser(demoUser);
    }
  };

  const register = (userData: Partial<User>) => {
    return registerUser(userData);
  };

  const switchUserRole = (role: UserRole) => {
    switchRole(role);
  };

  const resetDatabase = () => {
    localStorage.removeItem('wh_users');
    localStorage.removeItem('wh_current_user');
    localStorage.removeItem('wh_products');
    localStorage.removeItem('wh_cart');
    localStorage.removeItem('wh_orders');
    setUsers(INITIAL_USERS);
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setOrders(INITIAL_ORDERS);
    setCurrentUser(INITIAL_USERS.find(u => u.role === 'RETAILER') || INITIAL_USERS[0]);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        users,
        categories,
        products,
        cart,
        orders,
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        selectedOrderId,
        setSelectedOrderId,
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        approveSupplier,
        suspendSupplier,
        registerUser,
        loginUser,
        login,
        register,
        switchUserRole,
        addCategory,
        navigateToProduct,
        navigateToOrderTracking,
        resetDatabase
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
