import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Package, Eye } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$48,290', change: '+12.5%', up: true, icon: DollarSign, color: 'bg-primary/10 text-primary' },
  { label: 'Orders', value: '1,428', change: '+8.2%', up: true, icon: ShoppingCart, color: 'bg-accent/10 text-accent' },
  { label: 'Customers', value: '3,642', change: '+22.4%', up: true, icon: Users, color: 'bg-blue-500/10 text-blue-500' },
  { label: 'Conversion', value: '3.2%', change: '-0.4%', up: false, icon: TrendingUp, color: 'bg-purple-500/10 text-purple-500' },
];

const recentOrders = [
  { id: '#ORD-2847', customer: 'Sarah Johnson', items: 5, total: '$64.90', status: 'Delivered', date: 'Today' },
  { id: '#ORD-2846', customer: 'Mike Chen', items: 3, total: '$32.50', status: 'Processing', date: 'Today' },
  { id: '#ORD-2845', customer: 'Emily Davis', items: 8, total: '$128.00', status: 'Shipped', date: 'Yesterday' },
  { id: '#ORD-2844', customer: 'James Wilson', items: 2, total: '$18.99', status: 'Delivered', date: 'Yesterday' },
  { id: '#ORD-2843', customer: 'Lisa Brown', items: 6, total: '$89.40', status: 'Cancelled', date: '2 days ago' },
];

const topProducts = [
  { name: 'Organic Avocados', sales: 342, revenue: '$1,706', image: '🥑' },
  { name: 'Fresh Strawberries', sales: 287, revenue: '$1,001', image: '🍓' },
  { name: 'Free-Range Eggs', sales: 256, revenue: '$1,534', image: '🥚' },
  { name: 'Sourdough Bread', sales: 198, revenue: '$1,285', image: '🍞' },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-primary/10 text-primary',
  Processing: 'bg-blue-500/10 text-blue-500',
  Shipped: 'bg-accent/10 text-accent',
  Cancelled: 'bg-destructive/10 text-destructive',
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  // Simple chart bars data
  const chartData = [40, 65, 50, 80, 55, 90, 72, 85, 60, 95, 70, 88];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${s.up ? 'text-primary' : 'text-destructive'}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-soft"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold">Revenue Overview</h3>
              <p className="text-xs text-muted-foreground">Monthly revenue trend</p>
            </div>
            <select className="bg-secondary rounded-lg px-3 py-1.5 text-xs outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="flex items-end gap-2 h-48">
            {chartData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  className={`w-full rounded-t-lg ${i === chartData.length - 2 ? 'bg-primary' : 'bg-primary/20'} hover:bg-primary/60 transition-colors cursor-pointer`}
                />
                <span className="text-[10px] text-muted-foreground">{months[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h3 className="font-display font-semibold mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{p.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sales} sales</p>
                </div>
                <p className="text-sm font-semibold text-primary">{p.revenue}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl shadow-soft overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="font-display font-semibold">Recent Orders</h3>
            <p className="text-xs text-muted-foreground">Latest customer orders</p>
          </div>
          <button className="text-primary text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Order</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Customer</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">Items</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Total</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <motion.tr
                  key={o.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="border-t border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-3.5 font-medium">{o.id}</td>
                  <td className="px-6 py-3.5">{o.customer}</td>
                  <td className="px-6 py-3.5 hidden sm:table-cell">{o.items}</td>
                  <td className="px-6 py-3.5 font-semibold">{o.total}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground hidden md:table-cell">{o.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
