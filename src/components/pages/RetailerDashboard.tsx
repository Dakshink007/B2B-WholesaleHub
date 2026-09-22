import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Building2, 
  TrendingUp, 
  Truck, 
  CreditCard, 
  Package, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Search,
  ExternalLink,
  RotateCw,
  ShoppingBag
} from 'lucide-react';

export const RetailerDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    products, 
    setActivePage, 
    navigateToOrderTracking,
    navigateToProduct,
    addToCart
  } = useMarketplace();

  // Retailer orders
  const retailerOrders = orders.filter(o => o.retailerId === currentUser.id);

  const totalSpent = retailerOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeShipments = retailerOrders.filter(o => ['PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'IN_TRANSIT'].includes(o.status)).length;
  const net30Balance = retailerOrders
    .filter(o => o.paymentMethod === 'NET_30' && o.status !== 'DELIVERED')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const handleReorder = (productId: number, qty: number) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      addToCart(prod, Math.max(prod.minOrderQuantity, qty));
      setActivePage('cart');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentUser.companyName || currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold">
                  Verified Retail Partner
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Account Manager: {currentUser.name} • Tax ID: {currentUser.taxId || 'US-CA4590218'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('products')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Source New Inventory</span>
            </button>
            <button
              onClick={() => setActivePage('profile')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Manage Account
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Total Sourcing Spend</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              Across {retailerOrders.length} commercial orders
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Active Bulk Shipments</span>
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {activeShipments}
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">
              En-route or in warehouse prep
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Net-30 Open Credit</span>
              <CreditCard className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              ${net30Balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-1">
              Credit Limit: $25,000.00
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Delivery Success</span>
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              100%
            </div>
            <div className="text-[11px] text-purple-600 font-medium mt-1">
              Zero freight discrepancies
            </div>
          </div>
        </div>

        {/* Recent Wholesale Purchase Orders */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Recent Purchase Orders & Invoices
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time tracking of bulk orders placed by your retail organization.
              </p>
            </div>
            <button
              onClick={() => setActivePage('orders')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {retailerOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No orders placed yet. Explore the catalog to start sourcing!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3.5 px-4">PO / Order #</th>
                    <th className="py-3.5 px-4">Order Date</th>
                    <th className="py-3.5 px-4">Items / Pallets</th>
                    <th className="py-3.5 px-4">Total Amount</th>
                    <th className="py-3.5 px-4">Payment Terms</th>
                    <th className="py-3.5 px-4">Fulfillment Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {retailerOrders.map((order) => {
                    const statusColors: Record<string, string> = {
                      PENDING: 'bg-amber-100 text-amber-800',
                      CONFIRMED: 'bg-blue-100 text-blue-800',
                      PROCESSING: 'bg-indigo-100 text-indigo-800',
                      DISPATCHED: 'bg-purple-100 text-purple-800',
                      IN_TRANSIT: 'bg-sky-100 text-sky-800',
                      DELIVERED: 'bg-emerald-100 text-emerald-800',
                      CANCELLED: 'bg-red-100 text-red-800'
                    };

                    return (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-blue-600">
                          {order.id}
                        </td>
                        <td className="py-4 px-4 text-slate-600">{order.orderDate}</td>
                        <td className="py-4 px-4 text-slate-800">
                          <span className="font-bold">{order.items.length} items</span> ({order.items.reduce((s, i) => s + i.quantity, 0)} units)
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-slate-900">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
                          <span className="block text-[10px] text-slate-400">({order.paymentStatus})</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => navigateToOrderTracking(order.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                          >
                            Track Logistics
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Inventory Re-order Carousel */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Fast Re-Order Favorites
              </h3>
              <p className="text-xs text-slate-500">Quickly restock high velocity store inventory.</p>
            </div>
            <button
              onClick={() => setActivePage('products')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Browse Full Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.slice(0, 3).map((p) => (
              <div key={p.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded object-cover shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-slate-900 truncate">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">${p.wholesalePrice.toFixed(2)} • MOQ: {p.minOrderQuantity}</p>
                </div>
                <button
                  onClick={() => handleReorder(p.id, p.minOrderQuantity)}
                  className="p-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-colors"
                  title="Re-order minimum quantity"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
