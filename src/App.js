import React from 'react';
import './App.css';
import './foundation.min.css'
import Loged from './components/loged'
import LoginComp from './components/login'
import RegisterComp from './components/register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  // const auth = useSelector(state => state.auth)

  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterComp} />
        <Route path="/login" component={LoginComp} />
        <Route path="/" component={Loged} />        
      </Switch>
    </Router>
  );
}

export default App;