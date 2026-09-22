import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { OrderStatus } from '../../types';
import { 
  Building2, 
  Boxes, 
  TrendingUp, 
  PackageCheck, 
  AlertTriangle, 
  PlusCircle, 
  ArrowRight, 
  Truck, 
  CheckCircle,
  FileSpreadsheet,
  Layers,
  ChevronDown
} from 'lucide-react';

export const SupplierDashboard: React.FC = () => {
  const { 
    currentUser, 
    products, 
    orders, 
    setActivePage, 
    updateOrderStatus,
    navigateToOrderTracking
  } = useMarketplace();

  // Filter products by this supplier
  const supplierProducts = products.filter(p => p.supplierId === currentUser.id);

  // Filter orders that contain items from this supplier
  const supplierOrders = orders.filter(o => 
    o.items.some(item => item.supplierId === currentUser.id)
  );

  // Financial calculations
  const totalWholesaleRevenue = supplierOrders.reduce((sum, o) => {
    const myItems = o.items.filter(item => item.supplierId === currentUser.id);
    return sum + myItems.reduce((iSum, i) => iSum + i.subtotal, 0);
  }, 0);

  const pendingOrders = supplierOrders.filter(o => ['PENDING', 'CONFIRMED', 'PROCESSING'].includes(o.status)).length;
  const lowStockProducts = supplierProducts.filter(p => p.availableStock < 100);

  const [statusUpdateAlert, setStatusUpdateAlert] = useState<string | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    setStatusUpdateAlert(`Order #${orderId} status updated to ${newStatus.replace('_', ' ')}!`);
    setTimeout(() => setStatusUpdateAlert(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentUser.companyName || currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                  Verified Wholesaler & Manufacturer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Supplier Portal • Tax ID: {currentUser.taxId || 'US-TX9932014'} • {supplierProducts.length} Active Wholesale SKUs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('add-product')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Wholesale Product</span>
            </button>
            <button
              onClick={() => setActivePage('manage-products')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Manage Catalog
            </button>
          </div>
        </div>

        {/* Status notification */}
        {statusUpdateAlert && (
          <div className="p-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-md">
            <CheckCircle className="w-4 h-4" />
            <span>{statusUpdateAlert}</span>
          </div>
        )}

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Gross Wholesale Volume</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              ${totalWholesaleRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              From {supplierOrders.length} wholesale buyer orders
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Pending Purchase Orders</span>
              <PackageCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {pendingOrders}
            </div>
            <div className="text-[11px] text-amber-600 font-medium mt-1">
              Awaiting confirmation & pallet prep
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Active Listed SKUs</span>
              <Boxes className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {supplierProducts.length}
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">
              Visible on WholesaleHub catalog
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Low Inventory SKUs</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {lowStockProducts.length}
            </div>
            <div className="text-[11px] text-red-600 font-medium mt-1">
              Below 100 units threshold
            </div>
          </div>
        </div>

        {/* Incoming Wholesale Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Incoming Purchase Orders (POs)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update status as goods move from confirmation to pallet assembly and freight dispatch.
              </p>
            </div>
            <button
              onClick={() => setActivePage('orders')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {supplierOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No orders received yet for this supplier account.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3.5 px-4">PO Number</th>
                    <th className="py-3.5 px-4">Retailer / Buyer</th>
                    <th className="py-3.5 px-4">My Supplied Items</th>
                    <th className="py-3.5 px-4">Total Order Value</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4">Current Status</th>
                    <th className="py-3.5 px-4 text-right">Update Order Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {supplierOrders.map((order) => {
                    const myItems = order.items.filter(item => item.supplierId === currentUser.id);

                    return (
                      <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-slate-900">
                          {order.id}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-slate-900 block">{order.companyName}</span>
                          <span className="text-[11px] text-slate-400">{order.retailerName}</span>
                        </td>
                        <td className="py-4 px-4">
                          {myItems.map((item) => (
                            <div key={item.id} className="text-slate-800">
                              <strong>{item.quantity}×</strong> {item.productName}
                            </div>
                          ))}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-slate-900">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {order.paymentMethod}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                              className="bg-white border border-slate-300 rounded-md px-2.5 py-1 text-xs font-semibold text-slate-700 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="CONFIRMED">CONFIRM ORDER</option>
                              <option value="PROCESSING">IN PROCESSING / PACKING</option>
                              <option value="DISPATCHED">DISPATCHED TO FREIGHT</option>
                              <option value="IN_TRANSIT">IN TRANSIT</option>
                              <option value="DELIVERED">MARK DELIVERED</option>
                              <option value="CANCELLED">CANCEL ORDER</option>
                            </select>

                            <button
                              onClick={() => navigateToOrderTracking(order.id)}
                              className="p-1.5 rounded text-slate-400 hover:text-blue-600 transition-colors"
                              title="View Logistics Timeline"
                            >
                              <Truck className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low Stock Alerts & Quick Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-black text-slate-900 tracking-tight mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Low Stock & Inventory Replenishment
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Products that may fail MOQ fulfillment if bulk orders are placed.
            </p>

            {lowStockProducts.length === 0 ? (
              <div className="p-4 bg-emerald-50 rounded-lg text-emerald-800 text-xs font-semibold">
                ✓ All inventory items are well-stocked above MOQ thresholds.
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{p.name}</h4>
                      <p className="text-slate-500 text-[11px]">MOQ: {p.minOrderQuantity} {p.unit}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600 font-mono text-sm">{p.availableStock} {p.unit} left</span>
                      <button 
                        onClick={() => setActivePage('manage-products')}
                        className="block text-[11px] text-blue-600 hover:underline font-semibold"
                      >
                        Adjust Stock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">
                Quick Catalog Management
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Add new items, update wholesale price tiers, adjust available pallet inventory, and upload high-resolution product imagery.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActivePage('add-product')}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Wholesale Product</span>
              </button>
              <button
                onClick={() => setActivePage('manage-products')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Open Catalog Management Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
