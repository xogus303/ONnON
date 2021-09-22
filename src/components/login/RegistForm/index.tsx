import React, { useEffect, memo } from 'react';
import FloatingLabelInput from 'react-floating-label-input';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'
import styleGuide from '../../../constants/styleGuide'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


export default (props) => {

    const { TogglePage, registId, registPwd, registAuth, registPwdCheck, handleRegistId, handleRegistPwd, handleRegistPwdCheck, _RegistMember, captcha, handleCaptcha, RID, RPWD, RPWDCHECK, CAPTCHA } = props;

    return (
        <div className="RegistForm">
            <div className="RegistInputArea">
                <FloatingLabelInput
                    className='RegistInput'
                    id="RegistID"
                    refs={RID}
                    type="text"
                    label="계정(이메일)"
                    maxLength={30}
                    value={registId}
                    onChange={handleRegistId}
                />
                <FloatingLabelInput
                    className='RegistInput'
                    id="RegistPWD"
                    refs={RPWD}
                    type="password"
                    label="비밀번호"
                    maxLength={20}
                    value={registPwd}
                    onChange={handleRegistPwd}
                />
                <FloatingLabelInput
                    className='RegistInput'
                    id="RegistPWDC"
                    refs={RPWDCHECK}
                    type="password"
                    label="비밀번호 확인"
                    maxLength={20}
                    value={registPwdCheck}
                    onChange={handleRegistPwdCheck}
                />
                <div className="captchaArea">
                    <LoadCanvasTemplate
                        reloadText="새로고침"
                    />
                    <input
                        type="text"
                        id="user_captcha_input"
                        ref={CAPTCHA}
                        value={captcha}
                        onChange={handleCaptcha}
                        maxLength={6}
                    />
                </div>
            </div>
            <div className="RgistBottom">
                <div className="RgistBottomSection RBL">
                    <button
                        onClick={() => TogglePage('login')}
                    >
                        <FaArrowCircleLeft size={30} color={styleGuide.cancel} />
                        <span>취소</span>
                    </button>
                </div>
                <div className="RgistBottomSection RBR">
                    <button
                        onClick={_RegistMember}
                    >
                        <span>계정을 생성합니다.</span>
                        <FaArrowCircleRight size={30} color={!registAuth ? '#aaa' : styleGuide.primary} />
                    </button>
                </div>
            </div>
        </div>
    )
}