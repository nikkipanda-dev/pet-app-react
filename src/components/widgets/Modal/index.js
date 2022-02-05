import { Regular } from './Regular';
import { Static } from './Static';

export const Modal = ({ children, type, modalSize, btnOnhide, isShown, modalHeader }) => {
    return (
        (type === 'regular') ? <Regular 
            btnOnhide={ btnOnhide } 
            modalSize={ modalSize } 
            isShown={ isShown } 
            modalHeader={ modalHeader }
        >
            { children }
        </Regular> :
        <Static 
            modalSize={ modalSize } 
            btnOnhide={ btnOnhide } 
            isShown={ isShown }
        />
    )
};

export default Modal;