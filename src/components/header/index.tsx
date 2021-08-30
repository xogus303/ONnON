import React from 'react';
import '../../styles/header.scss';

type PROPS = {
    MEMBER_SEQ: number,
}

const Header:React.FC<PROPS> = ({MEMBER_SEQ}) => {
    return (
        <div className="Background">
            <div className="LogoArea">
                <img
                    className='HeaderLogo'
                    src="/images/logo.png"
                    alt="HeaderLogo"
                />
            </div>
            <div className="CtrlArea"></div>
            <div className="MenuArea"></div>
        </div>
    )
}

export default Header