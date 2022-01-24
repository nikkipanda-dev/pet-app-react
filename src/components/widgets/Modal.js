import ModalWrapper from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';

import { Button } from '../core/Button';
import { func } from 'prop-types';

export const Modal = ({ modalShown, modalOnhide }) => {    
    return (
        <ModalWrapper 
            show={ modalShown } 
            backdrop="static" 
            backdrop="static" 
            keyboard={ false }>

            <ModalDialog>
                <ModalHeader>
                    <ModalTitle>Modal title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                </ModalBody>
                <ModalFooter>
                    <Button 
                        text='Close' 
                        btnClass="navlink" 
                        type='button' 
                        isModal={ true } 
                        modalOnhide={ modalOnhide } 
                    />
                </ModalFooter>
            </ModalDialog>
        </ModalWrapper>
    )
};
