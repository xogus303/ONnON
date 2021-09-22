import React, {useEffect, useState, useRef} from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// recoil
import { useRecoilState } from 'recoil';
import { loginState, LoginType } from '../../recoil/login'
// component
import LoginBox from './LoginBox'
import LoginMenu from './LoginMenu'
import RegistMember from './RegistMember'
// css
import './styles.scss';

import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const Login:React.FC = () => {

    const [LoginRecoil, setLoginRecoil] = useRecoilState<LoginType>(loginState)

    
    const [cookies, setCookie, removeCookie] = useCookies(['saveId']);
    const [id, setId] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [loginAuth, setLoginAuth] = useState<boolean>(false);
    const [saveMode, setSaveMode] = useState<boolean>(false);

    const [registId, setRegistId] = useState<string>('');
    const [registPwd, setRegistPwd] = useState<string>('');
    const [registPwdCheck, setRegistPwdCheck] = useState<string>('');
    const [registAuth, setRegistAuth] = useState<boolean>(false);
    const [captcha, setCaptcha] = useState<string>('');

    const CloseLogin = () => {
        setLoginRecoil(()=>{
            return {
                ...LoginRecoil,
                show: false,
                mode: 'login',
            }
        })
        setId('')
        setPwd('')
        setLoginAuth(false)
        setSaveMode(false)
    }

    const handleLoginId = (e) => {
        const { value } = e.target;
        setId(value)
        LoginAuthCheck(value, pwd)
    }
    const handleLoginPwd = (e) => {
        const { value } = e.target;
        setPwd(value)
        LoginAuthCheck(id, value)
    }
    const LoginAuthCheck = (id, pwd) => {
        if (emailRegex.test(id) && pwd.length > 5){
            console.log('true', );
            setLoginAuth(true)
        } else {
            console.log('false', );
            setLoginAuth(false)
        }
    }

    const handelSaveId = () => {
        setSaveMode(!saveMode)
    }

    const Login = () => {
        if (loginAuth){
            if (saveMode){
                let tomorrow = new Date()
                tomorrow.setDate(new Date().getDate() + 1)
                setCookie('saveId', id, {expires: tomorrow})
    
            } else {
                removeCookie('saveId')
            }
        } else {
            alert('로그인 형식 불충분')
        }
    }

    const TogglePage = (string) => {
        setLoginRecoil({ ...LoginRecoil, mode: string })
    }

    const handleRegistId = (e) => {
        const { value } = e.target
        setRegistId(value)
    }
    const handleRegistPwd = (e) => {
        const { value } = e.target
        setRegistPwd(value)
    }
    const handleRegistPwdCheck = (e) => {
        const { value } = e.target
        setRegistPwdCheck(value)
    }
    const handleCaptcha = (e) => {
        const { value } = e.target
        setCaptcha(value)
        if (registId !== '' &&
            registPwd !== '' &&
            registPwdCheck !== '' &&
            value !== ''
        ){
            setRegistAuth(true)
        } else {
            setRegistAuth(false)
        }
    }
    const _RegistMember = () => {
        const checkNumber = registPwd.search(/[0-9]/g);
        const checkEnglish = registPwd.search(/[a-z]/gi);

        if (registId == ''){
            alert('생성할 계정을 입력해 주세요.')
            RID.current?.focus()
            return;
        } else if (!emailRegex.test(registId)){
            alert('계정형식이 올바르지 않습니다. 정확한 이메일 형식을 입력해 주세요.')
            RID.current?.focus()
            return;
        } else if (registPwd !== registPwdCheck){
            alert('비밀번호가 동일하지 않습니다.')
            RPWDCHECK.current?.focus()
            return;
        } else if (checkNumber < 0 || checkEnglish < 0){
            alert('비밀번호는 숫자와 영문자를 혼합하여 6~15자리로 입력해 주세요.')
            RPWD.current?.focus()
            return;
        } else if (!validateCaptcha(captcha)){
            alert('올바른 보안문자를 입력해 주세요.')
            CAPTCHA.current?.focus()
        } else {
            alert('가입 가능')
        }
    }

    useEffect(()=>{
        if (cookies.saveId){
            setId(cookies.saveId)
            setSaveMode(true)
        }

        loadCaptchaEnginge(6, 'black', 'white');
    }, [LoginRecoil.show, LoginRecoil.mode])

    const ID = useRef<HTMLInputElement>()
    const PWD = useRef<HTMLInputElement>()
    const RID = useRef<HTMLInputElement>()
    const RPWD = useRef<HTMLInputElement>()
    const RPWDCHECK = useRef<HTMLInputElement>()
    const CAPTCHA = useRef<HTMLInputElement>()

    if (!LoginRecoil.show){
        return null
    } else {
        return (
            <div className="Login">
                <div className="loginInner">
                    {LoginRecoil.mode == 'login' ? (
                        <>
                        <LoginBox
                            id={id}
                            pwd={pwd}
                            loginAuth={loginAuth}
                            handleLoginId={handleLoginId}
                            handleLoginPwd={handleLoginPwd}
                            Login={Login}
                        />
                        <LoginMenu
                            TogglePage={TogglePage}
                            handelSaveId={handelSaveId}
                            saveMode={saveMode}
                        />
                        </>
                    ) : (
                        <RegistMember
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
                    )}
                </div>
                <div
                    className="loginBg"
                    onClick={CloseLogin}
                />
            </div>
        )
    }
}

export default Login