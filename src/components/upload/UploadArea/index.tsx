import React from 'react';
import UploadInput from '../UploadInput'
import '../upload.scss'

export default () => {
    return (
        <div className="Upload">
            <div className="inner">
                <div className="TitleArea">
                    <strong className="Title">파일 업로드</strong>
                </div>
                <div className="UploadArea">
                    <UploadInput />
                    <div className="SubmitArea">
                        <input type="text" id="SubmitInput"/>
                        <button className="SubmitBtn">등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}