import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { type Category } from "../types/product";

interface ProductFilterProps {
  categories: Category[];
}

const ProductFilter = ({ categories }: ProductFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current filters from URL
  const title = searchParams.get("title") || "";
  const selectedCategories = useMemo(
    () => searchParams.getAll("categoryId").map(Number),
    [searchParams]
  );
  const priceMin = searchParams.get("price_min") || "";
  const priceMax = searchParams.get("price_max") || "";

  const updateFilter = (key: string, value: string | string[] | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === "") {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((v) => newParams.append(key, v));
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleCategoryToggle = (id: number) => {
    const current = new Set(selectedCategories);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    updateFilter(
      "categoryId",
      Array.from(current).map(String)
    );
  };

  return (
    <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Filters</h2>
          <button
            onClick={() => setSearchParams(new URLSearchParams())}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Search</label>
          <input
            type="text"
            placeholder="Product name..."
            value={title}
            onChange={(e) => updateFilter("title", e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-3">Categories</label>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCategoryToggle(cat.id)}
                    className="appearance-none h-5 w-5 rounded-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                  />
                  {selectedCategories.includes(cat.id) && (
                    <svg className="absolute w-3 h-3 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-3">Price Range (₹)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => updateFilter("price_min", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <span className="text-slate-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => updateFilter("price_max", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <button
          onClick={() => setSearchParams(new URLSearchParams())}
          className="w-full py-3 px-4 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
        >
          Clear All
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </aside>
  );
};

export default ProductFilter;
