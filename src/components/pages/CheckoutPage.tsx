import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  ArrowLeft,
  FileText,
  AlertCircle,
  Package,
  Boxes
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    currentUser, 
    placeOrder, 
    setActivePage 
  } = useMarketplace();

  const [paymentMethod, setPaymentMethod] = useState<'NET_30' | 'BANK_TRANSFER' | 'CREDIT_CARD'>('NET_30');
  const [poNumber, setPoNumber] = useState<string>(`PO-${Math.floor(10000 + Math.random() * 90000)}`);
  const [shippingAddress, setShippingAddress] = useState({
    street: currentUser.address || '850 Market Street, Receiving Bay 4',
    city: currentUser.city || 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    country: 'United States',
    dockType: 'LOADING_DOCK_FORKLIFT',
    deliveryContact: currentUser.name || 'David Patel',
    contactPhone: currentUser.phone || '+1 (555) 782-9014'
  });

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const taxAmount = +(subtotal * 0.08).toFixed(2);
  const shippingFee = subtotal > 1500 ? 0 : 75.00;
  const totalAmount = +(subtotal + taxAmount + shippingFee).toFixed(2);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setActivePage('products');
      return;
    }
    const order = placeOrder(shippingAddress, paymentMethod);
    setActivePage('confirmation');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
        <button onClick={() => setActivePage('products')} className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-4">
          <button 
            onClick={() => setActivePage('cart')}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart Review
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
          Commercial Purchase Order Checkout
        </h1>
        <p className="text-xs text-slate-500 mb-8">
          Authorized procurement execution for <strong className="text-slate-800">{currentUser.companyName || currentUser.name}</strong>.
        </p>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Dock Logistics & Payment Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Receiving Facility & Dock Specs */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Warehouse Receiving & Dock Logistics
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Receiving Company / Facility</label>
                  <input
                    type="text"
                    value={currentUser.companyName || 'Metro Retail Mart LLC'}
                    disabled
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Dock Delivery Contact</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.deliveryContact}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, deliveryContact: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Receiving Phone Number</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.contactPhone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, contactPhone: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Warehouse Street Address & Bay</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium font-mono"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Dock Receiving Capability</label>
                  <select
                    value={shippingAddress.dockType}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, dockType: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:border-blue-600 font-medium cursor-pointer"
                  >
                    <option value="LOADING_DOCK_FORKLIFT">Standard Commercial Loading Dock (Forklift On-Site)</option>
                    <option value="GROUND_LIFTGATE">Ground-Level Warehouse (Requires Liftgate Truck)</option>
                    <option value="LIMITED_ACCESS">Commercial Storefront / Limited Semi-Truck Access</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Commercial Payment Terms & Purchase Order */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Payment Method & Commercial Terms
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* Net-30 Trade Credit */}
                <label className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'NET_30'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'NET_30'}
                      onChange={() => setPaymentMethod('NET_30')}
                      className="accent-blue-600 mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          Net-30 Commercial Trade Credit (Recommended)
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                          APPROVED
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-1">
                        Invoice issued upon bill-of-lading carrier dispatch. Full balance payable 30 calendar days post dock delivery.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Wire Transfer / ACH */}
                <label className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'BANK_TRANSFER'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'BANK_TRANSFER'}
                      onChange={() => setPaymentMethod('BANK_TRANSFER')}
                      className="accent-blue-600 mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 text-sm block">
                        Corporate Bank Wire / ACH Corporate Transfer
                      </span>
                      <p className="text-slate-500 text-[11px] mt-1">
                        Automated clearing house direct debit with instant escrow holding until delivery acceptance.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Commercial Card */}
                <label className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'CREDIT_CARD'
                    ? 'border-blue-600 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'CREDIT_CARD'}
                      onChange={() => setPaymentMethod('CREDIT_CARD')}
                      className="accent-blue-600 mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 text-sm block">
                        Corporate Purchasing Card (P-Card) / Credit Card
                      </span>
                      <p className="text-slate-500 text-[11px] mt-1">
                        Instant electronic settlement with 256-bit encrypted merchant vault.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Purchase Order Number */}
              <div className="pt-3 border-t border-slate-100 text-xs">
                <label className="font-semibold text-slate-700 block mb-1">
                  Buyer Purchase Order Reference (PO Number)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="flex-1 p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:outline-hidden focus:border-blue-600"
                    placeholder="e.g. PO-84920"
                  />
                  <button
                    type="button"
                    onClick={() => setPoNumber(`PO-${Math.floor(10000 + Math.random() * 90000)}`)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-[11px] cursor-pointer"
                  >
                    Generate Reference
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Issuance */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-wider pb-3 border-b border-slate-100">
                Purchase Order Review
              </h3>

              {/* Item Lots */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1">
                    <div className="pr-2 min-w-0">
                      <div className="font-bold text-slate-900 truncate">{item.product.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {item.quantity} &times; ${item.product.wholesalePrice.toFixed(2)} / {item.product.unit}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900 shrink-0">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Lots Subtotal:</span>
                  <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>LTL Pallet Freight:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax:</span>
                  <span className="font-mono font-bold text-slate-900">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-black text-slate-900 text-sm">Total PO Value:</span>
                  <span className="text-xl font-black text-slate-900 font-mono">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit PO Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Lock className="w-4 h-4" />
                <span>Issue Purchase Order & Confirm</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Escrow Guarantee: Payment released post inspection</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
