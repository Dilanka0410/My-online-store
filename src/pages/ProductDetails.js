import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../api/apiService';
import { addToCart } from '../store/cartSlice';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProducts();
        const products = Array.isArray(data) ? data : data?.products || data?.items || [];
        const selectedProduct = products.find((item) => String(item.id) === String(id));
        setProduct(selectedProduct || null);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    const confirmed = window.confirm('Are you sure you want to add this item to your cart?');

    if (!confirmed) return;

    dispatch(addToCart(product));
    alert('Item added to cart!');
  };

  if (!product) {
    return <div style={{ padding: 24 }}>Loading product...</div>;
  }

  return (
    <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
      <Link to="/">← Back to products</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
        <img
          src={product.image || 'https://via.placeholder.com/400x280?text=Product'}
          alt={product.name}
          style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 12 }}
        />
        <div>
          <h2>{product.name}</h2>
          <p style={{ color: '#4b5563' }}>{product.description || 'A great product from our store.'}</p>
          <p style={{ fontSize: 24, fontWeight: 700 }}>LKR {product.price}</p>
          <button
            onClick={handleAddToCart}
            style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
