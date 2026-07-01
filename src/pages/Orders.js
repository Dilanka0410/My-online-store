import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../api/apiService';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchOrders();
        if (mounted) setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
      <h2>Your Orders</h2>
      {loading ? (
        <p>Loading orders…</p>
      ) : error ? (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <Link to="/">Go shopping</Link>
        </div>
      ) : orders.length === 0 ? (
        <div>
          <p>No orders yet.</p>
          <Link to="/">Go shopping</Link>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '8px' }}>#</th>
                <th style={{ padding: '8px' }}>Date</th>
                <th style={{ padding: '8px' }}>Customer</th>
                <th style={{ padding: '8px' }}>Items</th>
                <th style={{ padding: '8px' }}>Total (LKR)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.id || idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>{idx + 1}</td>
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>{new Date(order.orderDate || order.createdAt || Date.now()).toLocaleString()}</td>
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>{order.customerName || order.customer?.fullName || order.customerEmail}</td>
                  <td style={{ padding: '8px' }}>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {(order.items || []).map((it, i) => (
                        <li key={it.productId || i}>{it.productName || it.name || `Product ${it.productId || i}`} × {it.quantity} — LKR {it.totalPrice}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: '8px', verticalAlign: 'top', fontWeight: 700 }}>{order.totalPrice ?? order.totalAmount ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
