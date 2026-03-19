import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

const orders = [
  { id: '#ORD-2847', customer: 'Sarah Johnson', email: 'sarah@email.com', items: ['Organic Avocados x2', 'Strawberries x1', 'Eggs x1', 'Bread x1'], total: 64.90, status: 'Delivered', date: '2026-03-19', address: '123 Green St, NY', timeline: ['Order placed', 'Confirmed', 'Shipped', 'Delivered'] },
  { id: '#ORD-2846', customer: 'Mike Chen', email: 'mike@email.com', items: ['Salmon x1', 'Spinach x2'], total: 32.50, status: 'Processing', date: '2026-03-19', address: '456 Oak Ave, CA', timeline: ['Order placed', 'Confirmed'] },
  { id: '#ORD-2845', customer: 'Emily Davis', email: 'emily@email.com', items: ['Mixed Berries x2', 'Almond Milk x3', 'Yogurt x3'], total: 128.00, status: 'Shipped', date: '2026-03-18', address: '789 Pine Rd, TX', timeline: ['Order placed', 'Confirmed', 'Shipped'] },
  { id: '#ORD-2844', customer: 'James Wilson', email: 'james@email.com', items: ['Bananas x5', 'Broccoli x2'], total: 18.99, status: 'Delivered', date: '2026-03-18', address: '321 Elm Blvd, FL', timeline: ['Order placed', 'Confirmed', 'Shipped', 'Delivered'] },
  { id: '#ORD-2843', customer: 'Lisa Brown', email: 'lisa@email.com', items: ['Granola Bars x3', 'Greek Yogurt x6'], total: 89.40, status: 'Cancelled', date: '2026-03-17', address: '654 Maple Dr, WA', timeline: ['Order placed', 'Cancelled'] },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-primary/10 text-primary',
  Processing: 'bg-blue-500/10 text-blue-500',
  Shipped: 'bg-accent/10 text-accent',
  Cancelled: 'bg-destructive/10 text-destructive',
};

const timelineSteps = ['Order placed', 'Confirmed', 'Shipped', 'Delivered'];

const Orders = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.length} total orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2.5 shadow-soft flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        <div className="flex gap-2">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${statusFilter === s ? 'bg-primary text-primary-foreground' : 'bg-card shadow-soft hover:bg-secondary'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl shadow-soft overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === o.id ? null : o.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <div>
                  <p className="font-semibold text-sm">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.date}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{o.customer}</p>
                  <p className="text-xs text-muted-foreground">{o.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-sm">${o.total.toFixed(2)}</span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor[o.status]}`}>{o.status}</span>
                {expanded === o.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>

            <AnimatePresence>
              {expanded === o.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="p-5 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Items</p>
                        <ul className="space-y-1">
                          {o.items.map((item, j) => (
                            <li key={j} className="text-sm flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Shipping Address</p>
                        <p className="text-sm">{o.address}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-3">Order Timeline</p>
                      <div className="flex items-center gap-0">
                        {timelineSteps.map((step, j) => {
                          const done = o.timeline.includes(step);
                          const isCancelled = o.status === 'Cancelled' && step !== 'Order placed' && step !== 'Cancelled';
                          return (
                            <div key={step} className="flex items-center flex-1">
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full ${done ? 'bg-primary' : 'bg-border'}`} />
                                <p className={`text-[10px] mt-1 text-center ${done ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{step}</p>
                              </div>
                              {j < timelineSteps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 ${done && o.timeline.includes(timelineSteps[j + 1]) ? 'bg-primary' : 'bg-border'}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
