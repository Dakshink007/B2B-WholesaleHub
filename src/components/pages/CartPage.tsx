import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  ShoppingCart, 
  Trash2, 
  AlertTriangle, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Plus,
  Minus,
  Package,
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    setActivePage, 
    navigateToProduct 
  } = useMarketplace();

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const taxAmount = +(subtotal * 0.08).toFixed(2);
  const freeShippingThreshold = 1500;
  const shippingFee = subtotal > freeShippingThreshold ? 0 : (cart.length > 0 ? 75.00 : 0);
  const totalAmount = +(subtotal + taxAmount + shippingFee).toFixed(2);

  // Check if any cart item violates MOQ
  const hasMoqViolation = cart.some(item => item.quantity < item.product.minOrderQuantity);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center mx-auto text-slate-400 mb-4">
            <ShoppingCart className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Your Wholesale Cart is Empty</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Source commercial inventory with factory-direct volume pricing, verified MOQs, and flexible Net-30 trade credit.
          </p>
          <button
            onClick={() => setActivePage('products')}
            className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Explore Wholesale Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
              <button onClick={() => setActivePage('products')} className="hover:text-blue-600 cursor-pointer">
                Catalog
              </button>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Wholesale Cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              Wholesale Purchase Order Cart
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review commercial lots and verify factory MOQ compliance before invoice generation.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-slate-500 hover:text-red-600 font-bold flex items-center gap-1 self-start sm:self-auto cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Items
          </button>
        </div>

        {/* MOQ Warning Banner if applicable */}
        {hasMoqViolation && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-3 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950">Factory MOQ Requirement Notice:</span> One or more products in your cart do not meet the manufacturer's Minimum Order Quantity requirement. Adjust the quantities to proceed to checkout.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs divide-y divide-slate-100">
              {cart.map((item) => {
                const isUnderMoq = item.quantity < item.product.minOrderQuantity;

                return (
                  <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Thumbnail */}
                    <div 
                      onClick={() => navigateToProduct(item.product.id)}
                      className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 cursor-pointer"
                    >
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-mono text-slate-400">SKU: {item.product.sku}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 font-medium">{item.product.supplierName}</span>
                      </div>

                      <h3 
                        onClick={() => navigateToProduct(item.product.id)}
                        className="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors cursor-pointer truncate"
                      >
                        {item.product.name}
                      </h3>

                      <div className="flex items-center gap-3 text-xs pt-1">
                        <span className="font-mono font-bold text-slate-900">
                          ${item.product.wholesalePrice.toFixed(2)}
                          <span className="font-normal text-slate-500 text-[10px]"> / {item.product.unit}</span>
                        </span>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isUnderMoq 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          Factory MOQ: {item.product.minOrderQuantity} {item.product.unit}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 5)}
                          className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-14 text-center font-mono font-bold text-xs text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 5)}
                          className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="w-24 text-right">
                        <div className="font-mono font-black text-slate-900 text-sm">
                          ${item.subtotal.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-slate-400">Total Lot</span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActivePage('products')}
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-bold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Sourcing
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>All lots covered by B2B Escrow Insurance</span>
              </div>
            </div>
          </div>

          {/* Commercial Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider pb-3 border-b border-slate-100">
                Purchase Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Wholesale Lots Subtotal:</span>
                  <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Pallet Freight & Handling:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE (Orders &gt; $1.5k)</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Commercial Tax (8%):</span>
                  <span className="font-mono font-bold text-slate-900">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">Estimated Total PO:</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900 font-mono">
                      ${totalAmount.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">USD</span>
                  </div>
                </div>
              </div>

              {/* Net-30 Approval Banner */}
              <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Approved Trade Credit: Net-30</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Your business account has <strong className="text-slate-900">$25,000</strong> available trade credit. Invoice payable in 30 days.
                </p>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setActivePage('checkout')}
                disabled={hasMoqViolation}
                className={`w-full py-3 px-4 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 ${
                  hasMoqViolation
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-sm'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Issue Commercial Purchase Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {hasMoqViolation && (
                <p className="text-[11px] text-amber-700 text-center font-medium">
                  Please fulfill all supplier MOQ thresholds to checkout.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
