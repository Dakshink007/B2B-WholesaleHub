import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Building2, 
  ShieldCheck, 
  Star, 
  Truck, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Package, 
  TrendingUp,
  ArrowLeft,
  ChevronRight,
  Info,
  Calendar,
  Boxes,
  Lock,
  Minus,
  Plus,
  BadgePercent
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    setActivePage, 
    addToCart,
    currentUser
  } = useMarketplace();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [quantity, setQuantity] = useState<number>(product ? product.minOrderQuantity : 10);
  const [activeTab, setActiveTab] = useState<'specs' | 'logistics' | 'supplier' | 'terms'>('specs');
  const [notification, setNotification] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">Product not found</h2>
        <button 
          onClick={() => setActivePage('products')} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Calculate volume discount tier
  let applicableDiscount = 0;
  if (product.bulkDiscounts && product.bulkDiscounts.length > 0) {
    const sorted = [...product.bulkDiscounts].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (quantity >= tier.minQty) {
        applicableDiscount = tier.discountPercent;
        break;
      }
    }
  }

  const effectiveUnitPrice = product.wholesalePrice * (1 - applicableDiscount / 100);
  const totalSubtotal = effectiveUnitPrice * quantity;
  const retailTotalMSRP = product.retailMSRP * quantity;
  const totalPotentialProfit = retailTotalMSRP - totalSubtotal;
  const profitMarginPercent = Math.round(((product.retailMSRP - effectiveUnitPrice) / product.retailMSRP) * 100);
  const isMoqMet = quantity >= product.minOrderQuantity;

  const handleQuantityChange = (val: number) => {
    setQuantity(Math.max(1, val));
  };

  const handleAddToCart = () => {
    if (!isMoqMet) {
      setNotification(`MOQ Notice: Factory minimum order is ${product.minOrderQuantity} ${product.unit}.`);
      return;
    }
    const res = addToCart(product, quantity);
    if (res.success) {
      setNotification(`Added ${quantity} ${product.unit} to wholesale purchase cart.`);
      setTimeout(() => setNotification(null), 3500);
    } else {
      setNotification(res.message || 'Error adding to cart.');
    }
  };

  const handleBuyNow = () => {
    if (!isMoqMet) {
      setNotification(`MOQ Notice: Factory minimum order is ${product.minOrderQuantity} ${product.unit}.`);
      return;
    }
    addToCart(product, quantity);
    setActivePage('checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button 
            onClick={() => setActivePage('products')} 
            className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </button>
          <span>/</span>
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActivePage('products')}>
            {product.categoryName}
          </span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-between shadow-lg border border-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
            <button 
              onClick={() => setActivePage('cart')}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              View Cart &rarr;
            </button>
          </div>
        )}

        {/* Main Product Spec & Pricing Grid */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            
            {/* Left: Images & OEM Trust Badges */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md">
                  FACTORY DIRECT
                </div>
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {profitMarginPercent}% Retail Margin
                </div>
              </div>

              {/* Commercial Guarantees */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">Certified OEM</span>
                  <span className="text-[10px] text-slate-500">ISO 9001 Compliant</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">Freight Dispatch</span>
                  <span className="text-[10px] text-slate-500">2-3 Day SLA</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <FileText className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">Net-30 Terms</span>
                  <span className="text-[10px] text-slate-500">Commercial Credit</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing, MOQ, Volume Tiers & Procurement Action */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px]">
                    {product.categoryName}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">SKU: {product.sku}</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold ml-auto text-[11px]">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Supplier link */}
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                  <span>Manufactured by:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    {product.supplierName}
                    {product.supplierVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </span>
                </div>
              </div>

              {/* Wholesale Pricing Panel */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block uppercase tracking-wider">
                      Current Wholesale Unit Price
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-black text-slate-900 font-mono">
                        ${effectiveUnitPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-500 font-normal">/ {product.unit}</span>
                      {applicableDiscount > 0 && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {applicableDiscount}% Tier Discount Active
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">
                      MSRP: ${product.retailMSRP.toFixed(2)}
                    </span>
                    <span className="block text-xs font-bold text-emerald-600">
                      Profit Margin: ${(product.retailMSRP - effectiveUnitPrice).toFixed(2)} ({profitMarginPercent}%)
                    </span>
                  </div>
                </div>

                {/* MOQ & Stock Stats */}
                <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">
                      Factory MOQ Requirement
                    </span>
                    <span className="font-bold text-slate-900 text-sm font-mono">
                      {product.minOrderQuantity} {product.unit} min
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">
                      Warehouse Stock Available
                    </span>
                    <span className="font-bold text-slate-900 text-sm font-mono">
                      {product.availableStock} {product.unit} ready
                    </span>
                  </div>
                </div>

                {/* Volume Tier Discounts */}
                {product.bulkDiscounts && product.bulkDiscounts.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Volume Wholesale Pricing Tiers
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className={`p-2 rounded-lg border transition-all ${
                        applicableDiscount === 0
                          ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-500/30'
                          : 'bg-white border-slate-200'
                      }`}>
                        <span className="text-[10px] text-slate-500 block">Base MOQ</span>
                        <span className="font-bold text-slate-900 font-mono">${product.wholesalePrice.toFixed(2)}</span>
                      </div>
                      {product.bulkDiscounts.map((tier, idx) => {
                        const isThisTierActive = quantity >= tier.minQty;
                        const tierPrice = product.wholesalePrice * (1 - tier.discountPercent / 100);

                        return (
                          <div 
                            key={idx} 
                            className={`p-2 rounded-lg border transition-all ${
                              isThisTierActive
                                ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-500/30 text-emerald-900' 
                                : 'bg-white border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className="text-[10px] text-slate-500 block">{tier.minQty}+ {product.unit}</span>
                            <span className="font-bold font-mono">
                              ${tierPrice.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-emerald-600 block font-semibold">(-{tier.discountPercent}%)</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & MOQ Validation */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Procurement Quantity ({product.unit}):
                  </label>
                  {!isMoqMet ? (
                    <span className="text-amber-600 font-semibold text-[11px] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Add {product.minOrderQuantity - quantity} more to meet MOQ
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      MOQ Requirement Fulfilled
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <button
                      onClick={() => handleQuantityChange(quantity - 5)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number(e.target.value))}
                      className="w-20 py-2 text-center text-sm font-bold text-slate-900 font-mono focus:outline-hidden"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 5)}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 text-right">
                    <span className="text-[11px] text-slate-400 block">Total Order Value:</span>
                    <span className="text-xl font-black text-slate-900 font-mono">
                      ${totalSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Package className="w-4 h-4" />
                    <span>Add Lot to Wholesale Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Instant Net-30 Checkout</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Tabbed Specification & Logistics Section */}
          <div className="border-t border-slate-200">
            <div className="bg-slate-50 px-6 sm:px-8 border-b border-slate-200 flex gap-6 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'specs' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('logistics')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'logistics' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Packaging & Pallet Logistics
              </button>
              <button
                onClick={() => setActiveTab('supplier')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'supplier' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Manufacturer Profile
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'terms' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Commercial Trade Terms
              </button>
            </div>

            <div className="p-6 sm:p-8 text-xs">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Product Attributes</h4>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Commercial Grade:</span>
                      <span className="font-semibold text-slate-900">Industrial / Heavy-Duty</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Certification Standards:</span>
                      <span className="font-semibold text-slate-900">CE, UL, RoHS, FCC</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Unit of Measure:</span>
                      <span className="font-semibold text-slate-900">{product.unit}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Inventory Status:</span>
                      <span className="font-semibold text-emerald-600">Active Production Line</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Quality Assurance</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Every batch is verified through a 3-stage QA inspection protocol prior to freight sealing. Pre-shipment batch certificates and compliance test reports are included with the Bill of Lading.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'logistics' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1">Carton Packaging</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Packaged in reinforced double-wall corrugated export master cartons with moisture barrier lining.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1">Pallet Configuration</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Standard GMA 48" &times; 40" wood pallets, shrink-wrapped with edge protectors and strap banding.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-1">Freight Transport</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Full Truckload (FTL) and Less-Than-Truckload (LTL) carrier dispatch with liftgate delivery options.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'supplier' && (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{product.supplierName}</h4>
                      <span className="text-slate-500 text-[11px]">Certified Tier-1 Wholesaler & Manufacturer</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                      VERIFIED AUDIT PASSED
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Operating direct distribution hubs with automated inventory tracking and dedicated B2B account support. Compliant with US commercial uniform commercial code (UCC).
                  </p>
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Trade Credit & Inspection Terms</h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                    <li>Net-30 commercial credit available upon business credit check approval.</li>
                    <li>7-day inspection window from dock delivery sign-off for discrepancy claims.</li>
                    <li>100% Escrow insurance protection until buyer freight sign-off.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
