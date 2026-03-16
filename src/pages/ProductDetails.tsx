import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Minus, Plus, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatCurrency } from '@/utils/formatCurrency';
import ProductCard from '@/components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, has } = useWishlistStore();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-primary mt-4 inline-block hover:underline">Back to shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isWished = has(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-3xl overflow-hidden bg-card"
        >
          <img src={product.image} alt={product.title} className="w-full h-[400px] md:h-[500px] object-cover" />
          {product.discount && (
            <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-xl">
              -{product.discount}% OFF
            </span>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">{product.title}</h1>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="font-display text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-2 text-sm">
            <span className={product.stock > 10 ? 'text-primary' : 'text-accent'}>
              {product.stock > 10 ? `In Stock (${product.stock})` : `Only ${product.stock} left!`}
            </span>
            <span className="text-muted-foreground"> · per {product.unit}</span>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center bg-secondary rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-muted rounded-l-xl transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted rounded-r-xl transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-primary"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </motion.button>
            <button
              onClick={() => toggle(product.id)}
              className={`p-3.5 rounded-xl border transition-colors ${isWished ? 'border-destructive text-destructive bg-destructive/5' : 'border-border hover:border-destructive hover:text-destructive'}`}
            >
              <Heart className={`h-5 w-5 ${isWished ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-border">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'Orders $50+' },
              { icon: Shield, label: 'Quality Guarantee', desc: '100% fresh' },
              { icon: RotateCcw, label: 'Easy Returns', desc: '30-day policy' },
            ].map((b) => (
              <div key={b.label} className="text-center">
                <b.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">{b.label}</p>
                <p className="text-[10px] text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-border">
          {(['description', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="py-6">
          {activeTab === 'description' ? (
            <div className="max-w-2xl text-muted-foreground leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>Our {product.title.toLowerCase()} are carefully selected to ensure the highest quality. Each item is inspected for freshness and flavor before it reaches your door.</p>
            </div>
          ) : (
            <div className="max-w-2xl">
              <div className="space-y-4">
                {[
                  { name: 'Sarah M.', rating: 5, text: 'Absolutely fresh and delicious! Will order again.', date: '2 days ago' },
                  { name: 'James R.', rating: 4, text: 'Great quality. Delivered fast. Slightly smaller than expected.', date: '1 week ago' },
                ].map((review, i) => (
                  <div key={i} className="bg-secondary/50 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {review.name[0]}
                        </div>
                        <span className="font-medium text-sm">{review.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
