import React, { useState, useMemo } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Product } from '../../types';
import { 
  Filter, 
  Search, 
  Building2, 
  Star, 
  ShieldCheck, 
  ArrowUpDown, 
  ShoppingCart, 
  Check, 
  SlidersHorizontal,
  X,
  LayoutGrid,
  ListFilter,
  Package,
  Boxes,
  TrendingUp,
  Tag
} from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const { 
    products, 
    categories, 
    selectedCategoryId, 
    setSelectedCategoryId, 
    searchQuery, 
    setSearchQuery,
    navigateToProduct,
    addToCart,
    setActivePage
  } = useMarketplace();

  const [selectedSupplier, setSelectedSupplier] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [moqFilter, setMoqFilter] = useState<string>('ALL');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'moq-asc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [addedAlert, setAddedAlert] = useState<number | null>(null);

  // Extract unique suppliers
  const suppliers = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.supplierName)));
    return list;
  }, [products]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategoryId !== null && p.categoryId !== selectedCategoryId) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          const matchSupplier = p.supplierName.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchSupplier && !matchSku) return false;
        }
        // Supplier filter
        if (selectedSupplier !== 'ALL' && p.supplierName !== selectedSupplier) {
          return false;
        }
        // Price filter
        if (p.wholesalePrice > maxPrice) {
          return false;
        }
        // MOQ filter
        if (moqFilter === 'LOW' && p.minOrderQuantity > 25) return false;
        if (moqFilter === 'MID' && (p.minOrderQuantity < 25 || p.minOrderQuantity > 75)) return false;
        if (moqFilter === 'HIGH' && p.minOrderQuantity < 75) return false;
        // In-stock
        if (inStockOnly && (p.availableStock <= 0 || p.status === 'OUT_OF_STOCK')) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.wholesalePrice - b.wholesalePrice;
        if (sortBy === 'price-desc') return b.wholesalePrice - a.wholesalePrice;
        if (sortBy === 'moq-asc') return a.minOrderQuantity - b.minOrderQuantity;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured default
      });
  }, [products, selectedCategoryId, searchQuery, selectedSupplier, maxPrice, moqFilter, inStockOnly, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.minOrderQuantity);
    setAddedAlert(product.id);
    setTimeout(() => setAddedAlert(null), 2500);
  };

  const clearAllFilters = () => {
    setSelectedCategoryId(null);
    setSearchQuery('');
    setSelectedSupplier('ALL');
    setMaxPrice(200);
    setMoqFilter('ALL');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const activeCategory = categories.find(c => c.id === selectedCategoryId);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-1">
              <span>Wholesale Market</span>
              <span className="mx-1.5">/</span>
              <span className="text-slate-900 font-semibold">
                {activeCategory ? activeCategory.name : 'All Product Lines'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeCategory ? activeCategory.name : 'Wholesale Procurement Catalog'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing <span className="font-bold text-slate-900 font-mono">{filteredProducts.length}</span> commercial bulk lots available for dispatch.
            </p>
          </div>

          {/* View Mode Toggle & Sort Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Grid vs Table View Switcher */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Procurement Table View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-900 font-bold focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured Lots</option>
                <option value="price-asc">Wholesale Price: Low &rarr; High</option>
                <option value="price-desc">Wholesale Price: High &rarr; Low</option>
                <option value="moq-asc">Lowest MOQ First</option>
                <option value="rating">Top Supplier Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter bar / Active filter badges */}
        {(selectedCategoryId !== null || searchQuery || selectedSupplier !== 'ALL' || inStockOnly || moqFilter !== 'ALL') && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 font-medium mr-1">Active Filters:</span>
            {activeCategory && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                {activeCategory.name}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategoryId(null)} />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold">
                "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {selectedSupplier !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold">
                Supplier: {selectedSupplier}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSupplier('ALL')} />
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-slate-500 hover:text-red-600 font-bold ml-auto text-[11px] cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Grid: Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                  Filter Catalog
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Category selector */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Category
                </h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategoryId(null)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCategoryId === null
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="font-mono text-slate-400">{products.length}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategoryId === cat.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="font-mono text-slate-400">
                        {products.filter(p => p.categoryId === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Unit Wholesale Price Slider */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Max Wholesale Price
                  </h4>
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    ${maxPrice.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>$5</span>
                  <span>$100</span>
                  <span>$200+</span>
                </div>
              </div>

              {/* Minimum Order Quantity (MOQ) Filter */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Minimum Order (MOQ)
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="moq"
                      checked={moqFilter === 'ALL'}
                      onChange={() => setMoqFilter('ALL')}
                      className="accent-blue-600"
                    />
                    <span>All MOQ levels</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="moq"
                      checked={moqFilter === 'LOW'}
                      onChange={() => setMoqFilter('LOW')}
                      className="accent-blue-600"
                    />
                    <span>Small Lots (&le; 25 units)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="moq"
                      checked={moqFilter === 'MID'}
                      onChange={() => setMoqFilter('MID')}
                      className="accent-blue-600"
                    />
                    <span>Medium Lots (26 &ndash; 75 units)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="moq"
                      checked={moqFilter === 'HIGH'}
                      onChange={() => setMoqFilter('HIGH')}
                      className="accent-blue-600"
                    />
                    <span>Container / Pallet Lots (75+ units)</span>
                  </label>
                </div>
              </div>

              {/* In-Stock Only Toggle */}
              <div className="pt-3 border-t border-slate-100">
                <label className="flex items-center justify-between cursor-pointer text-xs">
                  <span className="text-slate-700 font-medium">Ready to Ship (In Stock)</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-blue-600 w-4 h-4 rounded cursor-pointer"
                  />
                </label>
              </div>

              {/* Verified Supplier Filter */}
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Wholesaler / Factory
                </h4>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-blue-600 cursor-pointer"
                >
                  <option value="ALL">All Certified Wholesalers</option>
                  {suppliers.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>
          </aside>

          {/* Products List / Grid Container */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No products match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting the maximum price slider, clearing the search query, or selecting a different category.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const profitMargin = Math.round(((product.retailMSRP - product.wholesalePrice) / product.retailMSRP) * 100);
                  const isJustAdded = addedAlert === product.id;

                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Image Thumbnail */}
                      <div 
                        onClick={() => navigateToProduct(product.id)}
                        className="relative h-44 bg-slate-100 overflow-hidden cursor-pointer"
                      >
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className="px-2 py-0.5 rounded bg-slate-900/90 text-white font-mono text-[10px] font-bold">
                            MOQ: {product.minOrderQuantity} {product.unit}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-bold">
                            {profitMargin}% Margin
                          </span>
                        </div>

                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-1.5 py-0.5 rounded bg-white/95 text-slate-800 text-[10px] font-mono font-semibold border border-slate-200">
                            {product.sku}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                            <span className="font-semibold text-slate-600">{product.categoryName}</span>
                            <div className="flex items-center gap-1">
                              <span className="truncate max-w-[120px]">{product.supplierName}</span>
                              {product.supplierVerified && (
                                <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                              )}
                            </div>
                          </div>

                          <h3 
                            onClick={() => navigateToProduct(product.id)}
                            className="font-bold text-slate-900 text-sm line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Pricing & Stock */}
                        <div className="pt-2.5 border-t border-slate-100 flex items-baseline justify-between">
                          <div>
                            <div className="text-lg font-black text-slate-900 font-mono">
                              ${product.wholesalePrice.toFixed(2)}
                              <span className="text-xs text-slate-500 font-normal"> / {product.unit}</span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              MSRP: <span className="line-through">${product.retailMSRP.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-emerald-700 font-bold block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {product.availableStock} in stock
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                              Min Lot: ${(product.wholesalePrice * product.minOrderQuantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => navigateToProduct(product.id)}
                            className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors text-center cursor-pointer"
                          >
                            View Details
                          </button>
                          <button
                            onClick={(e) => handleQuickAdd(product, e)}
                            className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'border-slate-300 hover:border-blue-600 hover:text-blue-600 text-slate-700'
                            }`}
                            title="Add minimum order lot to cart"
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <Package className="w-3.5 h-3.5" />
                                <span>+ MOQ</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* PROCUREMENT DATA TABLE VIEW */
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                      <tr>
                        <th className="py-3 px-4">SKU / Product</th>
                        <th className="py-3 px-3">Supplier</th>
                        <th className="py-3 px-3">Wholesale Price</th>
                        <th className="py-3 px-3">MSRP Margin</th>
                        <th className="py-3 px-3">MOQ</th>
                        <th className="py-3 px-3">Available</th>
                        <th className="py-3 px-4 text-right">Procure Lot</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => {
                        const profitMargin = Math.round(((p.retailMSRP - p.wholesalePrice) / p.retailMSRP) * 100);
                        const isJustAdded = addedAlert === p.id;

                        return (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={p.imageUrl} 
                                  alt={p.name} 
                                  className="w-10 h-10 rounded-md object-cover border border-slate-200 shrink-0"
                                />
                                <div>
                                  <span className="font-mono text-[10px] text-slate-400 block">{p.sku}</span>
                                  <button
                                    onClick={() => navigateToProduct(p.id)}
                                    className="font-bold text-slate-900 hover:text-blue-600 transition-colors text-left cursor-pointer"
                                  >
                                    {p.name}
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-1 text-slate-700">
                                <span>{p.supplierName}</span>
                                {p.supplierVerified && (
                                  <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-mono font-bold text-slate-900 text-sm">
                                ${p.wholesalePrice.toFixed(2)}
                              </span>
                              <span className="text-slate-400 text-[10px]"> / {p.unit}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                                {profitMargin}% Margin
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-mono font-semibold text-slate-800">
                                {p.minOrderQuantity} {p.unit}
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-mono text-slate-700">
                                {p.availableStock}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={(e) => handleQuickAdd(p, e)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  isJustAdded
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-900 hover:bg-blue-600 text-white'
                                }`}
                              >
                                {isJustAdded ? 'Added!' : `+ MOQ (${p.minOrderQuantity})`}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};
