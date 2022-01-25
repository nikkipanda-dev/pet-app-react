import { AnchorReg } from './AnchorReg/AnchorReg';
import { AnchorModal } from './AnchorModal/AnchorModal';

export const AnchorIdx = ({ anchorContext, modalContext }) => {
    return (
        (anchorContext.type == 'regular') ? <AnchorReg anchorContext={ anchorContext }/> : 
        <AnchorModal anchorContext={ anchorContext } modalContext={ modalContext }/>
    )
};