import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/layout/Header';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductList } from './components/products/ProductList';
import { useShop } from './context/ShopContext';

function ShopContent() {
  const { isAdmin } = useShop();

  return (
    <div className="body">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {isAdmin && <AdminDashboard />}
          <ProductList />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <ShopContent />
    </ShopProvider>
  );
}

export default App;