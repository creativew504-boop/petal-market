import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, Clock, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { products, categories } from '@/data/products';
import CountdownTimer from '@/components/CountdownTimer';
import Newsletter from '@/components/Newsletter';

const features = [
  { icon: Truck, label: 'Free Delivery', desc: 'On orders over $50' },
  { icon: Shield, label: 'Secure Payment', desc: '100% protected' },
  { icon: Clock, label: 'Fast Delivery', desc: 'Within 60 minutes' },
  { icon: Leaf, label: '100% Organic', desc: 'Certified products' },
];

const Home = () => {
  const trending = products.filter((p) => p.isTrending || p.rating >= 4.7).slice(0, 4);
  const deals = products.filter((p) => p.discount).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-16 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-[10%] text-7xl opacity-20 select-none"
          >🍎</motion.div>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-20 left-[5%] text-6xl opacity-15 select-none"
          >🥑</motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-40 left-[15%] text-5xl opacity-10 select-none"
          >🍊</motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-10 right-[35%] text-5xl opacity-10 select-none"
          >🥦</motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <Leaf className="h-4 w-4" /> Free delivery on your first order
              </span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Fresh groceries
                <br />
                <span className="text-gradient-primary">delivered</span> to
                <br />
                your door
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
                Premium organic produce, dairy, and essentials. Handpicked quality, delivered in 60 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-base hover:opacity-90 transition-opacity glow-primary"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/shop?category=organic"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-2xl font-semibold text-base hover:bg-secondary/80 transition-colors"
                >
                  Explore Organic
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3"
              >
                <div className="bg-primary/10 p-2.5 rounded-xl">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">Browse our fresh selection</p>
          </div>
          <Link to="/shop" className="text-primary text-sm font-medium hover:underline hidden sm:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Trending Now</h2>
            <p className="text-muted-foreground mt-1">Most popular picks this week</p>
          </div>
          <Link to="/shop" className="text-primary text-sm font-medium hover:underline hidden sm:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trending.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-emerald-400 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
        >
          <div className="relative z-10">
            <span className="bg-background/20 text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
              Limited Time Offer
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-4">
              Get 30% Off Organic
            </h2>
            <p className="text-primary-foreground/80 mt-2 max-w-md">
              Fresh organic produce at unbeatable prices. Use code FRESH30 at checkout.
            </p>
            <Link
              to="/shop?category=organic"
              className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-xl font-semibold mt-6 hover:bg-background/90 transition-colors"
            >
              Shop Organic <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="text-8xl md:text-9xl select-none opacity-50">🌿</div>
        </motion.div>
      </section>

      {/* Deals + Countdown */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Deals of the Day</h2>
            <p className="text-muted-foreground mt-1">Don't miss these fresh deals</p>
          </div>
          <CountdownTimer />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {deals.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground mt-1">Just landed in store</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
