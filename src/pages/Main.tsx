import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/user'
import { UserType } from '../recoil/user'
import { setUserState } from '../recoil/user'

//component
import { TypeRoulette, MusicList } from '../components/main'

type MainProps = {
    match: Object;
    location: Object;
    history: Object;
}

function Main ({ match, location, history }: MainProps) {
    
    const [user, setUser] = useRecoilState<UserType>(userState)
    const setUserState = useSetRecoilState<UserType>(userState)

    const selectUser = () => {
        setUserState((oldUser) => {
            return {
                id: '555',
                pwd: oldUser.pwd+'333'
            }
        })
    }


    return (
        <div className='Wrap'>
            <TypeRoulette />
            <MusicList />
        </div>
    )
}

export default Main