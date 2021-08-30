import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/user'
import { UserType } from '../recoil/user'
import { setUserState } from '../recoil/user'

type MainProps = {
    match: Object;
    location: Object;
    history: Object;
}

function Main ({ match, location, history }: MainProps) {
    
    const [user, setUser] = useRecoilState<UserType>(userState)
    const setUserState = useSetRecoilState<UserType>(userState)
    console.log('user111', user);

    const selectUser = () => {
        console.log('user222', user);
        setUserState((oldUser) => {
            return {
                id: '555',
                pwd: oldUser.pwd+'333'
            }
        })
        console.log('user333', user);
    }


    return (
        <>
        <div onClick={selectUser}>메인!</div>
        <Link to={'/Login'}><div>로그인</div></Link>
        </>
    )
}

export default Main