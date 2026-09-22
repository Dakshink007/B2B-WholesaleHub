import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  CheckCircle2, 
  Truck, 
  FileText, 
  Building2, 
  ArrowRight, 
  Printer, 
  Download,
  Calendar,
  ShieldCheck
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orders, selectedOrderId, setActivePage, navigateToOrderTracking } = useMarketplace();

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">No order found</h2>
        <button onClick={() => setActivePage('orders')} className="mt-4 text-blue-600 font-bold">
          View All Orders
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Alert Header */}
        <div className="bg-emerald-600 text-white rounded-2xl p-6 sm:p-8 shadow-lg text-center sm:text-left flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 block">
              Wholesale Purchase Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-1 text-white">
              Order #{currentOrder.id} Authorized
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Your purchase order has been queued for warehouse staging. Suppliers have been notified to initiate pallet prep.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => navigateToOrderTracking(currentOrder.id)}
              className="px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Dispatch</span>
            </button>
          </div>
        </div>

        {/* Printable Proforma Commercial Invoice Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xl font-black text-slate-900">Wholesale<span className="text-blue-600">Hub</span></span>
              </div>
              <p className="text-xs text-slate-500">Commercial Wholesale B2B Marketplace</p>
              <p className="text-xs text-slate-400">Platform Operations & Freight Clearing</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">Commercial Proforma Invoice</span>
              <div className="text-lg font-black font-mono text-slate-900 mt-1">#{currentOrder.id}</div>
              <div className="text-xs text-slate-500 flex sm:justify-end items-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Date: {currentOrder.orderDate}</span>
              </div>
            </div>
          </div>

          {/* Bill To & Ship To info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[11px] mb-2">
                Purchaser / Retailer (Bill To)
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{currentOrder.companyName}</h4>
              <p className="text-slate-600 mt-1">Contact: {currentOrder.retailerName}</p>
              <p className="text-slate-600">Payment Terms: <strong>{currentOrder.paymentMethod} ({currentOrder.paymentStatus})</strong></p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[11px] mb-2">
                Freight Receiving Bay (Ship To)
              </span>
              <h4 className="font-bold text-slate-900 text-sm">{currentOrder.shippingAddress.street}</h4>
              <p className="text-slate-600 mt-1">
                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}
              </p>
              <p className="text-slate-600">Country: {currentOrder.shippingAddress.country}</p>
              <p className="text-slate-600">Freight Carrier: <strong>{currentOrder.carrier || 'Freight Line'}</strong></p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
                  <th className="py-3 px-2">Wholesale Item & SKU</th>
                  <th className="py-3 px-2">Supplier</th>
                  <th className="py-3 px-2 text-right">Unit Price</th>
                  <th className="py-3 px-2 text-center">Lot Qty</th>
                  <th className="py-3 px-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3.5 px-2 font-bold text-slate-900 max-w-xs">
                      {item.productName}
                    </td>
                    <td className="py-3.5 px-2 text-slate-600">{item.supplierName}</td>
                    <td className="py-3.5 px-2 text-right font-mono text-slate-700">
                      ${item.wholesalePrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-2 text-center font-bold text-slate-900">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900">
                      ${item.subtotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 max-w-sm space-y-1">
              <span className="font-bold text-slate-700 block">Terms & Conditions of Wholesale Purchase:</span>
              <p>
                Title transfers FOB origin upon carrier bill of lading generation. Net-30 invoice matures 30 days from confirmed dock intake.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-slate-900">${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>State Wholesale Tax (8%):</span>
                <span className="font-mono font-bold text-slate-900">${currentOrder.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Freight Shipping:</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentOrder.shippingFee === 0 ? 'FREE' : `$${currentOrder.shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="font-mono text-blue-600">${currentOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Invoice Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => alert(`Invoice #${currentOrder.id} ready for download.`)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActivePage('retailer-dashboard')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Go to Buyer Dashboard
              </button>
              <button
                onClick={() => navigateToOrderTracking(currentOrder.id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Track Live Logistics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
