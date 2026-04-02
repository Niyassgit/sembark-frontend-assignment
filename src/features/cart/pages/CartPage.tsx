import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const [showAddress, setShowAddress] = React.useState(false);
  const { cart, totalPrice, totalItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const shippingFee = 0;
  const taxRate = 0.02;
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + shippingFee + taxAmount;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 mx-auto max-w-6xl w-full">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#9CA3AF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-medium mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Go ahead and explore our products!
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-500 text-white font-medium rounded-full hover:bg-indigo-600 transition active:scale-95"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-7xl w-full px-6 mx-auto gap-8">
      <div className="flex-1">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-indigo-500">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
        </h1>

        <div className="grid grid-cols-[3fr_1fr_1fr] text-gray-500 text-sm font-medium pb-3 border-b border-gray-100">
          <p className="text-left uppercase tracking-wider">Product Details</p>
          <p className="text-center uppercase tracking-wider">Subtotal</p>
          <p className="text-center uppercase tracking-wider">Action</p>
        </div>

        <div className="divide-y divide-gray-100">
          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[3fr_1fr_1fr] text-gray-700 items-center py-6"
            >
              <div className="flex items-center md:gap-6 gap-3">
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="cursor-pointer w-20 h-20 md:w-28 md:h-28 flex-shrink-0 flex items-center justify-center border border-gray-100 rounded-xl overflow-hidden bg-gray-50"
                >
                  <img
                    className="max-w-full h-full object-contain p-2"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <p
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="font-semibold text-slate-800 hover:text-indigo-600 cursor-pointer transition-colors truncate"
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-indigo-500 font-medium uppercase tracking-tight">{item.category}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      <span className="px-3 py-1 text-sm font-bold min-w-[32px] text-center border-x border-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center font-bold text-slate-900">
              ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer mx-auto p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                title="Remove Item"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="group cursor-pointer flex items-center mt-10 gap-2 text-indigo-500 font-bold hover:text-indigo-600 transition-colors"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      <div className="md:w-[380px] w-full">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-10">
          <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
          <hr className="border-gray-100 my-5" />

          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Delivery Address</p>
            <div className="relative flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-gray-600 text-sm font-medium">No address found</p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 left-0 right-0 py-1 bg-white border border-gray-200 text-sm rounded-lg shadow-xl z-10 overflow-hidden">
                  <p
                    onClick={() => setShowAddress(false)}
                    className="text-gray-600 p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    New York, USA
                  </p>
                  <p
                    onClick={() => setShowAddress(false)}
                    className="text-indigo-600 font-bold text-center cursor-pointer p-3 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    Add new address
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-3">Payment Method</p>
            <select className="w-full border border-gray-200 bg-white px-3 py-2.5 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none cursor-pointer">
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-100" />

          <div className="text-gray-600 mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Price ({totalItems} items)</span>
              <span className="font-bold text-slate-900">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping Fee</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (2%)</span>
              <span className="font-bold text-slate-900">₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-xl font-extrabold text-slate-900">
                <span>Total Amount</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 mt-8 cursor-pointer bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
            Place Order
          </button>
          <p className="text-[10px] text-center text-gray-400 mt-4 px-4">
            By placing your order, you agree to our Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
