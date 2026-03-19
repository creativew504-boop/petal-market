import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, X, Upload } from 'lucide-react';
import { products as allProducts } from '@/data/products';
import { formatCurrency } from '@/utils/formatCurrency';

const Products = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{allProducts.length} products in store</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add Product
        </motion.button>
      </div>

      <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2.5 shadow-soft max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Product</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3">Price</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Stock</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-6 py-3 hidden md:table-cell">Rating</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-sm">{p.title}</p>
                        <p className="text-xs text-muted-foreground sm:hidden capitalize">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 capitalize text-muted-foreground hidden sm:table-cell">{p.category}</td>
                  <td className="px-6 py-3 font-semibold">{formatCurrency(p.price)}</td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-medium ${
                      p.stock > 50 ? 'bg-primary/10 text-primary' : p.stock > 10 ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">⭐ {p.rating}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg bg-card rounded-2xl shadow-elevated z-50 p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-bold">Add New Product</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Product Name</label>
                  <input className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Price</label>
                    <input type="number" className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Stock</label>
                    <input type="number" className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <select className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none">
                    <option>Fruits</option><option>Vegetables</option><option>Dairy</option><option>Bakery</option><option>Meat</option><option>Beverages</option><option>Snacks</option><option>Organic</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Description</label>
                  <textarea rows={3} className="w-full mt-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                  Create Product
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
