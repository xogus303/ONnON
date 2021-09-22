import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Modal, Button } from 'react-bootstrap';
// recoil
import { ModalType, modalState } from '../../recoil/modal'

export default ({
    
}) => {

  const [ModalState, setModalState] = useRecoilState<ModalType>(modalState)

  const handleClose = () => {
      setModalState({ ...ModalState, show: false})
  }

    return (
        <Modal show={ModalState.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}