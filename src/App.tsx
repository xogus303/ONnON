import React, {useState} from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Main, Upload, NotFound } from './pages'
import history from 'history/browser';
// component
import Header from './components/header'
import AlertModal from './components/AlertModal'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModal from './components/login'
import './config/_variables.scss'
// recoil
import { loginState, LoginType } from './recoil/login'

const App: React.FC = (props) => {

  console.log('app history', history);

  return (
    <React.Fragment>
      <RecoilRoot>
        <Router>
          <AlertModal />
          <Header />
          <LoginModal />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/upload" component={Upload} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </RecoilRoot>
    </React.Fragment>
  );
}

export default App;
