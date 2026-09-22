import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  BadgePercent, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  Star, 
  Search,
  Users,
  ChevronRight,
  Layers,
  FileCheck,
  Calculator,
  Code2,
  Boxes,
  Lock
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    categories, 
    products, 
    setActivePage, 
    setSelectedCategoryId, 
    navigateToProduct,
    addToCart,
    setSearchQuery
  } = useMarketplace();

  // Interactive Live Lot Pricing Calculator state for hero section
  const [calcQty, setCalcQty] = useState<number>(50);
  const drillProduct = products.find(p => p.id === 101) || products[0];

  // Calculate live volume price based on quantity
  const getCalcPrice = (qty: number) => {
    if (qty >= 100) return 36.00;
    if (qty >= 50) return 39.00;
    return drillProduct.wholesalePrice; // 42.50
  };

  const currentUnitWholesale = getCalcPrice(calcQty);
  const totalWholesale = currentUnitWholesale * calcQty;
  const totalRetailValue = drillProduct.retailMSRP * calcQty;
  const totalRetailerProfit = totalRetailValue - totalWholesale;
  const profitMarginPercent = Math.round((totalRetailerProfit / totalRetailValue) * 100);

  const featuredProducts = products.slice(0, 6);

  const topSuppliers = [
    {
      id: 2,
      name: 'Nexus Tech Wholesalers Inc.',
      category: 'Electronics & Industrial Hardware',
      location: 'Austin, TX (USA)',
      rating: 4.9,
      productsCount: 42,
      verified: true,
      moqPolicy: 'Flexible MOQ tiers from 10 pcs',
      badge: 'Tier-1 Manufacturer',
      turnaround: '24-48h Dispatch'
    },
    {
      id: 3,
      name: 'Apollo Global Garments Ltd.',
      category: 'Commercial Apparel & Textiles',
      location: 'Atlanta, GA (USA)',
      rating: 4.8,
      productsCount: 78,
      verified: true,
      moqPolicy: 'Carton & Pallet lots',
      badge: 'Certified Exporter',
      turnaround: '48h Freight SLA'
    },
    {
      id: 5,
      name: 'BioExtract Naturals Wholesalers',
      category: 'Grocery, Botanicals & FMCG',
      location: 'Orlando, FL (USA)',
      rating: 4.9,
      productsCount: 35,
      verified: true,
      moqPolicy: 'Volume Contract Pricing',
      badge: 'USDA Partner',
      turnaround: 'Same-day Dispatch'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800 overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Certified Factory-Direct Wholesale Network</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Direct-to-Factory Procurement. <br />
                <span className="text-blue-400 font-black">
                  Zero Middlemen. Bulk Economics.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                Connect directly with certified manufacturers and bulk distributors. 
                Lock in transparent Minimum Order Quantities (MOQ), tiered wholesale pricing, 
                automated LTL freight, and flexible Net-30 commercial credit terms.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActivePage('products')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Wholesale Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('register')}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm rounded-lg border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Register Enterprise Account</span>
                </button>
              </div>

              {/* Verified Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">$48.2M+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Commercial GMV</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">4,820+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Verified Wholesalers</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">Net-30</div>
                  <div className="text-[11px] text-slate-400 font-medium">Underwritten Credit</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Live Wholesale Lot Calculator */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative">
                {/* Console header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-slate-200">Wholesale Lot Economics Calculator</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold border border-blue-500/30">
                    LIVE SIMULATOR
                  </span>
                </div>

                {/* Selected Lot Product Details */}
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block">SKU: IND-DRL-001</span>
                        <h4 className="font-bold text-white text-sm mt-0.5">{drillProduct.name}</h4>
                        <span className="text-slate-400 text-[11px]">Factory Supplier: {drillProduct.supplierName}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-[10px] font-semibold">
                        MOQ: 20 pcs
                      </span>
                    </div>

                    {/* Quantity slider */}
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-slate-300 font-semibold text-[11px]">
                          Select Wholesale Lot Quantity:
                        </label>
                        <span className="font-mono font-bold text-white text-sm bg-slate-800 px-2.5 py-0.5 rounded">
                          {calcQty} pcs
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="200"
                        step="10"
                        value={calcQty}
                        onChange={(e) => setCalcQty(Number(e.target.value))}
                        className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Min (20)</span>
                        <span>Tier 2 (50+)</span>
                        <span>Tier 3 (100+)</span>
                        <span>Bulk Pallet (200)</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculations Display Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Unit Wholesale Price</span>
                      <div className="font-mono text-base font-bold text-white mt-0.5">
                        ${currentUnitWholesale.toFixed(2)}
                        <span className="text-[10px] text-slate-500 font-normal"> / pc</span>
                      </div>
                      <span className="text-[10px] text-slate-400 line-through">MSRP ${drillProduct.retailMSRP.toFixed(2)}</span>
                    </div>

                    <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Total Order Wholesale</span>
                      <div className="font-mono text-base font-black text-blue-400 mt-0.5">
                        ${totalWholesale.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <span className="text-[10px] text-slate-400">Net-30 Eligible</span>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-800/40 p-2.5 rounded-lg">
                      <span className="text-emerald-400 text-[10px] font-semibold block">Retailer Resale Profit</span>
                      <div className="font-mono text-base font-bold text-emerald-300 mt-0.5">
                        +${totalRetailerProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <span className="text-[10px] text-emerald-400/80">{profitMarginPercent}% Margin</span>
                    </div>

                    <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Freight Specification</span>
                      <div className="font-semibold text-slate-200 mt-0.5">
                        {calcQty >= 100 ? '1 Full Pallet (LTL)' : 'Master Cartons'}
                      </div>
                      <span className="text-[10px] text-slate-400">Insured Liftgate Delivery</span>
                    </div>
                  </div>

                  {/* Add to order action */}
                  <div className="pt-1 flex gap-2">
                    <button
                      onClick={() => {
                        addToCart(drillProduct, calcQty);
                        setActivePage('cart');
                      }}
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>Lock & Add Lot to Cart</span>
                    </button>
                    <button
                      onClick={() => navigateToProduct(drillProduct.id)}
                      className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
                      title="Inspect Specifications"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Wholesale Category Bento Showcase */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Verified Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Procure by Industry Category
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Browse factory suppliers and verified master distributors across commercial sectors.
            </p>
          </div>
          <button
            onClick={() => setActivePage('products')}
            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategoryId(category.id);
                setActivePage('products');
              }}
              className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-blue-500 hover:shadow-sm transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-bold mb-3 transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] text-slate-500 mt-0.5 block font-mono">
                  {category.itemCount} SKUs Active
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Wholesale Lots & Bulk Products */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <Boxes className="w-3.5 h-3.5" />
                <span>Ready for Pallet Dispatch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Wholesale Bulk Lots
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Verified commercial inventory available for immediate container & pallet shipment.
              </p>
            </div>

            <button
              onClick={() => setActivePage('products')}
              className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore Complete Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const profitMargin = Math.round(((product.retailMSRP - product.wholesalePrice) / product.retailMSRP) * 100);

              return (
                <div 
                  key={product.id}
                  className="rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col overflow-hidden bg-white group"
                >
                  {/* Thumbnail & Badges */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-white font-mono text-[10px] font-bold">
                        MOQ: {product.minOrderQuantity} {product.unit}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                        {profitMargin}% Retail Margin
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-md bg-white/95 text-slate-800 text-[10px] font-mono font-semibold border border-slate-200 shadow-2xs">
                        SKU: {product.sku}
                      </span>
                    </div>
                  </div>

                  {/* Body content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Supplier & Category */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                        <span className="font-semibold text-slate-600">{product.categoryName}</span>
                        <div className="flex items-center gap-1">
                          <span className="truncate max-w-[130px] font-medium text-slate-700">{product.supplierName}</span>
                          {product.supplierVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          )}
                        </div>
                      </div>

                      <h3 
                        onClick={() => navigateToProduct(product.id)}
                        className="font-bold text-slate-900 text-base line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing Block */}
                    <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                      <div>
                        <div className="text-xl font-black text-slate-900 font-mono">
                          ${product.wholesalePrice.toFixed(2)}
                          <span className="text-xs text-slate-500 font-normal"> / {product.unit}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          MSRP: <span className="line-through">${product.retailMSRP.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-emerald-700 font-bold block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {product.availableStock} in stock
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          Min Lot: ${(product.wholesalePrice * product.minOrderQuantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => navigateToProduct(product.id)}
                        className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors text-center cursor-pointer"
                      >
                        View Tiered Pricing
                      </button>
                      <button
                        onClick={() => addToCart(product, product.minOrderQuantity)}
                        className="px-3 py-2 rounded-lg border border-slate-300 hover:border-blue-600 hover:text-blue-600 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        title="Add minimum order lot to cart"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>+ MOQ</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verified Manufacturer & Supplier Directory */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Wholesalers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Verified Factory Suppliers
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Source with confidence from vetted commercial manufacturers backed by escrow protection.
            </p>
          </div>

          <button
            onClick={() => setActivePage('products')}
            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Suppliers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topSuppliers.map((sup) => (
            <div 
              key={sup.id}
              className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                    {sup.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    {sup.name}
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  </h3>
                  <span className="text-xs text-slate-500 block mt-0.5">{sup.category}</span>
                  <span className="text-[11px] text-slate-400 block">{sup.location}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">MOQ Policy:</span>
                    <span className="font-semibold text-slate-800">{sup.moqPolicy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dispatch Speed:</span>
                    <span className="font-semibold text-emerald-700">{sup.turnaround}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900">{sup.rating}</span>
                  <span className="text-slate-400">({sup.productsCount} catalog lines)</span>
                </div>
                <button
                  onClick={() => setActivePage('products')}
                  className="font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  View Catalog &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B2B Procurement Protocol Architecture / 4-Step Process */}
      <section className="py-14 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              The Enterprise Wholesale Protocol
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              End-to-end commercial trade verification, volume pricing protection, and logistics escrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs font-mono">
                01
              </div>
              <h4 className="font-bold text-white text-sm">Commercial Onboarding</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Business EIN/GSTIN vetting enables immediate underwriting for Net-30 credit terms.
              </p>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs font-mono">
                02
              </div>
              <h4 className="font-bold text-white text-sm">Direct Factory Catalogs</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Browse factory inventory with transparent Minimum Order Quantities and batch specs.
              </p>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs font-mono">
                03
              </div>
              <h4 className="font-bold text-white text-sm">Volume Price Locking</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Automatic tiered bulk discounting activates as purchase order volume increments.
              </p>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs font-mono">
                04
              </div>
              <h4 className="font-bold text-white text-sm">Pallet Freight & Escrow</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Shipments are tracked via bill-of-lading. Escrow payment is released upon delivery sign-off.
              </p>
            </div>
          </div>

          {/* Technical College Viva Callout Bar */}
          <div className="mt-12 p-5 rounded-xl bg-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">
                  College Project: Java Spring Boot & MySQL Architecture
                </h4>
                <p className="text-slate-400 text-[11px]">
                  Demonstrates 4 OOP pillars (Encapsulation, Inheritance, Polymorphism, Abstraction), Spring Data JPA, and REST APIs.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('java-hub')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Inspect Backend Code & Viva Prep
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
