import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, Edit, ShoppingCart, Heart, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl shadow-soft p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
            J
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-display text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground text-sm">Member since March 2026</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <Edit className="h-4 w-4" /> Edit Profile
          </button>
        </div>

        {/* Info */}
        <div className="bg-card rounded-2xl shadow-soft p-6 space-y-4">
          <h2 className="font-display font-semibold">Account Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Mail, label: 'Email', value: 'john@example.com' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: MapPin, label: 'Address', value: '123 Green St, New York, NY' },
              { icon: User, label: 'Member Type', value: 'Premium' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                <item.icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: ShoppingCart, label: 'My Orders', desc: '12 orders', to: '/orders' },
            { icon: Heart, label: 'Wishlist', desc: '5 items', to: '/wishlist' },
            { icon: LogOut, label: 'Sign Out', desc: 'Logout', to: '/login' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-card rounded-2xl shadow-soft p-5 hover:shadow-elevated transition-shadow flex items-center gap-3"
            >
              <div className="bg-primary/10 p-2.5 rounded-xl">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
