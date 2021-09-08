import React from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Main, Login, NotFound } from './pages'
import Header from './components/header'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <RecoilRoot>
        <Router>
          <Header MEMBER_SEQ={1} />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </RecoilRoot>
    </React.Fragment>
  );
}

export default App;
