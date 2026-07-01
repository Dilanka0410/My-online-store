import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useUserStore from '../store/userStore';

function Header() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user, welcomeMessage, login, logout } = useUserStore((state) => ({
    user: state.user,
    welcomeMessage: state.welcomeMessage,
    login: state.login,
    logout: state.logout,
  }));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (!fullName.trim() && !email.trim()) return;

    login({ fullName: fullName.trim(), email: email.trim() });
    setFullName('');
    setEmail('');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#111827', color: 'white', gap: 16, flexWrap: 'wrap' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 700 }}>
        Mini Online Store
      </Link>

      <nav style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart ({totalQuantity})</Link>
        <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>

        {user ? (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ color: '#d1d5db', fontSize: 14 }}>{welcomeMessage}</span>
            <button onClick={logout} style={{ border: 'none', borderRadius: 6, padding: '6px 10px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Full name"
              style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              type="email"
              style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
            />
            <button type="submit" style={{ border: 'none', borderRadius: 6, padding: '8px 10px', cursor: 'pointer' }}>
              Login
            </button>
          </form>
        )}
      </nav>
    </header>
  );
}

export default Header;
