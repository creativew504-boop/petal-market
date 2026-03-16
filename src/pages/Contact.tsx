import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <h1 className="font-display text-3xl md:text-4xl font-bold">Get in Touch</h1>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto">Have a question or feedback? We'd love to hear from you.</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div className="space-y-6">
        {[
          { icon: MapPin, label: 'Address', value: '123 Fresh Street, New York, NY 10001' },
          { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
          { icon: Mail, label: 'Email', value: 'hello@freshcart.com' },
        ].map((item) => (
          <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-4 p-4 bg-card rounded-xl shadow-soft">
            <div className="bg-primary/10 p-3 rounded-xl shrink-0">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-card rounded-2xl shadow-soft p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Name', 'Email'].map((l) => (
            <div key={l}>
              <label className="text-sm text-muted-foreground block mb-1.5">{l}</label>
              <input className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
            </div>
          ))}
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1.5">Subject</label>
          <input className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-1.5">Message</label>
          <textarea rows={5} className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none" />
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Send className="h-4 w-4" /> Send Message
        </button>
      </motion.div>
    </div>
  </div>
);

export default Contact;
