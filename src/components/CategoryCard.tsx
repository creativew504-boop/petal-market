import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Category } from '@/data/products';

const CategoryCard = ({ category, index = 0 }: { category: Category; index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, duration: 0.4 }}
  >
    <Link
      to={`/shop?category=${category.id}`}
      className="group flex flex-col items-center text-center p-5 rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300"
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="text-3xl mb-2">{category.icon}</span>
      <h3 className="font-display font-semibold text-sm group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">{category.count} items</p>
    </Link>
  </motion.div>
);

export default CategoryCard;
