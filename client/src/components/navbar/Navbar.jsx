import { Link } from "react-router-dom";

const Navbar = ({ cart, user, logout }) => {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/items/new">
        New
      </Link>
      <Link className="nav-link" to="/cart">
        Cart <span className="cart-length">{cart.length}</span>
      </Link>
      {user ? (
        <Link onClick={logout} to="/login">
          Logout
        </Link>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
