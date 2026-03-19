import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUpRight } from 'lucide-react';

const revenueData = [
  { month: 'Jan', value: 4200 }, { month: 'Feb', value: 5800 },
  { month: 'Mar', value: 4900 }, { month: 'Apr', value: 6800 },
  { month: 'May', value: 5500 }, { month: 'Jun', value: 7200 },
  { month: 'Jul', value: 6100 }, { month: 'Aug', value: 8500 },
  { month: 'Sep', value: 7400 }, { month: 'Oct', value: 9200 },
  { month: 'Nov', value: 8100 }, { month: 'Dec', value: 10500 },
];

const categoryData = [
  { name: 'Fruits', value: 32, color: 'bg-primary' },
  { name: 'Vegetables', value: 24, color: 'bg-accent' },
  { name: 'Dairy', value: 18, color: 'bg-blue-500' },
  { name: 'Bakery', value: 12, color: 'bg-purple-500' },
  { name: 'Meat', value: 8, color: 'bg-pink-500' },
  { name: 'Other', value: 6, color: 'bg-muted-foreground' },
];

const userGrowth = [120, 180, 240, 310, 420, 530, 650, 780, 920, 1100, 1350, 1600];

const maxRevenue = Math.max(...revenueData.map(d => d.value));
const maxUsers = Math.max(...userGrowth);

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Detailed performance insights</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: '$10,500', change: '+18%', icon: DollarSign },
          { label: 'New Users', value: '250', change: '+32%', icon: Users },
          { label: 'Avg Order Value', value: '$42.80', change: '+5%', icon: ShoppingCart },
          { label: 'Growth Rate', value: '22.4%', change: '+3%', icon: TrendingUp },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl p-5 shadow-soft"
          >
            <div className="flex items-center justify-between mb-2">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-semibold text-primary flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" />{s.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-soft"
        >
          <h3 className="font-display font-semibold mb-1">Revenue Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-6">Year-to-date monthly revenue</p>
          <div className="flex items-end gap-2 h-52">
            {revenueData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxRevenue) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                  className="w-full rounded-t-lg bg-primary/20 hover:bg-primary/50 transition-colors cursor-pointer relative group"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${(d.value / 1000).toFixed(1)}k
                  </span>
                </motion.div>
                <span className="text-[10px] text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h3 className="font-display font-semibold mb-1">Sales by Category</h3>
          <p className="text-xs text-muted-foreground mb-6">Product category breakdown</p>
          <div className="space-y-3">
            {categoryData.map((c, i) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.value}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className={`h-full rounded-full ${c.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User growth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl p-6 shadow-soft"
      >
        <h3 className="font-display font-semibold mb-1">User Growth</h3>
        <p className="text-xs text-muted-foreground mb-6">Cumulative registered users</p>
        <div className="flex items-end gap-3 h-40">
          {userGrowth.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(val / maxUsers) * 100}%` }}
                transition={{ delay: 0.6 + i * 0.04, duration: 0.5 }}
                className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary hover:from-primary/60 hover:to-primary transition-colors cursor-pointer"
              />
              <span className="text-[10px] text-muted-foreground">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
