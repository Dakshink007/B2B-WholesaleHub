import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { OrderStatus } from '../../types';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  Building2, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  FileText, 
  Package, 
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  RotateCw
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, selectedOrderId, setActivePage, updateOrderStatus } = useMarketplace();

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">No order selected</h2>
        <button onClick={() => setActivePage('orders')} className="mt-4 text-blue-600 font-bold">
          View All Orders
        </button>
      </div>
    );
  }

  // 6 Logistics Stages
  const stages: { key: OrderStatus; label: string; desc: string }[] = [
    { key: 'PENDING', label: 'Order Placed', desc: 'Commercial PO authorized by retailer' },
    { key: 'CONFIRMED', label: 'Supplier Accepted', desc: 'Factory manufacturer acknowledged lot assembly' },
    { key: 'PROCESSING', label: 'Pallet Staging', desc: 'Cartons shrink-wrapped & loaded on pallets' },
    { key: 'DISPATCHED', label: 'Freight Picked Up', desc: 'Bill of Lading (BOL) signed by carrier driver' },
    { key: 'IN_TRANSIT', label: 'In Transit', desc: 'Linehaul freight moving between regional terminals' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Forklift dock intake signed at retail facility' },
  ];

  const currentStageIndex = stages.findIndex(s => s.key === currentOrder.status);

  // Advance status button for college demo/viva
  const handleAdvanceStatus = () => {
    const nextIdx = (currentStageIndex + 1) % stages.length;
    updateOrderStatus(currentOrder.id, stages[nextIdx].key);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActivePage('orders')}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders Log
          </button>

          {/* Quick Simulation Button for Demo / Presentation */}
          <button
            onClick={handleAdvanceStatus}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            title="Advance the order status step to demonstrate live logistics state updates"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Simulate Next Freight Stage</span>
          </button>
        </div>

        {/* Order Logistics Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Live Freight Tracking & Dispatch
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                PO #{currentOrder.id}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Carrier: <strong>{currentOrder.carrier || 'Old Dominion Freight Line'}</strong> • Tracking: <strong>{currentOrder.trackingNumber || 'ODFL-982174092'}</strong>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Current Status</span>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-black uppercase mt-1">
                {currentOrder.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Stepper Progression */}
          <div>
            <div className="hidden md:flex items-center justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${(Math.max(0, currentStageIndex) / (stages.length - 1)) * 100}%` }}
                />
              </div>

              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.key} className="flex flex-col items-center text-center z-10 w-28">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPassed 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-4 ring-white' 
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className={`text-xs mt-3 font-bold ${isCurrent ? 'text-blue-600' : isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                      {stage.label}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 leading-tight line-clamp-2">
                      {stage.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Stepper */}
            <div className="md:hidden space-y-4">
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                return (
                  <div key={stage.key} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isPassed ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}>
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <div className="text-xs">
                      <span className={`font-bold ${isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {stage.label}
                      </span>
                      <p className="text-[11px] text-slate-500">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Route & Shipment Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px] mb-1">
                Dispatch Origin (Factory Warehouse)
              </span>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Building2 className="w-4 h-4 text-slate-600" />
                <span>Nexus Logistics Terminal Hub</span>
              </div>
              <p className="text-slate-500 mt-1">Ontario Industrial District, CA</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px] mb-1">
                Destination (Retail Receiving Dock)
              </span>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{currentOrder.companyName}</span>
              </div>
              <p className="text-slate-500 mt-1">{currentOrder.shippingAddress.street}, {currentOrder.shippingAddress.city}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px] mb-1">
                Commercial Bill of Lading (BOL)
              </span>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>BOL-{currentOrder.id.replace('ORD-', 'BOL-')}</span>
              </div>
              <p className="text-slate-500 mt-1">Class 70 Freight • 2 Pallets Shrink-Wrapped</p>
            </div>
          </div>

          {/* Real-time Logistics Log */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Terminal Dispatch & Transit Logs
            </h3>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
              <div className="p-3 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <span className="font-bold text-slate-900">Freight Status Updated: {currentOrder.status.replace('_', ' ')}</span>
                    <p className="text-[11px] text-slate-500">Terminal scanning system verified package barcode sequence</p>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">Today, 09:42 AM</span>
              </div>

              <div className="p-3 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <span className="font-bold text-slate-900">Palletized Lot Released by Factory Quality Control</span>
                    <p className="text-[11px] text-slate-500">Certificate of Conformance (CoC) attached to pallet envelope</p>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">Yesterday, 04:15 PM</span>
              </div>

              <div className="p-3 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                  <div>
                    <span className="font-bold text-slate-900">Wholesale Purchase Order Received & Recorded</span>
                    <p className="text-[11px] text-slate-500">PO validated under Net-30 credit terms</p>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{currentOrder.orderDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
