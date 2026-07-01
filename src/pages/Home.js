import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/apiService';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        const normalizedProducts = Array.isArray(data)
          ? data
          : data?.products || data?.items || [];
        setProducts(normalizedProducts);
      } catch (err) {
        setError(err.message || 'Unable to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Welcome to Mini Online Store</h1>
      <p style={{ color: '#6b7280', marginTop: 0, marginBottom: 24 }}>
        Browse products and add your favorites to the cart.
      </p>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;