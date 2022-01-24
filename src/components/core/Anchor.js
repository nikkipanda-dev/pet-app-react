import { Modal as ModalWrapper } from '../widgets/Modal';

export const Anchor = ( { href, text, modalOnclick, modalOnhide, modalShown }) => {
  return (
        <>
            <a 
                href={ href }
                onClick={ () => modalOnclick() }    
            >{ text }</a>

            <ModalWrapper 
                modalShown={ modalShown }
                modalOnhide={ modalOnhide } 
            />
        </>
    )
};