import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">🥬</span>
          <h1 className="font-display text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Join FreshCart for fresh deals</p>
        </div>
        <div className="bg-card rounded-2xl shadow-soft p-6 space-y-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Full Name</label>
            <input className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Email</label>
            <input type="email" className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} className="w-full bg-secondary rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" placeholder="••••••••" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-primary">
            Create Account <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
