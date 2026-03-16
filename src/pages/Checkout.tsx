import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatCurrency';

const Checkout = () => {
  const { items, totalPrice } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <span className="text-6xl block mb-4">🎉</span>
          <h1 className="font-display text-3xl font-bold">Order Placed!</h1>
          <p className="text-muted-foreground mt-2">Your groceries are on their way. Thank you for shopping with FreshCart!</p>
          <Link to="/" className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold mt-6 hover:opacity-90 transition-opacity">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-card rounded-2xl shadow-soft p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['First Name', 'Last Name', 'Email', 'Phone'].map((label) => (
                <div key={label}>
                  <label className="text-sm text-muted-foreground block mb-1.5">{label}</label>
                  <input className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-sm text-muted-foreground block mb-1.5">Address</label>
                <input className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
              </div>
              {['City', 'Zip Code'].map((label) => (
                <div key={label}>
                  <label className="text-sm text-muted-foreground block mb-1.5">{label}</label>
                  <input className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-2xl shadow-soft p-6">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Payment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">Card Number</label>
                <input placeholder="•••• •••• •••• ••••" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Expiry</label>
                  <input placeholder="MM/YY" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">CVV</label>
                  <input placeholder="•••" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-2xl shadow-soft p-6 h-fit sticky top-24">
          <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.image} alt={item.product.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.product.title}</p>
                  <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(totalPrice())}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-primary font-medium">Free</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-lg">
              <span>Total</span><span>{formatCurrency(totalPrice())}</span>
            </div>
          </div>
          <button
            onClick={() => setSubmitted(true)}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-6 glow-primary"
          >
            <Lock className="h-4 w-4" /> Place Order
          </button>
          <p className="text-[11px] text-muted-foreground text-center mt-3">
            Your payment info is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
