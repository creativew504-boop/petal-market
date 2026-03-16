import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';
import { formatCurrency } from '@/utils/formatCurrency';

const Wishlist = () => {
  const { items: wishlistIds, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold">Your wishlist is empty</h1>
        <p className="text-muted-foreground mt-2">Save items you love for later.</p>
        <Link to="/shop" className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold mt-6 hover:opacity-90 transition-opacity">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Wishlist ({wishlistProducts.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistProducts.map((product) => (
          <motion.div key={product.id} layout className="flex gap-4 p-4 bg-card rounded-2xl shadow-soft">
            <img src={product.image} alt={product.title} className="w-24 h-24 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <Link to={`/product/${product.id}`} className="font-display font-semibold text-sm hover:text-primary transition-colors line-clamp-1">
                {product.title}
              </Link>
              <p className="text-primary font-bold mt-1">{formatCurrency(product.price)}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => addItem(product)} className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 hover:opacity-90 transition-opacity">
                  <ShoppingCart className="h-3 w-3" /> Add
                </button>
                <button onClick={() => toggle(product.id)} className="bg-secondary text-muted-foreground px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 hover:text-destructive transition-colors">
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
