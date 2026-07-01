import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useUserStore from '../store/userStore';

function Header() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const user = useUserStore((state) => state.user);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#111827', color: 'white' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: 20, fontWeight: 700 }}>
        Mini Online Store
      </Link>
      <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart ({totalQuantity})</Link>
        <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
        <span style={{ color: '#d1d5db', fontSize: 14 }}>
          {user ? `Hello, ${user.name}` : 'Guest user'}
        </span>
      </nav>
    </header>
  );
}

export default Header;
