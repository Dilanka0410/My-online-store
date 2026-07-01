import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div>
          <p>No orders yet.</p>
          <Link to="/">Go shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {orders.map((order, index) => (
            <div key={`${order.customerName}-${index}`} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>Order #{index + 1}</h3>
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Total:</strong> LKR {order.totalAmount}</p>
              <ul>
                {order.items?.map((item) => (
                  <li key={item.id}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
