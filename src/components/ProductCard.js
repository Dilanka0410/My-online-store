import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <img
        src={product.image || 'https://via.placeholder.com/220x140?text=Product'}
        alt={product.name}
        style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 10 }}
      />
      <div>
        <h3 style={{ margin: 0 }}>{product.name}</h3>
        <p style={{ margin: '6px 0 0', color: '#4b5563' }}>LKR {product.price}</p>
        <p style={{ margin: '8px 0 0', color: '#6b7280', fontSize: 14 }}>
          {product.description || 'A great product from our store.'}
        </p>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Link
          to={`/product/${product.id}`}
          style={{ display: 'block', textDecoration: 'none', color: '#2563eb', textAlign: 'center', padding: '8px 12px', border: '1px solid #2563eb', borderRadius: 8 }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
