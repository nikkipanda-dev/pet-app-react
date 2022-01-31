import { AnchorReg } from './AnchorReg/AnchorReg';
import { AnchorModal } from './AnchorModal/AnchorModal';

export const AnchorIdx = ({ type, text, anchorOnclick, anchorClass }) => {
    return (
        (type == 'regular') ? <AnchorReg text={ text } anchorClass={ anchorClass }/> : 
        <AnchorModal text={ text } anchorClass={ anchorClass } anchorOnclick={ anchorOnclick }/>
    )
};