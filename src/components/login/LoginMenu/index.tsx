import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs'
// recoil
import { useRecoilState } from 'recoil';
import { loginState, LoginType } from '../../../recoil/login'

export default function(props){

    const { TogglePage, handelSaveId, saveMode } = props;

    return (
        <div className="LoginMenu">
            <div className="saveId">
                <input
                    type="checkbox"
                    id="saveIdBtn"
                    checked={saveMode}
                    onChange={handelSaveId}
                />
                <label htmlFor="saveIdBtn">아이디 저장</label>
            </div>
            <div className="sectionLine"></div>
            <div className="findPwd">
                <span>On&On 비밀번호 찾기</span>
                <BsArrowUpRight size={14} />
            </div>
            <div
                className="moveRegist"
                onClick={() => TogglePage('regist')}
            >
                <span>On&On 계정 생성하기</span>
                <BsArrowUpRight size={14} />
            </div>
        </div>
    )
}