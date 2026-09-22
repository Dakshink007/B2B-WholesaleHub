import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { UserRole } from '../../types';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Boxes, 
  CreditCard, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Layers, 
  Plus, 
  Building2,
  Code2,
  Database
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    categories, 
    addCategory, 
    setActivePage,
    currentUser
  } = useMarketplace();

  // Mock platform users for admin user management
  const [platformUsers, setPlatformUsers] = useState([
    { id: 1, name: 'Elena Rostova', email: 'buyer@metroretail.com', role: 'RETAILER' as UserRole, company: 'Metro Retail Marts', status: 'ACTIVE', gmv: '$42,500' },
    { id: 2, name: 'Marcus Vance', email: 'supply@nexustech.com', role: 'SUPPLIER' as UserRole, company: 'Nexus Tech Wholesalers', status: 'ACTIVE', gmv: '$89,200' },
    { id: 3, name: 'David Kim', email: 'sales@apexglobal.com', role: 'SUPPLIER' as UserRole, company: 'Apex Industrial Supply', status: 'ACTIVE', gmv: '$34,100' },
    { id: 4, name: 'Sarah Jenkins', email: 'purchasing@coastalstores.com', role: 'RETAILER' as UserRole, company: 'Coastal Department Stores', status: 'PENDING_KYC', gmv: '$0' },
    { id: 5, name: 'System Administrator', email: 'admin@wholesalehub.com', role: 'ADMIN' as UserRole, company: 'WholesaleHub Corp', status: 'ACTIVE', gmv: 'N/A' },
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Boxes');
  const [showAddCat, setShowAddCat] = useState(false);

  // Platform metrics
  const totalMarketplaceGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 124500.00;
  const platformFeeCommission = totalMarketplaceGMV * 0.035; // 3.5% take rate

  const handleApproveKYC = (userId: number) => {
    setPlatformUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'ACTIVE' } : u));
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory({
        name: newCatName.trim(),
        slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
        description: newCatDesc.trim() || 'Wholesale commercial merchandise category',
        iconName: newCatIcon
      });
      setNewCatName('');
      setNewCatDesc('');
      setShowAddCat(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">
                  Super-Admin Platform Operations
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 text-[11px] font-bold border border-blue-400/40">
                  Root Controller
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                WholesaleHub B2B Enterprise Engine • Connected to Spring Boot & MySQL Service
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActivePage('orders')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              All Transactions
            </button>
            <button
              onClick={() => setActivePage('manage-products')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors shadow-md cursor-pointer"
            >
              Catalog Moderator
            </button>
          </div>
        </div>

        {/* Global Platform KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Gross Marketplace GMV</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              ${totalMarketplaceGMV.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              +18.4% monthly wholesale growth
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Platform Take (3.5%)</span>
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              ${platformFeeCommission.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">
              Automated escrow clearing
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Registered Commercial Accounts</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {platformUsers.length + 142}
            </div>
            <div className="text-[11px] text-indigo-600 font-medium mt-1">
              88 Retailers • 54 Manufacturers
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">Active Wholesale SKUs</span>
              <Boxes className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              {products.length}
            </div>
            <div className="text-[11px] text-amber-600 font-medium mt-1">
              Across {categories.length} wholesale categories
            </div>
          </div>
        </div>

        {/* User Account & KYC Moderation Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Enterprise Accounts & KYC Verification
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Approve corporate tax documents and assign role permissions (Retailer vs. Wholesaler).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-4">Commercial Entity</th>
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Assigned Role</th>
                  <th className="py-3.5 px-4">Platform Volume</th>
                  <th className="py-3.5 px-4">KYC Compliance</th>
                  <th className="py-3.5 px-4 text-right">Moderator Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {platformUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{u.company}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-800">{u.name}</span>
                      <span className="block text-[11px] text-slate-400">{u.email}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                        u.role === 'SUPPLIER' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-800">
                      {u.gmv}
                    </td>
                    <td className="py-4 px-4">
                      {u.status === 'ACTIVE' ? (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5" /> Approved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5" /> Pending Tax Review
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {u.status === 'PENDING_KYC' ? (
                        <button
                          onClick={() => handleApproveKYC(u.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                        >
                          Approve KYC
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Management & Taxonomy */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Wholesale Taxonomy & Categories
              </h3>
              <p className="text-xs text-slate-500">Manage marketplace classification tiers.</p>
            </div>

            <button
              onClick={() => setShowAddCat(!showAddCat)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          {showAddCat && (
            <form onSubmit={handleCreateCategory} className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase">Create New Wholesale Category</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Category Name (e.g. Industrial Chemicals)"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="p-2 bg-white border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCat(false)}
                  className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-500"
                >
                  Save Category
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((c) => (
              <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-center">
                <span className="font-bold text-slate-900 block truncate">{c.name}</span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {products.filter(p => p.categoryId === c.id).length} Products Listed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
