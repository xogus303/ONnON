import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { MyPage2, MyPage3 } from './index'
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/user'
import { UserType } from '../recoil/user'

type LoginProps = {
    match: { path: string };
    location: Object;
    history: Object;
}

function Login({ match, location, history }: LoginProps){
    
    const [user2, setUser2] = useRecoilState<UserType>(userState)
    console.log('user_login', user2);
    return (
        <Router>
            <div>Login</div>
            <Route exact path={match.path} component={MyPage2} />
            <Route exact path={`${match.path}/:id`} component={MyPage3} />
        </Router>
    )
}

export default Login