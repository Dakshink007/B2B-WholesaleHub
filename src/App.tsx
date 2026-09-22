import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { RoleSwitcherBanner } from './components/RoleSwitcherBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { JavaBackendModal } from './components/JavaBackendModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { ProductListingPage } from './components/pages/ProductListingPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { RetailerDashboard } from './components/pages/RetailerDashboard';
import { SupplierDashboard } from './components/pages/SupplierDashboard';
import { AddProductPage } from './components/pages/AddProductPage';
import { ManageProductsPage } from './components/pages/ManageProductsPage';
import { OrdersPage } from './components/pages/OrdersPage';
import { OrderTrackingPage } from './components/pages/OrderTrackingPage';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { ProfilePage } from './components/pages/ProfilePage';

const AppContent: React.FC = () => {
  const { activePage } = useMarketplace();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'products':
        return <ProductListingPage />;
      case 'product-details':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'confirmation':
        return <OrderConfirmationPage />;
      case 'retailer-dashboard':
        return <RetailerDashboard />;
      case 'supplier-dashboard':
        return <SupplierDashboard />;
      case 'add-product':
        return <AddProductPage />;
      case 'manage-products':
        return <ManageProductsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Testing Utility Bar for College Project Demo */}
      <RoleSwitcherBanner />

      {/* Main Commercial Navigation */}
      <Navbar />

      {/* Routed Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Platform Enterprise Footer */}
      <Footer />

      {/* Floating Java & Spring Boot Code Architecture Modal */}
      <JavaBackendModal isOpen={false} onClose={() => {}} />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <AppContent />
    </MarketplaceProvider>
  );
}
