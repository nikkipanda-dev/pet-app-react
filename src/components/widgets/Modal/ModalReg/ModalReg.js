import ModalWrapper from 'react-bootstrap/Modal';

import { BtnIdx } from '../../../core/Button';

export const ModalReg = ({ btnOnhide, isShown }) => {  

    return (
        <ModalWrapper 
            show={ isShown }
            centered
        >
            <ModalWrapper.Dialog>
                <ModalWrapper.Header closeButton onClick={ () => btnOnhide() }>
                    <ModalWrapper.Title>Modal title</ModalWrapper.Title>
                </ModalWrapper.Header>
                <ModalWrapper.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </ModalWrapper.Body>
                <ModalWrapper.Footer>
                    <BtnIdx text='Close' type='modal' btnOnhide={ btnOnhide }/>
                </ModalWrapper.Footer>
            </ModalWrapper.Dialog>
        </ModalWrapper>
    )
};
