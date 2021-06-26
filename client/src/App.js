import { Items, NewItem, EditItem, ShowItem } from './components'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/items/new">New</Link>
      </nav>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/items"/>}/>
        <Route path="/items" exact component={Items}/>
        <Route path="/items/new" component={NewItem} />
        <Route path="/items/:id" exact component={ShowItem}/>
        <Route path="/items/:id/edit" component={EditItem}/>
        <Route path="*" component={() => <>You have landed on a page that does not exist</>}/>
      </Switch>
    </Router>
  )
}

export default App;
