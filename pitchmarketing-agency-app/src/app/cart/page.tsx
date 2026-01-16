'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CartItem {
  product: string;
  qty: number;
  price: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('printShopCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (productName: string, newQty: number) => {
    if (newQty < 1) {
      removeItem(productName);
      return;
    }
    const updatedCart = cart.map(item =>
      item.product === productName ? { ...item, qty: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem('printShopCart', JSON.stringify(updatedCart));
  };

  const removeItem = (productName: string) => {
    const updatedCart = cart.filter(item => item.product !== productName);
    setCart(updatedCart);
    localStorage.setItem('printShopCart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('printShopCart');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = async () => {
    setLoading(true);
    
    // For now, redirect to contact with cart info
    const cartSummary = cart.map(item => 
      `${item.product} x${item.qty} = $${(item.price * item.qty).toFixed(2)}`
    ).join('\n');
    
    // Store cart in sessionStorage for contact form
    sessionStorage.setItem('cartCheckout', JSON.stringify({
      items: cart,
      total: cartTotal,
      summary: cartSummary
    }));
    
    window.location.href = '/contact?from=cart';
  };

  return (
    <main className="min-h-screen bg-pitch-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">
              Shopping <span className="text-pitch-gold">Cart</span>
            </h1>
            <Link 
              href="/print"
              className="text-pitch-gold hover:underline flex items-center gap-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="bg-pitch-dark rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">
                Add some awesome print products to get started!
              </p>
              <Link
                href="/print"
                className="inline-block px-8 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
              >
                Browse Print Shop
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="bg-pitch-dark rounded-xl overflow-hidden mb-6">
                <div className="divide-y divide-white/10">
                  {cart.map((item) => (
                    <div key={item.product} className="p-6 flex items-center gap-6">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.product}</h3>
                        <p className="text-gray-400 text-sm">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.product, item.qty - 1)}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.product, item.qty + 1)}
                          className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="w-32 text-right">
                        <p className="text-lg font-bold text-pitch-gold">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product)}
                        className="text-red-400 hover:text-red-300 transition"
                        title="Remove from cart"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="bg-pitch-dark rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Subtotal ({cartCount} items)</span>
                  <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-white/10 pt-4 mb-6">
                  <p className="text-sm text-gray-400 mb-2">
                    🚀 Free shipping on orders over $50
                  </p>
                  <p className="text-sm text-gray-400">
                    💯 100% Satisfaction Guaranteed
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-pitch-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Request Quote →'}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Click "Request Quote" to contact us about your order
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
