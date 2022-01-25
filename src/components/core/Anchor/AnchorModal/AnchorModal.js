import { ModalIdx } from '../../../widgets/Modal';

export const AnchorModal = ({ anchorContext, modalContext }) => {
    return (
        <>
            <a 
                onClick={ () => modalContext.modalOnclick() }
            >
                { anchorContext.text }
            </a>

            <ModalIdx type='regular' modalContext={ modalContext }/>
        </>
    )
};
