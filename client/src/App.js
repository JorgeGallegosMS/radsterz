import { useState, useEffect } from 'react'
import { Items, NewItem, EditItem, ShowItem } from './components'
import './App.css'
import axios from 'axios'
import ItemContext from './context/ItemContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

const getItems = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/items',
  })

  return data
}

const App = () => {
  const [items, setItems] = useState(null)
  useEffect(() => {
    getItems()
      .then(data => {
        setItems(data)
      })
  }, [])
  return items ? (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/items/new">New</Link>
      </nav>
      <ItemContext.Provider value={{ items, setItems }}>
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/items"/>}/>
          <Route path="/items" exact component={Items}/>
          <Route path="/items/new" component={NewItem} />
          <Route path="/items/:id" exact component={ShowItem}/>
          <Route path="/items/:id/edit" component={EditItem}/>
          <Route path="*" component={() => <>You have landed on a page that does not exist</>}/>
        </Switch>
      </ItemContext.Provider>
    </Router>
  ) : (
    <h1>Loading...</h1>
  )
}

export default App;
