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
  const setUser = useUserStore((state) => state.setUser);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      setUser({ name: customerName || 'Guest' });

      const orderPayload = {
        customerName: customerName || 'Guest',
        items,
        totalAmount,
      };

      const response = await placeOrder(orderPayload);
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      storedOrders.unshift({ ...orderPayload, createdAt: new Date().toISOString() });
      localStorage.setItem('orders', JSON.stringify(storedOrders));

      dispatch(clearCart());
      setMessage(response.message || 'Order placed successfully');
      navigate('/orders');
    } catch (error) {
      setMessage(error.message || 'Unable to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: 700, margin: '0 auto' }}>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          placeholder="Your name"
          style={{ padding: '10px', borderRadius: 8, border: '1px solid #d1d5db' }}
        />
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
          <p><strong>Total:</strong> LKR {totalAmount}</p>
          <p><strong>Items:</strong> {items.length}</p>
        </div>
        <button type="submit" disabled={loading} style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 14px', borderRadius: 8, cursor: 'pointer' }}>
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

export default Payment;
