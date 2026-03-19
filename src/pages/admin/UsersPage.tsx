import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, User, MoreHorizontal } from 'lucide-react';

const users = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', role: 'user', orders: 12, spent: '$548.90', joined: '2025-11-05', avatar: 'SJ' },
  { id: '2', name: 'Mike Chen', email: 'mike@email.com', role: 'user', orders: 8, spent: '$312.00', joined: '2025-12-12', avatar: 'MC' },
  { id: '3', name: 'Emily Davis', email: 'emily@email.com', role: 'admin', orders: 24, spent: '$1,280.00', joined: '2025-08-20', avatar: 'ED' },
  { id: '4', name: 'James Wilson', email: 'james@email.com', role: 'user', orders: 3, spent: '$89.99', joined: '2026-01-15', avatar: 'JW' },
  { id: '5', name: 'Lisa Brown', email: 'lisa@email.com', role: 'user', orders: 15, spent: '$720.50', joined: '2025-10-30', avatar: 'LB' },
  { id: '6', name: 'Admin User', email: 'admin@freshcart.com', role: 'admin', orders: 0, spent: '$0', joined: '2025-06-01', avatar: 'AU' },
];

const UsersPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">{users.length} registered users</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2.5 shadow-soft flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        <div className="flex gap-2">
          {['all', 'user', 'admin'].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${roleFilter === r ? 'bg-primary text-primary-foreground' : 'bg-card shadow-soft hover:bg-secondary'}`}
            >
              {r === 'all' ? 'All' : r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {u.avatar}
                </div>
                <div>
                  <p className="font-medium text-sm">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold ${
                u.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-secondary text-muted-foreground'
              }`}>
                {u.role === 'admin' && <Shield className="h-3 w-3" />}
                {u.role}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Orders</p>
                <p className="text-sm font-semibold">{u.orders}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Spent</p>
                <p className="text-sm font-semibold">{u.spent}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="text-sm font-semibold">{new Date(u.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
