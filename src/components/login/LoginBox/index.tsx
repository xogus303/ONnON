import React, { useState, useEffect } from 'react';
import { BsBoxArrowInRight } from 'react-icons/bs';
import LoginLogo from '../LoginLogo'
import styleGuide from '../../../constants/styleGuide'


export default function(props){
    
    const { id, pwd, loginAuth, handleLoginId, handleLoginPwd, Login} = props;

    useEffect(()=>{
        
    }, [])

    return (
        <div className="LoginBox">
            <LoginLogo />
            <div className="LoginInputArea">
                <input
                    type="text"
                    className="LoginId LoginInput"
                    placeholder="example@onnon.com"
                    value={id}
                    name="id"
                    onChange={handleLoginId}
                    maxLength={30}
                />
                <input
                    type="password"
                    className="LoginPwd LoginInput"
                    placeholder="비밀번호 6자리"
                    value={pwd}
                    name="pwd"
                    onChange={handleLoginPwd}
                    maxLength={20}
                />
                <button
                    className="LoginSubmit"
                    onClick={Login}
                >
                    <BsBoxArrowInRight size={24} color={loginAuth? styleGuide.primary : '#aaa'} />
                </button>
            </div>
        </div>
    )
}