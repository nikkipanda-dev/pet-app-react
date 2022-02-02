import { AnchorReg } from './AnchorReg/AnchorReg';
import { AnchorModal } from './AnchorModal/AnchorModal';
import { AnchorToggleEl } from './AnchorToggleEl/AnchorToggleEl';

export const AnchorIdx = ({ type, text, href, isTargetBlank, isShown, anchorOnclick, anchorClass }) => {
    return (
        (type == 'regular') ? 
            <AnchorReg 
                text={ text } 
                href={ href } 
                isTargetBlank={ isTargetBlank } 
                anchorClass={ anchorClass } 
            /> : 
        (type == 'modal') ? 
            <AnchorModal 
                text={ text } 
                anchorClass={ anchorClass } 
                anchorOnclick={ anchorOnclick }
            /> :
            <AnchorToggleEl 
                text={ text } 
                anchorClass={ anchorClass } 
                anchorOnclick={ anchorOnclick } 
                isShown={ isShown }
            />
    )
};