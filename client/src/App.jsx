import { Items, NewItem, EditItem, ShowItem, Cart, Receipt } from './components'
import './App.css'
import { useCart, ACTIONS } from './context/CartContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import { useEffect } from 'react'

const App = () => {
  const [cart, dispatch] = useCart()

  useEffect(() => {
    const localCart = localStorage.getItem('cart')
    if (localCart) {
      dispatch({
        type: ACTIONS.SET, 
        cart: JSON.parse(localCart)
      })
    }
  }, [])
  
  return (
    <Router>
      <nav className="navbar">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/items/new">New</Link>
        <Link className="nav-link" to="/cart">Cart{' '}<span className="cart-length">{cart.length}</span></Link>
      </nav>
      <div className="main">
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/items"/>}/>
          <Route path="/items" exact component={Items}/>
          <Route path="/items/new" component={NewItem}/>
          <Route path="/items/:id" exact component={ShowItem}/>
          <Route path="/items/:id/edit" component={EditItem}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/payment/success" component={Receipt}/>
          <Route path="*" render={() => <>You have landed on a page that does not exist</>}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
