import { Items, NewItem, EditItem, ShowItem, Cart } from './components'
import './App.css'
import { useContext } from 'react'
import { CartContext } from './context/CartContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

const App = () => {
  const [cart, setCart] = useContext(CartContext)
  const resetCart = () => {
    localStorage.removeItem('cart')
    setCart([])
  }
  return (
    <Router>
      <nav className="navbar">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/items/new">New</Link>
        <Link className="nav-link" to="/cart">Cart{' '}<span className="cart-length">{cart.length}</span></Link>
        <button className="nav-link" onClick={resetCart}>Remove Local Storgae Cart</button>
      </nav>
      <div className="main">
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/items"/>}/>
          <Route path="/items" exact component={Items}/>
          <Route path="/items/new" component={NewItem}/>
          <Route path="/items/:id" exact component={ShowItem}/>
          <Route path="/items/:id/edit" component={EditItem}/>
          <Route path="/cart" component={Cart}/>
          <Route path="*" render={() => <>You have landed on a page that does not exist</>}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
