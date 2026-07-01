import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <img
        src={product.image || 'https://via.placeholder.com/220x140?text=Product'}
        alt={product.name}
        style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }}
      />
      <div>
        <h3 style={{ margin: 0 }}>{product.name}</h3>
        <p style={{ margin: '6px 0 0', color: '#4b5563' }}>LKR {product.price}</p>
        <p style={{ margin: '8px 0 0', color: '#6b7280', fontSize: 14 }}>
          {product.description || 'A great product from our store.'}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#2563eb', flex: 1, textAlign: 'center', padding: '8px 12px', border: '1px solid #2563eb', borderRadius: 8 }}>
          View Details
        </Link>
        <button
          onClick={() => dispatch(addToCart(product))}
          style={{ flex: 1, border: 'none', borderRadius: 8, background: '#111827', color: 'white', cursor: 'pointer' }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
