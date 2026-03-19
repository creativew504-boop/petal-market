import { motion } from 'framer-motion';
import { Plus, Edit, GripVertical } from 'lucide-react';
import { categories } from '@/data/products';

const Categories = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground text-sm mt-1">{categories.length} categories</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all group cursor-grab"
          >
            <div className="relative h-32 overflow-hidden">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-sm font-bold text-primary-foreground">{cat.name}</p>
                <p className="text-xs text-primary-foreground/70">{cat.count} items</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg bg-card/80 backdrop-blur-sm hover:bg-card">
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-lg bg-card/80 backdrop-blur-sm hover:bg-card">
                  <GripVertical className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="p-3 flex items-center gap-2">
              <span className="text-xl">{cat.icon}</span>
              <span className="text-xs text-muted-foreground">{cat.count} products</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
