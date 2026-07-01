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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'linear-gradient(135deg, #111827, #2563eb)', color: 'white', borderRadius: 16, padding: 24 }}>
          <h2 style={{ margin: '0 0 8px' }}>Big Summer Sale</h2>
          <p style={{ margin: 0 }}>Enjoy exclusive discounts on trending products this season.</p>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', borderRadius: 16, padding: 24 }}>
          <h2 style={{ margin: '0 0 8px' }}>Weekend Deals</h2>
          <p style={{ margin: 0 }}>Limited-time offers available for a short weekend window.</p>
        </div>
      </div>

      <h1 style={{ marginBottom: 8 }}>Welcome to Mini Online Store</h1>
      <p style={{ color: '#6b7280', marginTop: 0, marginBottom: 24 }}>
        Browse products and add your favorites to the cart.
      </p>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;