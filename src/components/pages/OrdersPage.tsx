import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { OrderStatus } from '../../types';
import { 
  FileText, 
  Search, 
  Truck, 
  Calendar, 
  Building2, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Filter,
  Eye
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { 
    orders, 
    currentUser, 
    navigateToOrderTracking, 
    setActivePage,
    setSelectedOrderId
  } = useMarketplace();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  // Scope orders by user role
  const relevantOrders = orders.filter((o) => {
    if (currentUser.role === 'RETAILER') {
      return o.retailerId === currentUser.id;
    }
    if (currentUser.role === 'SUPPLIER') {
      return o.items.some(i => i.supplierId === currentUser.id);
    }
    return true; // Admin sees all
  });

  const filteredOrders = relevantOrders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCompany = o.companyName.toLowerCase().includes(q);
      const matchItem = o.items.some(i => i.productName.toLowerCase().includes(q));
      if (!matchId && !matchCompany && !matchItem) return false;
    }
    return true;
  });

  const handleViewInvoice = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActivePage('confirmation');
  };

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
    PROCESSING: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DISPATCHED: 'bg-purple-100 text-purple-800 border-purple-200',
    IN_TRANSIT: 'bg-sky-100 text-sky-800 border-sky-200',
    DELIVERED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Commercial Purchase Orders & Invoices
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Comprehensive logs of B2B transactions, freight dispatches, and Net-30 payment statuses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Total Recorded Orders: <strong className="text-slate-900">{filteredOrders.length}</strong>
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order #, Company, Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1 md:pb-0">
            {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List / Cards */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
            <p className="text-sm font-bold text-slate-800">No purchase orders found matching filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the status filter or keyword search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 transition-all"
              >
                <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-base font-black text-blue-600">
                      #{order.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusColors[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {order.orderDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500">Payment Terms:</span>
                    <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded border border-slate-200">
                      {order.paymentMethod} • <span className="text-emerald-700">{order.paymentStatus}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Itemized summary */}
                  <div className="md:col-span-6 space-y-2">
                    <div className="text-xs font-semibold text-slate-500">
                      Ordered Wholesale Lots ({order.items.length} SKUs):
                    </div>
                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs text-slate-800">
                          <span className="font-medium">
                            <strong className="text-slate-900">{item.quantity}×</strong> {item.productName}
                          </span>
                          <span className="font-mono text-slate-600">${item.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Freight & Facility info */}
                  <div className="md:col-span-3 text-xs space-y-1 text-slate-600 border-l border-slate-100 pl-4">
                    <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                      Freight Receiving Bay:
                    </span>
                    <p className="font-semibold text-slate-900">{order.companyName}</p>
                    <p className="truncate">{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    {order.carrier && (
                      <p className="text-blue-600 font-semibold pt-1">Carrier: {order.carrier}</p>
                    )}
                  </div>

                  {/* Pricing & Actions */}
                  <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-slate-500 block">Total Order Value</span>
                      <span className="text-xl font-black text-slate-900 font-mono">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => handleViewInvoice(order.id)}
                        className="flex-1 md:flex-none px-3 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title="View Proforma Invoice"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      <button
                        onClick={() => navigateToOrderTracking(order.id)}
                        className="flex-1 md:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
