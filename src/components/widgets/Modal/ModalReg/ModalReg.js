import { useEffect } from 'react';
import ModalWrapper from 'react-bootstrap/Modal';

import { BtnIdx } from '../../../core/Button';

export const ModalReg = ({ children, modalSize, btnOnhide, isShown, modalHeader }) => {
    return (
        <ModalWrapper 
            size={ modalSize }
            show={ isShown } 
            centered
        >
            <ModalWrapper.Header closeButton onClick={ () => btnOnhide() }>
                <ModalWrapper.Title>{ modalHeader }</ModalWrapper.Title>
            </ModalWrapper.Header>
            <ModalWrapper.Body>
                { children }
            </ModalWrapper.Body>
            <ModalWrapper.Footer>
                <BtnIdx text='Close' type='modal' btnClass='btn-reg btn-secondary' btnOnhide={ btnOnhide }/>
            </ModalWrapper.Footer>
        </ModalWrapper>
    )
};
