import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Modal, Button } from 'react-bootstrap';
// recoil
import { ModalType, modalState } from '../../recoil/modal'
import { useEffect } from 'react';

export default ({
    
}) => {

  const [ModalState, setModalState] = useRecoilState<ModalType>(modalState)

  const handleClose = () => {
      setModalState({ ...ModalState, show: false})
  }

    return (
        <Modal
            show={ModalState.show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{ModalState.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ModalState.text}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {ModalState.cancelBtn ?? ModalState.type == 'confirm' ? '취소' : '닫기'}
                </Button>
                {ModalState.type == 'confirm' && (
                <Button variant="primary" onClick={handleClose}>
                    {ModalState.okBtn ?? '확인'}
                </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}