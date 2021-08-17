import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Main, Login, NotFound } from './pages'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
