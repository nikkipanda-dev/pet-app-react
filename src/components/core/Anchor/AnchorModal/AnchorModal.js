import { ModalIdx } from '../../../widgets/Modal';

export const AnchorModal = ({ text, anchorOnclick, anchorClass }) => {
    return (
        <a 
            onClick={ evt => anchorOnclick(evt) } 
            className={ anchorClass }
        >
            { text }
        </a>
    )
};
