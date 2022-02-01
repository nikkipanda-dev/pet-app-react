import { ModalReg } from './ModalReg/ModalReg';
import { ModalStatic } from './ModalStatic/ModalStatic';

export const ModalIdx = ({ children, type, modalSize, btnOnhide, isShown, modalHeader }) => {
    return (
        (type === 'regular') ? <ModalReg btnOnhide={ btnOnhide } modalSize={ modalSize } isShown={ isShown } modalHeader={ modalHeader }>{ children }</ModalReg> :
        <ModalStatic modalSize={ modalSize } btnOnhide={ btnOnhide } isShown={ isShown }/>
    )
};