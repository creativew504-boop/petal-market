import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer />
      <main className="flex-1 pt-16 md:pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
