import ModalWrapper from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';

import { BtnIdx } from '../../../core/Button';

export const ModalReg = ({ btnOnhide, isShown }) => {  

    return (
        <ModalWrapper 
            show={ isShown }
        >
            <ModalDialog>
                <ModalHeader>
                    <ModalTitle>Modal title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </ModalBody>
                <ModalFooter>
                    <BtnIdx text='Close' type='modal' btnOnhide={ btnOnhide }/>
                </ModalFooter>
            </ModalDialog>
        </ModalWrapper>
    )
};
