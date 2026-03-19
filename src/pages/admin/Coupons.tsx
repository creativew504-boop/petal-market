import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Tag, Trash2, Edit, X, ToggleLeft, ToggleRight, Ticket } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  used: number;
  limit: number;
  active: boolean;
  expiry: string;
}

const initialCoupons: Coupon[] = [
  { id: '1', code: 'FRESH30', type: 'percentage', value: 30, minOrder: 50, used: 247, limit: 500, active: true, expiry: '2026-04-30' },
  { id: '2', code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 0, used: 892, limit: 1000, active: true, expiry: '2026-12-31' },
  { id: '3', code: 'SAVE5', type: 'fixed', value: 5, minOrder: 25, used: 156, limit: 300, active: false, expiry: '2026-03-01' },
  { id: '4', code: 'ORGANIC20', type: 'percentage', value: 20, minOrder: 40, used: 63, limit: 200, active: true, expiry: '2026-06-15' },
];

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleActive = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Coupons</h1>
          <p className="text-muted-foreground text-sm mt-1">{coupons.length} active coupons</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Create Coupon
        </motion.button>
      </div>

      {coupons.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl shadow-soft p-12 text-center"
        >
          <div className="text-6xl mb-4">🎟️</div>
          <h3 className="font-display text-lg font-semibold">No coupons yet</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Create your first coupon to boost sales</p>
          <button onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm">
            Create Coupon
          </button>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {coupons.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-card rounded-2xl p-5 shadow-soft hover:shadow-elevated transition-all ${!c.active ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2.5 rounded-xl">
                    <Ticket className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono font-bold text-lg">{c.code}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.type === 'percentage' ? `${c.value}% off` : `$${c.value} off`}
                      {c.minOrder > 0 && ` · Min $${c.minOrder}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleActive(c.id)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    {c.active ? (
                      <ToggleRight className="h-5 w-5 text-primary" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <button onClick={() => deleteCoupon(c.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Usage bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Usage</span>
                  <span className="font-medium">{c.used}/{c.limit}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.used / c.limit) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Expires: {new Date(c.expiry).toLocaleDateString()}</span>
                <span className={`px-2 py-0.5 rounded-lg font-medium ${c.active ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                  {c.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50" onClick={() => setModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-card rounded-2xl shadow-elevated z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-bold">Create Coupon</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-secondary"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Coupon Code</label>
                  <input className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 font-mono uppercase" placeholder="e.g. SUMMER25" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Type</label>
                    <select className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none">
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Value</label>
                    <input type="number" className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="25" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Min Order ($)</label>
                    <input type="number" className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Usage Limit</label>
                    <input type="number" className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" placeholder="500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Expiry Date</label>
                  <input type="date" className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                  Create Coupon
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Coupons;
