import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/utils/formatCurrency';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Looks like you haven't added any items yet.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold mt-6 hover:opacity-90 transition-opacity">
          Start Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              className="flex gap-4 p-4 bg-card rounded-2xl shadow-soft"
            >
              <img src={item.product.image} alt={item.product.title} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="font-display font-semibold hover:text-primary transition-colors">
                  {item.product.title}
                </Link>
                <p className="text-sm text-muted-foreground">{item.product.unit}</p>
                <p className="text-primary font-bold mt-1">{formatCurrency(item.product.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 rounded-lg bg-secondary hover:bg-muted transition-colors">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 rounded-lg bg-secondary hover:bg-muted transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                  <X className="h-4 w-4" />
                </button>
                <span className="font-display font-bold">{formatCurrency(item.product.price * item.quantity)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-2xl shadow-soft p-6 h-fit sticky top-24">
          <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(totalPrice())}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-primary font-medium">Free</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-lg">
              <span>Total</span><span>{formatCurrency(totalPrice())}</span>
            </div>
          </div>
          <Link to="/checkout" className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-6 glow-primary">
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
