import React, { useState } from 'react';
import { IoPlaySkipBack, IoPlay, IoPlaySkipForward, } from 'react-icons/io5'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { IoShuffleSharp, IoInfiniteOutline, IoReloadOutline, IoArrowUpCircleOutline, IoPersonCircleOutline } from 'react-icons/io5'
import { useHistory } from 'react-router-dom'
import './header.scss';
//Utils
import utils from '../../constants/utils'
// recoil
import { useRecoilState } from 'recoil';
import { loginState, LoginType } from '../../recoil/login'
import { userState, UserType } from '../../recoil/user'

// components
import HeaderMenu from './HeaderMenu';

const Header:React.FC = (props) => {

    const history = useHistory()

    const [LoginRecoil, setLoginRecoil] = useRecoilState<LoginType>(loginState)
    const [UserRecoil, setUserRecoil] = useRecoilState<UserType>(userState)

    const LoginCheck = (type) => {
        console.log('LoginRecoil.MEMBER', UserRecoil.MEMBER);
        if (UserRecoil.MEMBER == 0){
            setLoginRecoil(() => {
                return {
                    ...LoginRecoil,
                    show: true
                }
            })
            return false
        } else {
            if (type == 'upload'){
                // 업로드 페이지 이동
                history.push('upload')
            } else {

            }
        }
    }

    const Logout = () => {
        setUserRecoil(()=>{
            return {
                id: '',
                pwd: '',
                MEMBER: 0,
                NICK: '',
            }
        })
    }

    const RouteHeader = () => {
        if (!history.location.pathname.includes('/login')){
            return true
        } else {
            return false
        }
    }

    if (RouteHeader()){
        return (
            <div className="Background">
                <div className="LogoArea">
                    <img
                        className='HeaderLogo'
                        src="/images/logo.png"
                        alt="HeaderLogo"
                    />
                </div>
                <div className="CtrlArea">
                    <div className='CtrlBox'>
                        <button className='CtrlIcon HeaerIcon'>
                            <IoPlaySkipBack size={20} color={'black'}/>
                        </button>
                        <button className='CtrlIcon HeaerIcon'>
                            <IoPlay size={30} color={'black'}/>
                        </button>
                        <button className='CtrlIcon HeaerIcon'>
                            <IoPlaySkipForward size={20} color={'black'}/>
                        </button>
                    </div>
                    <div className='CtrlBox'>
                        <button className='CtrlIcon HeaerIcon'>
                            <IoShuffleSharp size={20} color={'black'}/>
                        </button>
                        <button className='CtrlIcon HeaerIcon'>
                            <IoInfiniteOutline size={20} color={'black'}/>
                            {/* <IoReloadOutline size={20} color={'black'}/> */}
                        </button>
                    </div>
                    <div className='CtrlBox CtrlBar'>
                        <div>00:00</div>
                        <div>---------</div>
                        <div>3:31</div>
                    </div>
                    <div className='CtrlBox'>
                        <button className='CtrlIcon HeaerIcon'>
                            <AiOutlineMenuUnfold size={20} color={'black'}/>
                        </button>
                    </div>
                </div>
                <HeaderMenu
                    LoginCheck={LoginCheck}
                    UserNick={UserRecoil.NICK}
                    Member={UserRecoil.MEMBER}
                    Logout={Logout}
                />
            </div>
        )
    } else {
        return null
    }
}

export default Header