import React from 'react';
import LoginLogo from '../LoginLogo';
import RegistForm from '../RegistForm';

export default (props) => {

    const { TogglePage, registId, registPwd, registAuth, registPwdCheck, registPwdAuth, handleRegistId, handleRegistPwd, handleRegistPwdCheck, _RegistMember, captcha, handleCaptcha, RID, RPWD, RPWDCHECK, CAPTCHA } = props;

    return (
        <div className="RegistMember">
            <LoginLogo />
            <RegistForm
                TogglePage={TogglePage}
                registId={registId}
                registPwd={registPwd}
                registPwdCheck={registPwdCheck}
                registAuth={registAuth}
                handleRegistId={handleRegistId}
                handleRegistPwd={handleRegistPwd}
                handleRegistPwdCheck={handleRegistPwdCheck}
                _RegistMember={_RegistMember}
                captcha={captcha}
                handleCaptcha={handleCaptcha}
                RID={RID}
                RPWD={RPWD}
                RPWDCHECK={RPWDCHECK}
                CAPTCHA={CAPTCHA}
            />
        </div>
    )
}