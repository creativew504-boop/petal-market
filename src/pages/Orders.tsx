import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const orders = [
  { id: '#ORD-2847', date: 'Mar 19, 2026', items: 5, total: '$64.90', status: 'Delivered' },
  { id: '#ORD-2842', date: 'Mar 15, 2026', items: 3, total: '$32.50', status: 'Shipped' },
  { id: '#ORD-2838', date: 'Mar 10, 2026', items: 8, total: '$128.00', status: 'Delivered' },
  { id: '#ORD-2830', date: 'Mar 5, 2026', items: 2, total: '$18.99', status: 'Delivered' },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-primary/10 text-primary',
  Shipped: 'bg-accent/10 text-accent',
  Processing: 'bg-blue-500/10 text-blue-500',
};

const OrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-3">
        {orders.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl shadow-soft p-5 flex items-center justify-between hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{o.id}</p>
                <p className="text-xs text-muted-foreground">{o.date} · {o.items} items</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-sm">{o.total}</p>
                <span className={`inline-block px-2 py-0.5 rounded-lg text-[11px] font-semibold ${statusColor[o.status]}`}>{o.status}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
