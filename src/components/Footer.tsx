import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => (
  <footer className="bg-foreground text-background/80 mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🥬</span>
            <span className="font-display font-bold text-xl text-background">
              Fresh<span className="text-primary">Cart</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-background/60">
            Premium quality groceries delivered fresh to your doorstep. Experience the future of grocery shopping.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-background mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {['Shop', 'About Us', 'Contact', 'Blog'].map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase().replace(' ', '-')}`} className="text-sm hover:text-primary transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-background mb-4">Categories</h4>
          <ul className="space-y-2.5">
            {['Fresh Fruits', 'Vegetables', 'Dairy & Eggs', 'Bakery'].map((c) => (
              <li key={c}>
                <Link to="/shop" className="text-sm hover:text-primary transition-colors">{c}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-background mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary shrink-0" />123 Fresh Street, NY 10001</li>
            <li className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-primary shrink-0" />(555) 123-4567</li>
            <li className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-primary shrink-0" />hello@freshcart.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
        © 2026 FreshCart. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
