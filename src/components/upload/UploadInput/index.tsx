import React, { useState, useRef } from 'react';

export default () => {

    // 드래그 중 인지 구분하는 상태
    const [isDragging, setIsDragging] = useState<boolean>(false)
    // 선택한 파일의 고유 id
    const fileId = useRef<number>(0)
    // 드래그 이벤트를 감지하는 ref 참조변수
    const dragRef = useRef<HTMLLabelElement | null>(null);

    return (
        <div className="UploadInput">
            <input
                type="file"
                id="UploadFile"
            />
            <label
                ref={dragRef}
                htmlFor="UploadFile"
                className={isDragging ? "UploadInput-File-Dragging" : "UploadInput-File"}
            >
                파일 첨부
            </label>
        </div>
    )
}