import {
  itemComponents,
  checkoutComponents,
  userComponents,
  NavBar,
} from "./components";
// import "./App.css";
import { useCart, CARTACTIONS } from "./context/CartContext";
import { useUser } from "./context/UserContext";
import { Switch, Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [cart, dispatch] = useCart();
  const [user, setUser] = useUser();

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      dispatch({
        type: CARTACTIONS.SET,
        cart: JSON.parse(localCart),
      });
    }
  }, []);

  const logout = async () => {
    await axios.post("/api/users/logout");
    setUser("");
    <Redirect to="/" />;
  };

  console.log(user ? JSON.stringify(user, null, 2) : "No user found");

  return (
    <div className="bg-zinc-50 h-screen">
      <div className="container mx-auto">
        <NavBar cart={cart} user={user} logout={logout} />
        {user && (
          <div>
            Logged in as <strong>{user.name ? user.name : user.email}</strong>
          </div>
        )}
        <div className="mt-20">
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/items" />} />
            <Route path="/register" component={userComponents.Register} />
            <Route path="/login" component={userComponents.Login} />
            <Route path="/items" exact component={itemComponents.Items} />
            <Route path="/items/new" component={itemComponents.NewItem} />
            <Route
              path="/items/:id"
              exact
              component={itemComponents.ShowItem}
            />
            <Route path="/items/:id/edit" component={itemComponents.EditItem} />
            <Route path="/cart" component={checkoutComponents.Cart} />
            <Route
              path="/payment/success"
              component={checkoutComponents.Receipt}
            />
            <Route
              path="*"
              render={() => <>You have landed on a page that does not exist</>}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
