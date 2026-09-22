import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Building2, ShieldCheck, Truck, CreditCard, Award, Code2, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setSelectedCategoryId } = useMarketplace();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* Value proposition assurance bar */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-blue-400 border border-slate-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Vetted Wholesalers</h4>
              <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                Mandatory EIN/GST verification, factory facility audits, and trade insurance checks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Net-30 Trade Credit</h4>
              <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                Revolving commercial credit limits up to $50,000 for approved retail enterprises.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pallet & Container Freight</h4>
              <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                Integrated LTL carrier freight dispatch with live bill-of-lading milestone tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Factory Economics</h4>
              <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                Zero broker markup with transparent Minimum Order Quantities and volume tiers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand statement */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-bold">
              <Building2 className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              Wholesale<span className="text-blue-500">Hub</span>
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Digital wholesale marketplace platform connecting certified suppliers with retail purchasing managers. Built with Spring Boot Java REST backend architecture and MySQL database.
          </p>

          <div className="pt-2 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>procurement@wholesalehub-b2b.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>+1 (800) 555-WHOLESALE (Toll Free)</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Wholesale Sectors</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button 
                onClick={() => { setSelectedCategoryId(7); setActivePage('products'); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Industrial & Tools
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategoryId(2); setActivePage('products'); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Apparel & Textiles
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategoryId(1); setActivePage('products'); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Consumer Electronics
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategoryId(4); setActivePage('products'); }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Grocery & FMCG
              </button>
            </li>
          </ul>
        </div>

        {/* Platform & Roles */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Commercial Portals</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button 
                onClick={() => setActivePage('retailer-dashboard')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Buyer Workspace
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('supplier-dashboard')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Supplier / Factory Hub
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('admin-dashboard')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Platform Administration
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('orders')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Freight & Shipment Tracking
              </button>
            </li>
          </ul>
        </div>

        {/* Academic Project Highlight */}
        <div>
          <h4 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            <span>Academic Project</span>
          </h4>
          <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
            Built as a complete full-stack demonstration of Java Spring Boot, Hibernate/JPA, and MySQL for college evaluation.
          </p>
          <button
            onClick={() => setActivePage('java-hub')}
            className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Open Java Architecture</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 WholesaleHub B2B Technologies Inc. All commercial trade protected by escrow.
          </div>
          <div className="flex items-center gap-4">
            <span>Spring Boot 3.2.x</span>
            <span>•</span>
            <span>MySQL 8.0</span>
            <span>•</span>
            <span>Layered REST MVC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
