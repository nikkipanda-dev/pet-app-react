import { ModalReg } from './ModalReg/ModalReg';
import { ModalStatic } from './ModalStatic/ModalStatic';

export const ModalIdx = ({ type, btnOnhide, isShown }) => {

    return (
        (type === 'regular') ? <ModalReg btnOnhide={ btnOnhide } isShown={ isShown }/> :
        <ModalStatic btnOnhide={ btnOnhide } isShown={ isShown }/>
    )
};