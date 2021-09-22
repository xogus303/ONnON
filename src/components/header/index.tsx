import React from 'react';
import { IoPlaySkipBack, IoPlay, IoPlaySkipForward, } from 'react-icons/io5'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import { IoShuffleSharp, IoInfiniteOutline, IoReloadOutline, IoArrowUpCircleOutline, IoPersonCircleOutline } from 'react-icons/io5'
import history from 'history/browser';
import './header.scss';
//Utils
import utils from '../../constants/utils'
// recoil
import { useRecoilState } from 'recoil';
import { loginState, LoginType } from '../../recoil/login'

type PROPS = {
    MEMBER_SEQ: number,
}

const Header:React.FC<PROPS> = ({MEMBER_SEQ}) => {

    const [LoginRecoil, setLoginRecoil] = useRecoilState<LoginType>(loginState)

    const LoginCheck = () => {
        if (LoginRecoil.MEMBER == 0){
            setLoginRecoil(() => {
                return {
                    ...LoginRecoil,
                    show: true
                }
            })
            return false
        } else {
            return true
        }
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
                <div className="MenuArea">
                    <button
                        className='MenuIcon HeaerIcon'
                        onClick={LoginCheck}
                    >
                        <IoArrowUpCircleOutline  size={20} color={'black'}/>
                    </button>
                    <button
                        className='MenuIcon HeaerIcon'
                        onClick={LoginCheck}
                    >
                        <IoPersonCircleOutline  size={20} color={'black'}/>
                    </button>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Header