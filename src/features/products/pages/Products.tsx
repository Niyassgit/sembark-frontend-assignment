import { useState, useEffect } from "react";
import { getPrducts } from "../services/productService";
import { type Product } from "../types/product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getPrducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium my-10">
        {error}
      </div>
    );
  }

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <h1 className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins">
        Our Products
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Explore our curated collection of high-quality items.
      </p>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <img
                className="w-full group-hover:scale-105 duration-500 transition-all aspect-[3/4] object-contain p-4 mix-blend-multiply bg-white"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="mt-3 space-y-1">
              <h3 className="text-sm text-gray-700 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-lg font-bold text-gray-900">$ {product.price.toFixed(2)}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-yellow-500">★</span>
                <span className="text-xs text-gray-500">{product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Products;
