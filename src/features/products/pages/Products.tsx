import { useState, useEffect, useMemo } from "react";
import { getProducts, getCategories } from "../services/productService";
import { type Product, type Category } from "../types/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const title = searchParams.get("title") || "";
  const selectedCategories = useMemo(() => searchParams.getAll("categoryId").map(Number), [searchParams]);
  const priceMin = searchParams.get("price_min") || "";
  const priceMax = searchParams.get("price_max") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedProducts: Product[] = [];

        if (selectedCategories.length > 0) {
          const requests = selectedCategories.map(cid =>
            getProducts({
              categoryId: cid,
              title: title || undefined,
              price_min: priceMin ? Number(priceMin) : undefined,
              price_max: priceMax ? Number(priceMax) : undefined
            })
          );
          const results = await Promise.all(requests);
          fetchedProducts = results.flat();
          fetchedProducts = Array.from(new Map(fetchedProducts.map(item => [item.id, item])).values());
        } else {
          fetchedProducts = await getProducts({
            title: title || undefined,
            price_min: priceMin ? Number(priceMin) : undefined,
            price_max: priceMax ? Number(priceMax) : undefined
          });
        }

        if (sort === "price-asc") {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
          fetchedProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [title, selectedCategories, priceMin, priceMax, sort]);

  const updateFilter = (key: string, value: string | string[] | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === "") {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(v => newParams.append(key, v));
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <ProductFilter categories={categories} />

      {/* Product Grid */}
      <main className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Collection</h1>
            <p className="text-slate-500 mt-1">{products.length} products found</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-500">Sort By:</label>
            <select
              value={sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 px-4 cursor-pointer outline-none hover:border-slate-300 transition-all"
            >
              <option value="">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-slate-500 animate-pulse">Refreshing collection...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-500 font-medium">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 font-bold underline">Try again</button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-slate-500 text-xl font-medium">No products match your filters</p>
            <button
              onClick={() => setSearchParams(new URLSearchParams())}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-slate-100 p-3 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-slate-50 aspect-square">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={product.images[0]}
                    alt={product.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x600?text=No+Image";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    {product.category.name}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-slate-800 font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <p className="text-2xl font-black text-slate-900">
                      ₹ {product.price.toLocaleString()}
                    </p>
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background-color: #f8fafc;
                }

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
    </div>
  );
};

export default Products;
