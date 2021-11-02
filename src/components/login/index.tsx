import React, {useEffect, useState, useRef} from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// recoil
import { useRecoilState } from 'recoil';
import { loginState, LoginType } from '../../recoil/login'
import { userState, UserType } from '../../recoil/user'
import { ModalType, modalState } from '../../recoil/modal'
// component
import LoginBox from './LoginBox'
import LoginMenu from './LoginMenu'
import RegistMember from './RegistMember'
// css
import './styles.scss';

import api from '../../pages/api'

import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const Login:React.FC = () => {

    const [ModalState, setModalState] = useRecoilState<ModalType>(modalState)
    const [LoginRecoil, setLoginRecoil] = useRecoilState<LoginType>(loginState)
    const [UserRecoil, setUserRecoil] = useRecoilState<UserType>(userState)

    
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
            setLoginAuth(true)
        } else {
            setLoginAuth(false)
        }
    }

    const handelSaveId = () => {
        setSaveMode(!saveMode)
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
    const _RegistMember = async () => {

        const checkNumber = registPwd.search(/[0-9]/g);
        const checkEnglish = registPwd.search(/[a-z]/gi);

        if (registId == ''){
            setModalState({ ...ModalState, show: true, title: '계정생성', text: '생성할 계정을 입력해 주세요.', okCallback: () => RID.current?.focus()})
            return;
        } else if (!emailRegex.test(registId)){
            setModalState({ ...ModalState, show: true, title: '계정생성', text: '계정형식이 올바르지 않습니다. 정확한 이메일 형식을 입력해 주세요.', okCallback: () => RID.current?.focus()})
            return;
        } else if (registPwd !== registPwdCheck){
            setModalState({ ...ModalState, show: true, title: '계정생성', text: '비밀번호가 동일하지 않습니다.', okCallback: () => RPWDCHECK.current?.focus()})
            return;
        } else if (checkNumber < 0 || checkEnglish < 0){
            setModalState({ ...ModalState, show: true, title: '계정생성', text: '비밀번호는 숫자와 영문자를 혼합하여 6~15자리로 입력해 주세요.', okCallback: () => RPWD.current?.focus()})
            return;
        } else if (!validateCaptcha(captcha)){
            setModalState({ ...ModalState, show: true, title: '계정생성', text: '올바른 보안문자를 입력해 주세요.', okCallback: () => CAPTCHA.current?.focus()})
            return;
        } else {
            try {
                const {data} = await api.SignUp({
                    id: registId,
                    pwd: registPwd
                })
                console.log('api.SignUp_data', data);
                if (data.result == 'SUCCESS'){
                    TogglePage('login')
                    setId('')
                    setPwd('')
                    setRegistId('')
                    setRegistPwd('')
                    setRegistPwdCheck('')
                    setRegistAuth(false)
                    setCaptcha('')
                    setLoginAuth(false)
                    setSaveMode(false)
                    setModalState({ ...ModalState, show: true, title: '', text: data.message, })
                } else if (data.result == 'EXSIST') {
                    RID.current?.focus()
                    setModalState({ ...ModalState, show: true, title: '', text: data.message, })
                } else {
                    RID.current?.focus()
                }
            } catch (err){
                console.log('err', err);
            }
        }
    }

    const ENTER_SIGNIN = (e) => {
        if (e.key == 'Enter'){
            signIn()
        }
    }

    const signIn = async() => {
        console.log('id', id);
        console.log('pwd', pwd);
        console.log('loginAuth', loginAuth);
        // 아이디, 비밀번호 형식체크 완료
        if (loginAuth){

            // 아이디 저장
            if (saveMode){
                let tomorrow = new Date()
                tomorrow.setDate(new Date().getDate() + 1)
                setCookie('saveId', id, {expires: tomorrow})
    
            } else {
                removeCookie('saveId')
            }

            const {data} = await api.SignIn({id, pwd})
            console.log('SignIn_data', data);
            setUserRecoil(() => {
                return {
                    ...UserRecoil,
                    MEMBER: data.result.seq,
                    NICK: data.result.nick,
                }
            })
            CloseLogin()

        } else {
            setModalState({ ...ModalState, show: true, title: '로그인', text: '올바른 아이디 형식 또는 6자리 이상 비밀번호를 입력해 주세요.' })
        }
    }

    useEffect(()=>{
        if (cookies.saveId){
            setId(cookies.saveId)
            setSaveMode(true)
        }
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
                            ENTER_SIGNIN={ENTER_SIGNIN}
                            id={id}
                            pwd={pwd}
                            loginAuth={loginAuth}
                            handleLoginId={handleLoginId}
                            handleLoginPwd={handleLoginPwd}
                            signIn={signIn}
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