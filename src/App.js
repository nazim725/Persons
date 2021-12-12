
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddPerson from './Components/AddPerson/AddPerson';
import Navigation from './Components/Navigation/Navigation';
import ShowPerson from './Components/ShowPerson/ShowPerson'
import UpdatePerson from './Components/UpdatePerson/UpdatePerson'

function App() {


  return (
    <div className="App">
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route path='/addPerson'>
            <AddPerson></AddPerson>

          </Route>
          <Route exact path='/'>
            <ShowPerson></ShowPerson>

          </Route>
          <Route path='/showPerson'>
            <ShowPerson></ShowPerson>

          </Route>
          <Route path='/updatePerson/:personId'>
            <UpdatePerson></UpdatePerson>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
