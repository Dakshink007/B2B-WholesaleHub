import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  PlusCircle, 
  ArrowLeft, 
  Upload, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const AddProductPage: React.FC = () => {
  const { categories, addProduct, setActivePage, currentUser } = useMarketplace();

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0].id);
  const [description, setDescription] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState<number>(25.00);
  const [retailMSRP, setRetailMSRP] = useState<number>(49.99);
  const [minOrderQuantity, setMinOrderQuantity] = useState<number>(20);
  const [availableStock, setAvailableStock] = useState<number>(500);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80');
  const [unit, setUnit] = useState('pcs');
  const [sku, setSku] = useState(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);

  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [specs, setSpecs] = useState<Record<string, string>>({
    'Quality Standard': 'ISO 9001 Certified',
    'Packaging': 'Carton Pallet Lot'
  });

  const [successMsg, setSuccessMsg] = useState(false);

  const handleAddSpec = () => {
    if (specKey.trim() && specVal.trim()) {
      setSpecs(prev => ({ ...prev, [specKey.trim()]: specVal.trim() }));
      setSpecKey('');
      setSpecVal('');
    }
  };

  const handleRemoveSpec = (key: string) => {
    setSpecs(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const catObj = categories.find(c => c.id === categoryId);

    addProduct({
      name,
      categoryId,
      categoryName: catObj ? catObj.name : 'General',
      description,
      specifications: specs,
      wholesalePrice,
      retailMSRP,
      minOrderQuantity,
      availableStock,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      status: 'ACTIVE',
      sku,
      unit,
      bulkDiscounts: [
        { minQty: minOrderQuantity * 2, discountPercent: 5 },
        { minQty: minOrderQuantity * 5, discountPercent: 12 }
      ]
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setActivePage('manage-products');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-4">
          <button
            onClick={() => setActivePage('supplier-dashboard')}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Supplier Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            List New Wholesale Product
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish a new commercial inventory lot with Minimum Order Quantity (MOQ) and tiered wholesale pricing.
          </p>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-600 text-white text-sm font-bold flex items-center gap-2 shadow-md">
            <CheckCircle2 className="w-5 h-5" />
            <span>Product successfully created in MySQL database and published to wholesale catalog!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              1. Basic Product Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Product Commercial Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Heavy Duty Cordless Circular Saw (Pallet Lot of 30)"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Wholesale Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Unique SKU Identifier</label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Commercial Description & Application</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail factory specifications, durability standards, contractor certifications, and packaging dimensions."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing, MOQ, Stock */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              2. Wholesale Pricing & MOQ Constraints
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Wholesale Unit Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.10"
                  required
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Recommended Retail MSRP ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.10"
                  required
                  value={retailMSRP}
                  onChange={(e) => setRetailMSRP(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Packaging Unit (e.g. pcs, cartons)
                </label>
                <input
                  type="text"
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g. pcs, sets, cartons"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1 text-blue-700">
                  Minimum Order Quantity (MOQ) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={minOrderQuantity}
                  onChange={(e) => setMinOrderQuantity(parseInt(e.target.value) || 1)}
                  className="w-full p-2.5 bg-blue-50/50 border border-blue-300 rounded-lg text-slate-900 font-mono font-bold focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Retailers cannot order less than this lot size.
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Available Warehouse Inventory *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={availableStock}
                  onChange={(e) => setAvailableStock(parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Calculated Retail Profit Margin
                </label>
                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-bold font-mono">
                  {retailMSRP > wholesalePrice 
                    ? `${Math.round(((retailMSRP - wholesalePrice) / retailMSRP) * 100)}% Gross Margin`
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Media & Image */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              3. Commercial Photography & Image URL
            </h3>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-slate-700 block">Product Image URL</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-amber-500"
                placeholder="https://..."
              />
              {imageUrl && (
                <div className="mt-2 w-32 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Specifications */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              4. Technical Specifications
            </h3>

            <div className="flex gap-2 text-xs">
              <input
                type="text"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                placeholder="Spec key (e.g. Voltage, Certification)"
                className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              />
              <input
                type="text"
                value={specVal}
                onChange={(e) => setSpecVal(e.target.value)}
                placeholder="Value (e.g. 220V, CE Approved)"
                className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg cursor-pointer"
              >
                Add Spec
              </button>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden text-xs">
              {Object.entries(specs).map(([k, v]) => (
                <div key={k} className="flex justify-between items-center p-2.5 bg-slate-50">
                  <span className="font-semibold text-slate-700">{k}: <span className="font-normal text-slate-900">{v}</span></span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(k)}
                    className="text-red-500 hover:text-red-700 font-bold text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActivePage('manage-products')}
              className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Wholesale Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
