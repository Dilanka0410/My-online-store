import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1000, margin: '0 auto' }}>
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/">Continue shopping</Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: 12 }}>
            {items.map((item) => (
              <div key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <p style={{ margin: '4px 0 0' }}>LKR {item.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <div style={{ fontWeight: 700 }}>LKR {Number(item.price) * item.quantity}</div>
                <button onClick={() => dispatch(removeFromCart(item.id))} style={{ border: 'none', background: '#ef4444', color: 'white', padding: '8px 10px', borderRadius: 8, cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, borderTop: '1px solid #e5e7eb', paddingTop: 16 }}>
            <p><strong>Items:</strong> {totalQuantity}</p>
            <p><strong>Total:</strong> LKR {totalAmount}</p>
            <button onClick={() => navigate('/payment')} style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer' }}>
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
