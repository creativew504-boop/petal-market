import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { categories } from '@/data/products';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const wishlist = useWishlistStore((s) => s.items);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Deals', to: '/shop?filter=deals' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-soft' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-18 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🥬</span>
            <span className="font-display font-bold text-xl tracking-tight">
              Fresh<span className="text-primary">Cart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1"
            >
              Categories
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 rounded-lg hover:bg-secondary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/login" className="p-2.5 rounded-lg hover:bg-secondary transition-colors hidden sm:flex">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/wishlist" className="p-2.5 rounded-lg hover:bg-secondary transition-colors relative hidden sm:flex">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={toggleCart} className="p-2.5 rounded-lg hover:bg-secondary transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems() > 0 && (
                <motion.span
                  key={totalItems()}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {totalItems()}
                </motion.span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2.5 rounded-lg hover:bg-secondary transition-colors md:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="container mx-auto p-4">
                <input
                  type="text"
                  placeholder="Search for fresh groceries..."
                  autoFocus
                  className="w-full bg-secondary rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden md:block border-t border-border glass-strong"
            >
              <div className="container mx-auto p-6">
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.count} items</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-card z-30 p-6 pt-20 shadow-elevated"
            >
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.to ? 'text-primary bg-primary/10' : 'hover:bg-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">Categories</p>
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm hover:bg-secondary transition-colors"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t border-border mt-4 space-y-1">
                  <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-secondary transition-colors">
                    <User className="h-4 w-4" /> Account
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-secondary transition-colors">
                    <Heart className="h-4 w-4" /> Wishlist
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
