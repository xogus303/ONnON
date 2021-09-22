import React, {useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Main, NotFound } from './pages'
import history from 'history/browser';
// component
import Header from './components/header'
import Modal from './components/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModal from './components/login'

// recoil
import { loginState, LoginType } from './recoil/login'

const App: React.FC = (props) => {

  console.log('app history', history);

  return (
    <React.Fragment>
      <RecoilRoot>
        <Router>
          <Header MEMBER_SEQ={1} />
          <LoginModal />
          <Modal />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </RecoilRoot>
    </React.Fragment>
  );
}

export default App;
