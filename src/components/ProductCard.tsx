import { motion } from 'framer-motion';
import { Star, Heart, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatCurrency } from '@/utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();
  const isWished = has(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={product.image}
            alt={product.title}
            className="w-full h-48 sm:h-52 object-cover"
            loading="lazy"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && (
            <span className="bg-accent text-accent-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg">
              -{product.discount}%
            </span>
          )}
          {product.badge && (
            <span className="bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="bg-foreground text-background text-[11px] font-bold px-2.5 py-1 rounded-lg">
              New
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => toggle(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWished ? 'bg-destructive/10 text-destructive' : 'bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWished ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground capitalize mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-sm leading-tight hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product)}
            className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5">per {product.unit}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
