import React, { useState, useRef, useCallback, useEffect, ChangeEvent } from 'react';

interface IFileTypes {
    id: number;
    object: File;
}

export default () => {

    // 드래그 중 인지 구분하는 상태
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [files, setFiles] = useState<IFileTypes[]>([])

    // 선택한 파일의 고유 id
    const fileId = useRef<number>(0)
    // 드래그 이벤트를 감지하는 ref 참조변수
    const dragRef = useRef<HTMLLabelElement | null>(null);

    const onChangeFiles = useCallback((e: ChangeEvent<HTMLInputElement> | any): void =>{
        let selectFiles: File[] = [];
        let tempFiles: IFileTypes[] = []; // 선택했던 파일

        // 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줌.
        if (e.type === 'drop'){
            // 드래그 앤 드롭을 했을 때
            selectFiles = e.dataTransfer.files;
        } else {
            // 파일첨부 버튼을 눌러서 이미지를 선택했을 때
            selectFiles = e.target.files;
        }
        console.log('selectFiles', selectFiles);
        for(const file of selectFiles){
            // 스프레드 연산자를 이용하여 기존에 있던 파일을 복사하고, 선택했던 파일들을 append해준다.
            tempFiles = [
                ...tempFiles,
                {
                    id: fileId.current++, // fileId의 값을 1씩 늘려주면서 각 파일의 고유값으로 사용.
                    object: file, // object 객체안에 선택했던 파일들의 정보가 담겨있습니다.
                }
            ]
        }

        setFiles(tempFiles)
    }, [files])

    const handleDragIn = useCallback((e: DragEvent): void => {
        console.log('handleDragIn', );
        e.preventDefault();
        e.stopPropagation();
    }, [])
    const handleDragOut = useCallback((e: DragEvent): void => {
        console.log('handleDragOut', );
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    }, [])
    const handleDragOver = useCallback((e: DragEvent): void => {
        console.log('handleDragOver', );
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer!.files){
            setIsDragging(true);
        }
    }, [])
    const handleDrop = useCallback((e: DragEvent): void => {
        console.log('handleDrop', );
        e.preventDefault();
        e.stopPropagation();

        onChangeFiles(e)
        setIsDragging(false)
    }, [onChangeFiles])

    const handleFileFilter = useCallback((id: number): void => {
        // 매개변수로 받은 id와 일치하지 않으면 제외
        setFiles(files.filter((file: IFileTypes) => file.id !== id))
    }, [files])

    const initDragEvents = useCallback((): void => {
        if (dragRef.current !== null){
            dragRef.current.addEventListener("dragenter", handleDragIn);
            dragRef.current.addEventListener("dragleave", handleDragOut);
            dragRef.current.addEventListener("dragover", handleDragOver);
            dragRef.current.addEventListener("drop", handleDrop);
        }
    }, [])
    const resetDragEvents = useCallback((): void => {
        if (dragRef.current !== null){
            dragRef.current.removeEventListener("dragenter", handleDragIn);
            dragRef.current.removeEventListener("dragleave", handleDragOut);
            dragRef.current.removeEventListener("dragover", handleDragOver);
            dragRef.current.removeEventListener("drop", handleDrop);
        }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

    useEffect(() => {
        initDragEvents();

        return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents])

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
                {files.length > 0 ? '' : '파일을 첨부하거나 끌어다 놓으세요.'}
            </label>
            {files.length > 0 && (
                <div className="DragDrop-Files">
                    {files.map((file: IFileTypes) => {
                        const { id, object: { name } } = file;

                        return (
                            <div key={id} className="FileItem" onClick={() => handleFileFilter(id)}>
                                <div className="FileItemName">{name}</div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}