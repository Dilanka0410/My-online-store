import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/apiService';
import { clearCart } from '../store/cartSlice';
import useUserStore from '../store/userStore';

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCompleteOrder = async () => {
    if (!items || items.length === 0) {
      setMessage('Your cart is empty.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const orderDate = new Date().toISOString();

      // Build payload: include array of line items with required fields
      const orderPayload = {
        customerName: user?.fullName || 'Guest',
        customerEmail: user?.email || '',
        orderDate,
        items: items.map((it) => ({
          productId: it.id,
          quantity: it.quantity || 1,
          totalPrice: (it.price || 0) * (it.quantity || 1),
        })),
        totalPrice: totalAmount,
      };

      const result = await placeOrder(orderPayload);

      if (result && result.status === 201) {
        setMessage('Order placed successfully. Redirecting to orders...');
        dispatch(clearCart());
        setTimeout(() => navigate('/orders'), 800);
      } else {
        setMessage('Unexpected response from server.');
      }
    } catch (err) {
      setMessage(err?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
      <h2>Payment</h2>

      <section style={{ marginBottom: 16 }}>
        <h3>Customer</h3>
        <p><strong>Name:</strong> {user?.fullName || 'Guest'}</p>
        <p><strong>Email:</strong> {user?.email || '—'}</p>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h3>Cart</h3>
        {items && items.length > 0 ? (
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.map((it) => (
                <li key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                    <div style={{ color: '#6b7280' }}>{it.quantity} × LKR {it.price}</div>
                  </div>
                  <div style={{ fontWeight: 600 }}>LKR {(it.price || 0) * (it.quantity || 1)}</div>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontWeight: 700 }}>
              <div>Total</div>
              <div>LKR {totalAmount}</div>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={handleCompleteOrder}
          disabled={loading || !items || items.length === 0}
          style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 14px', borderRadius: 8, cursor: 'pointer' }}
        >
          {loading ? 'Completing order...' : 'Complete Order'}
        </button>
      </div>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

export default Payment;
