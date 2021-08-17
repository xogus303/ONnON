import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { MyPage2, MyPage3 } from './index'

type LoginProps = {
    match: { path: string };
    location: Object;
    history: Object;
}

function Login({ match, location, history }: LoginProps){
    console.log('match', match);
    console.log('location', location);
    console.log('history', history);
    return (
        <Router>
            <div>Login</div>
            <Route exact path={match.path} component={MyPage2} />
            <Route exact path={`${match.path}/:id`} component={MyPage3} />
        </Router>
    )
}

export default Login