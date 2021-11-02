import React, { useState } from 'react';
import { IoShuffleSharp, IoInfiniteOutline, IoReloadOutline, IoArrowUpCircleOutline, IoPersonCircleOutline } from 'react-icons/io5'

// 계정 아이콘 클릭 시 계정정보 표시 툴팁
export default ({ LoginCheck, UserNick, Member, Logout }) => {

    const [ShowMemberTool ,setShowMemberTool] = useState<boolean>(false)

    const ToggleMouseHover = () => {
        if (Member !== 0){
            setShowMemberTool(!ShowMemberTool)
        }
    }

    return (
        <div className="MenuArea">
            <button
                className='MenuIcon HeaerIcon'
                onClick={() => LoginCheck('upload')}
            >
                <IoArrowUpCircleOutline  size={20} color={'black'}/>
            </button>
            <button
                className='MenuIcon HeaerIcon'
                onClick={() => LoginCheck('member')}
                onMouseEnter={ToggleMouseHover}
                onMouseLeave={ToggleMouseHover}
            >
                {Member == 0 ? (
                    <IoPersonCircleOutline  size={20} color={'black'}/>
                    ) : (
                    <IoPersonCircleOutline  size={20} color={'orange'}/>
                )}
                {ShowMemberTool == true && (
                    <div className="MemberTool">
                        <div className="NickArea">
                            {UserNick}
                        </div>
                        <div className="GrayLine"></div>
                        <button
                            className="LogoutArea"
                            onClick={() => {
                                setShowMemberTool(false)
                                Logout()
                            }}
                        >
                            로그아웃
                        </button>
                    </div>
                )}
            </button>
        </div>
    )
}
