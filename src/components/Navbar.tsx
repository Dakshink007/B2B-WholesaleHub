import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { 
  Building2, 
  Search, 
  ShoppingCart, 
  User, 
  ShieldCheck, 
  Package, 
  Truck, 
  LayoutDashboard,
  Boxes,
  Layers,
  ChevronDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    cart, 
    activePage, 
    setActivePage, 
    searchQuery, 
    setSearchQuery,
    categories,
    selectedCategoryId,
    setSelectedCategoryId
  } = useMarketplace();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('products');
  };

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2.5 text-left cursor-pointer group focus:outline-hidden"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-600 transition-colors">
                <Building2 className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                    Wholesale<span className="text-blue-600">Hub</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-bold tracking-wider uppercase border border-blue-200">
                    B2B
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 tracking-wide mt-0.5">
                  Direct Factory Procurement
                </span>
              </div>
            </button>
          </div>

          {/* Integrated Search & Category Selector */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 rounded-lg transition-all overflow-hidden text-xs">
              {/* Category dropdown toggle */}
              <div className="relative border-r border-slate-200">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="h-9 px-3 flex items-center gap-1.5 font-medium text-slate-700 hover:text-slate-900 bg-transparent cursor-pointer whitespace-nowrap"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span className="max-w-[110px] truncate">
                    {selectedCategory ? selectedCategory.name : 'All Categories'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategoryId(null);
                        setCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors font-medium ${
                        selectedCategoryId === null ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategoryId(c.id);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors font-medium ${
                          selectedCategoryId === c.id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-700'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex-1 relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search wholesale products, SKUs, bulk lots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-hidden text-xs"
                />
              </div>

              <button
                type="submit"
                className="h-9 px-4 bg-slate-900 hover:bg-blue-600 text-white font-semibold transition-colors cursor-pointer text-xs shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Navigation Links & User Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActivePage('products')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePage === 'products'
                  ? 'text-blue-600 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Wholesale Catalog
            </button>

            {/* Dynamic Role Dashboard Link */}
            {currentUser.role === 'RETAILER' && (
              <button
                onClick={() => setActivePage('retailer-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'retailer-dashboard'
                    ? 'text-blue-600 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buyer Dashboard</span>
              </button>
            )}

            {currentUser.role === 'SUPPLIER' && (
              <button
                onClick={() => setActivePage('supplier-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'supplier-dashboard'
                    ? 'text-blue-600 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Supplier Portal</span>
              </button>
            )}

            {currentUser.role === 'ADMIN' && (
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activePage === 'admin-dashboard'
                    ? 'text-blue-600 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Center</span>
              </button>
            )}

            <button
              onClick={() => setActivePage('orders')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePage === 'orders' || activePage === 'order-tracking'
                  ? 'text-blue-600 bg-blue-50/80 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Orders</span>
            </button>

            {/* Wholesale Cart */}
            <button
              onClick={() => setActivePage('cart')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                activePage === 'cart'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] leading-none">
                  {cart.length}
                </span>
              ) : (
                <span className="text-slate-400 text-[10px] font-mono">0</span>
              )}
            </button>

            {/* Account Profile Pill */}
            <button
              onClick={() => setActivePage('profile')}
              className={`flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer ${
                activePage === 'profile' ? 'bg-slate-100 ring-2 ring-blue-600/20' : ''
              }`}
              title="Commercial Account Profile"
            >
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left hidden lg:block leading-tight">
                <div className="text-[11px] font-bold text-slate-900 truncate max-w-[120px]">
                  {currentUser.companyName || currentUser.name}
                </div>
                <div className="text-[9px] font-medium text-slate-500 uppercase tracking-wider">
                  {currentUser.role}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-bar: Category Pills in smooth horizontal slider */}
      <div className="border-t border-slate-100 bg-slate-50/70 px-4 sm:px-6 lg:px-8 py-1.5 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
          Direct Wholesale:
        </span>
        <button
          onClick={() => { setSelectedCategoryId(null); setActivePage('products'); }}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap font-semibold transition-colors cursor-pointer ${
            selectedCategoryId === null && activePage === 'products'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setSelectedCategoryId(cat.id); setActivePage('products'); }}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors cursor-pointer ${
              selectedCategoryId === cat.id && activePage === 'products'
                ? 'bg-slate-900 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </header>
  );
};
