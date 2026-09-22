import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { UserRole } from '../../types';
import { 
  Building2, 
  Lock, 
  Mail, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, setActivePage } = useMarketplace();

  const [role, setRole] = useState<UserRole>('RETAILER');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [taxId, setTaxId] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name,
      email,
      role,
      companyName,
      taxId: taxId || 'US-CORP-98124',
      phone: phone || '+1 (555) 234-8901',
      address: address || '100 Industrial Parkway',
      city: city || 'Chicago'
    });

    if (role === 'RETAILER') setActivePage('retailer-dashboard');
    else if (role === 'SUPPLIER') setActivePage('supplier-dashboard');
    else setActivePage('admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black mx-auto shadow-md">
          <Building2 className="w-7 h-7" />
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Register Commercial Business Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Join 10,000+ verified retailers and factory manufacturers trading on WholesaleHub.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <form onSubmit={handleSubmit} className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Role selector tabs */}
          <div>
            <label className="font-bold text-xs text-slate-800 uppercase tracking-wider block mb-2">
              Select Enterprise Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('RETAILER')}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  role === 'RETAILER'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-black text-slate-900 text-sm block">Retail Buyer</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Source bulk products, manage MOQ orders, and unlock Net-30 credit.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole('SUPPLIER')}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  role === 'SUPPLIER'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-black text-slate-900 text-sm block">Wholesaler / Factory</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  List wholesale SKUs, define volume pricing, and fulfill bulk pallets.
                </span>
              </button>
            </div>
          </div>

          {/* Form details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company Registered Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Hardware Stores Inc."
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tax Registration ID (EIN/GSTIN) *</label>
              <input
                type="text"
                required
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="e.g. US-98421094"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Authorized Contact Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Connor"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Commercial Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@business.com"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Corporate Phone *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Facility / Warehouse Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 500 Enterprise Way, Suite 300"
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              By registering, you agree to WholesaleHub's B2B Terms of Trade and Net-30 underwriting credit policies.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            <span>Complete Business Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => setActivePage('login')}
              className="text-blue-600 hover:text-blue-800 font-bold ml-1 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
