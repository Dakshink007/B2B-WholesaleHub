import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Building2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  CreditCard, 
  Save, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, switchUserRole, setActivePage } = useMarketplace();

  const [name, setName] = useState(currentUser.name);
  const [companyName, setCompanyName] = useState(currentUser.companyName || '');
  const [phone, setPhone] = useState(currentUser.phone || '+1 (555) 782-9014');
  const [address, setAddress] = useState(currentUser.address || '850 Market Street');
  const [city, setCity] = useState(currentUser.city || 'San Francisco');
  const [taxId, setTaxId] = useState(currentUser.taxId || 'US-CA4590218');
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Commercial Account & Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your corporate identity, billing tax ID, and delivery bays.
          </p>
        </div>

        {savedAlert && (
          <div className="p-4 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile credentials updated successfully in marketplace database!</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
              <Building2 className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{companyName || name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company Registered Legal Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Corporate Tax ID / EIN / GSTIN</label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Authorized Contact Officer</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Corporate Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Commercial Receiving Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Credit Line Status */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Commercial Net-30 Trade Credit Line</h4>
                  <p className="text-[11px] text-slate-500">Underwritten by WholesaleHub Capital Escrow</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Pre-Approved Limit</span>
                <span className="font-black text-sm text-slate-900 font-mono">$25,000.00 USD</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
