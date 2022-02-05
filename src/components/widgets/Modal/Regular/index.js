import ModalWrapper from 'react-bootstrap/Modal';

import Button from '../../../core/Button';

export const Regular = ({ children, modalSize, btnOnhide, isShown, modalHeader }) => {
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
                <Button text='Close' type='modal' btnClass='btn-reg btn-secondary' btnOnhide={ btnOnhide }/>
            </ModalWrapper.Footer>
        </ModalWrapper>
    )
};
