// Items
import Items from "./items/Items";
import NewItem from "./items/NewItem";
import EditItem from "./items/EditItem";
import ShowItem from "./items/ShowItem";

// Checkout
import Cart from "./cart/Cart";
import Receipt from "./cart/Receipt";

// Users
import Login from "./users/Login";
import Register from "./users/Register";

// Navbar
import Navbar from "./navbar/Navbar";

export const itemComponents = {
  Items,
  NewItem,
  EditItem,
  ShowItem,
};

export const checkoutComponents = {
  Cart,
  Receipt,
};

export const userComponents = {
  Login,
  Register,
};

export const NavBar = Navbar;
