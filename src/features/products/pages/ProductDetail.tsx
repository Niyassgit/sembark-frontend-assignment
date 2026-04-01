import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import { type Product } from "../types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!id) return;
        const data = await getProductById(id);
        setProduct(data);
        setThumbnail(data.images[0] || data.thumbnail);
      } catch (err) {
        setError("Failed to load product details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full gap-4">
        <p className="text-xl text-red-500 font-medium">{error || "Product not found"}</p>
        <Link to="/" className="px-6 py-2 bg-indigo-500 text-white rounded-full">
          Back to Products
        </Link>
      </div>
    );
  }

  // Calculate discounted price
  const discountPercentage = (product as any).discountPercentage || 0;
  const originalPrice = product.price / (1 - discountPercentage / 100);

  return (
    <div className="max-w-7xl w-full px-6 py-10 mx-auto">
      <nav className="text-sm font-medium mb-8">
        <Link to="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-500 capitalize">{product.category}</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-indigo-600 truncate max-w-[200px] inline-block align-bottom">{product.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4 lg:w-1/2">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px]">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setThumbnail(image)}
                className={`border-2 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all ${thumbnail === image ? "border-indigo-500 shadow-md" : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-20 h-20 md:w-24 md:h-24 object-cover" />
              </button>
            ))}
          </div>

          <div className="flex-grow border border-gray-200 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center aspect-square md:max-h-[500px]">
            <img
              src={thumbnail || ""}
              alt={product.title}
              className="w-full h-full object-contain p-6"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col lg:w-1/2">
          <div>
            <span className="text-indigo-500 text-sm font-bold tracking-widest uppercase">{product.category}</span>
            <h1 className="text-4xl font-bold text-slate-900 mt-2">{product.title}</h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-bold">
                {product.rating} <span className="ml-1 text-yellow-500">★</span>
              </div>
              <span className="text-gray-400 text-sm">{product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}</span>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
              {discountPercentage > 0 && (
                <span className="text-xl text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
              )}
              {discountPercentage > 0 && (
                <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded">-{discountPercentage}% Off</span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">(inclusive of all taxes)</p>
          </div>

          <div className="mt-8 border-t border-b border-gray-100 py-6">
            <p className="text-base font-bold text-slate-800 uppercase tracking-wide">About Product</p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center mt-10 gap-4">
            <button className="w-full py-4 px-8 rounded-full cursor-pointer font-bold bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100 transition-all active:scale-95">
              Add to Cart
            </button>
            <button className="w-full py-4 px-8 rounded-full cursor-pointer font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
              Buy Now
            </button>
          </div>

          <div className="mt-6 flex items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Free Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
