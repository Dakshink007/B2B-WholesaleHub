import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { UserRole } from '../types';
import { Shield, Store, Factory, RotateCcw, Code2, Check, Sparkles } from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const { currentUser, switchRole, resetDatabase, setActivePage } = useMarketplace();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; user: string }[] = [
    {
      role: 'RETAILER',
      label: 'Retail Buyer',
      icon: <Store className="w-3.5 h-3.5" />,
      user: 'David Patel (Metro Mart)'
    },
    {
      role: 'SUPPLIER',
      label: 'Wholesaler / Factory',
      icon: <Factory className="w-3.5 h-3.5" />,
      user: 'Robert Chen (Nexus Tech)'
    },
    {
      role: 'ADMIN',
      label: 'Platform Admin',
      icon: <Shield className="w-3.5 h-3.5" />,
      user: 'Ops Administrator'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-300 border-b border-slate-800 text-[11px] py-1 px-4 sm:px-6 select-none transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Commercial network pulse */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 font-semibold">B2B Trade Network Live</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">
            4,820 Certified Wholesalers
          </span>
          <span className="text-slate-700 hidden md:inline">•</span>
          <span className="text-slate-400 hidden md:inline">
            Net-30 Escrow Underwritten
          </span>
        </div>

        {/* Right: Role Switcher Capsule + Java Hub button */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-0.5">
            <span className="text-[10px] text-slate-400 font-medium px-2.5 uppercase tracking-wider hidden lg:inline">
              Role:
            </span>
            {roles.map((r) => {
              const isActive = currentUser.role === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => switchRole(r.role)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer text-[11px] ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                  title={`Switch to ${r.label} - ${r.user}`}
                >
                  {r.icon}
                  <span>{r.label}</span>
                  {isActive && <Check className="w-3 h-3 text-white ml-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Java Spring Boot Backend Code Inspector Modal trigger */}
          <button
            onClick={() => setActivePage('java-hub')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 hover:text-amber-200 font-bold transition-all cursor-pointer"
            title="Inspect Spring Boot MVC, JPA & MySQL code for college viva"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Java Code & Viva</span>
          </button>

          {/* Reset DB shortcut */}
          <button
            onClick={() => {
              if (window.confirm('Reset marketplace database to initial demo state?')) {
                resetDatabase();
              }
            }}
            className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
            title="Reset Mock Database"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
