import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  { id: '1', title: '10 Tips for Choosing the Freshest Produce', excerpt: 'Learn how to pick the ripest, most flavorful fruits and vegetables every time you shop.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80', date: 'Mar 15, 2026', readTime: '5 min', category: 'Tips' },
  { id: '2', title: 'The Benefits of Going Organic', excerpt: 'Discover why organic groceries are better for your health and the environment.', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80', date: 'Mar 10, 2026', readTime: '7 min', category: 'Health' },
  { id: '3', title: 'Quick & Healthy Weeknight Meals', excerpt: 'Five delicious recipes you can make in under 30 minutes with fresh ingredients.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', date: 'Mar 5, 2026', readTime: '6 min', category: 'Recipes' },
  { id: '4', title: 'How to Store Groceries for Maximum Freshness', excerpt: 'Expert tips on storing fruits, vegetables, and dairy to minimize waste.', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&q=80', date: 'Feb 28, 2026', readTime: '4 min', category: 'Tips' },
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Fresh Reads</h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Tips, recipes, and stories from the FreshCart kitchen</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg">
                {post.category}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <span>{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
              <h2 className="font-display font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <button className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:underline">
                Read More <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
