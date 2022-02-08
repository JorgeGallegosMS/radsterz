import { Link } from "react-router-dom";

const Navbar = ({ cart, user, logout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 sm:relative flex justify-between sm:justify-evenly p-4 mb-12 border-b-2 border-black bg-zinc-50">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/items/new">
        New
      </Link>
      <Link className="nav-link" to="/cart">
        Cart <span className="cart-length">({cart.length})</span>
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
