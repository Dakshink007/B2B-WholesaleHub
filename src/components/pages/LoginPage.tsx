import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { UserRole } from '../../types';
import { 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  KeyRound
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setActivePage } = useMarketplace();

  const [email, setEmail] = useState('buyer@metroretail.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('RETAILER');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide valid commercial credentials.');
      return;
    }
    login(email, role);
    if (role === 'RETAILER') setActivePage('retailer-dashboard');
    else if (role === 'SUPPLIER') setActivePage('supplier-dashboard');
    else setActivePage('admin-dashboard');
  };

  const handleQuickDemoLogin = (demoRole: UserRole, demoEmail: string) => {
    login(demoEmail, demoRole);
    if (demoRole === 'RETAILER') setActivePage('retailer-dashboard');
    else if (demoRole === 'SUPPLIER') setActivePage('supplier-dashboard');
    else setActivePage('admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black mx-auto shadow-md">
          <Building2 className="w-7 h-7" />
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Commercial B2B Portal Login
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Access your verified wholesale buying or supplier manufacturing account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Quick Demo Selector for College Presentation */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
              1-Click Demo Account Login:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('RETAILER', 'buyer@metroretail.com')}
                className="p-2 text-center rounded bg-white hover:bg-blue-100/50 border border-blue-200 text-blue-900 text-xs font-bold transition-all shadow-2xs"
              >
                Retailer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('SUPPLIER', 'supply@nexustech.com')}
                className="p-2 text-center rounded bg-white hover:bg-amber-100/50 border border-amber-200 text-amber-900 text-xs font-bold transition-all shadow-2xs"
              >
                Supplier
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('ADMIN', 'admin@wholesalehub.com')}
                className="p-2 text-center rounded bg-white hover:bg-purple-100/50 border border-purple-200 text-purple-900 text-xs font-bold transition-all shadow-2xs"
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Commercial Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
                  placeholder="corporate@business.com"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Secure Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Account Role Authority</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-600"
              >
                <option value="RETAILER">Retail Buyer (Browse, MOQ Cart, Net-30)</option>
                <option value="SUPPLIER">Wholesale Supplier / Manufacturer (List SKUs, Fulfill Orders)</option>
                <option value="ADMIN">Platform Super-Admin (Moderation & Escrow)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 border-slate-300" />
                <span className="text-slate-600">Remember corporate session</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-800 font-semibold">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs mt-2"
            >
              <span>Sign In to Commercial Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Don't have a verified commercial account? </span>
            <button
              onClick={() => setActivePage('register')}
              className="text-blue-600 hover:text-blue-800 font-bold ml-1 cursor-pointer"
            >
              Register Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
