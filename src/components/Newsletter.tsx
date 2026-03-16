import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-secondary rounded-3xl p-8 md:p-14 text-center"
      >
        <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
        <h2 className="font-display text-2xl md:text-3xl font-bold">Stay Fresh, Stay Updated</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Get exclusive deals, new arrivals, and seasonal recipes delivered to your inbox.
        </p>
        {submitted ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="mt-6 text-primary font-semibold">
            ✓ You're subscribed! Check your inbox.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-card rounded-xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow border border-border"
              required
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shrink-0"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default Newsletter;
