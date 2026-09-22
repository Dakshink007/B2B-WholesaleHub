import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Product } from '../../types';
import { 
  Boxes, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Search, 
  Check, 
  AlertCircle,
  Building2,
  ArrowLeft,
  Eye
} from 'lucide-react';

export const ManageProductsPage: React.FC = () => {
  const { 
    products, 
    currentUser, 
    updateProduct, 
    deleteProduct, 
    setActivePage, 
    navigateToProduct 
  } = useMarketplace();

  // If Admin, can manage all products; if Supplier, manages their own
  const targetProducts = currentUser.role === 'ADMIN' 
    ? products 
    : products.filter(p => p.supplierId === currentUser.id);

  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [editMoq, setEditMoq] = useState<number>(0);

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setEditPrice(product.wholesalePrice);
    setEditStock(product.availableStock);
    setEditMoq(product.minOrderQuantity);
  };

  const handleSaveEdit = (productId: number) => {
    updateProduct(productId, {
      wholesalePrice: editPrice,
      availableStock: editStock,
      minOrderQuantity: editMoq,
      status: editStock <= 0 ? 'OUT_OF_STOCK' : 'ACTIVE'
    });
    setEditingId(null);
  };

  const handleDelete = (productId: number, productName: string) => {
    if (window.confirm(`Are you sure you want to remove "${productName}" from the wholesale marketplace?`)) {
      deleteProduct(productId);
    }
  };

  const filtered = targetProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <button 
                onClick={() => setActivePage(currentUser.role === 'ADMIN' ? 'admin-dashboard' : 'supplier-dashboard')} 
                className="hover:text-blue-600 flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Dashboard
              </button>
              <span>/</span>
              <span className="font-semibold text-slate-800">Inventory Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Manage Wholesale Inventory & SKUs
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {currentUser.role === 'ADMIN' 
                ? 'Platform-wide product catalog moderation' 
                : `Managing items listed under ${currentUser.companyName || currentUser.name}`}
            </p>
          </div>

          <button
            onClick={() => setActivePage('add-product')}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Wholesale SKU</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Total Listed SKUs: <strong className="text-slate-900">{filtered.length}</strong>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No products found. Click "List New Wholesale SKU" to publish products.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3.5 px-4">Item & SKU</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Wholesale Price</th>
                    <th className="py-3.5 px-4">MOQ</th>
                    <th className="py-3.5 px-4">Warehouse Stock</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((p) => {
                    const isEditing = editingId === p.id;

                    return (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                            />
                            <div className="min-w-0 max-w-xs">
                              <h4 
                                onClick={() => navigateToProduct(p.id)}
                                className="font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                              >
                                {p.name}
                              </h4>
                              <span className="text-[11px] font-mono text-slate-400">SKU: {p.sku}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-600">
                          {p.categoryName}
                        </td>

                        <td className="py-4 px-4 font-mono font-bold text-slate-900">
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.01"
                              value={editPrice}
                              onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border border-amber-400 rounded text-xs font-bold"
                            />
                          ) : (
                            `$${p.wholesalePrice.toFixed(2)}`
                          )}
                        </td>

                        <td className="py-4 px-4 font-bold text-slate-800">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editMoq}
                              onChange={(e) => setEditMoq(parseInt(e.target.value) || 1)}
                              className="w-16 p-1 border border-amber-400 rounded text-xs font-bold"
                            />
                          ) : (
                            `${p.minOrderQuantity} ${p.unit}`
                          )}
                        </td>

                        <td className="py-4 px-4 font-mono">
                          {isEditing ? (
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                              className="w-20 p-1 border border-amber-400 rounded text-xs font-bold"
                            />
                          ) : (
                            <span className={p.availableStock < 50 ? 'text-red-600 font-bold' : 'text-slate-900 font-bold'}>
                              {p.availableStock} {p.unit}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'ACTIVE' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : p.status === 'OUT_OF_STOCK'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {p.status}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isEditing ? (
                              <button
                                onClick={() => handleSaveEdit(p.id)}
                                className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-500 cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Save
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStartEdit(p)}
                                className="p-1.5 text-slate-500 hover:text-amber-600 rounded hover:bg-slate-100 transition-colors"
                                title="Quick Edit Price/Stock"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            )}

                            <button
                              onClick={() => navigateToProduct(p.id)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100 transition-colors"
                              title="Preview in Catalog"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDelete(p.id, p.name)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
