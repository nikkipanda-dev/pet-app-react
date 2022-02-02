import { AnchorReg } from './AnchorReg/AnchorReg';
import { AnchorModal } from './AnchorModal/AnchorModal';

export const AnchorIdx = ({ type, text, href, isTargetBlank, anchorOnclick, anchorClass }) => {
    return (
        (type == 'regular') ? <AnchorReg text={ text } href={ href } isTargetBlank={ isTargetBlank } anchorClass={ anchorClass }/> : 
        <AnchorModal text={ text } anchorClass={ anchorClass } anchorOnclick={ anchorOnclick }/>
    )
};