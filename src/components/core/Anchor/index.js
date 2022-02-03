import { AnchorReg } from './AnchorReg/AnchorReg';
import { AnchorModal } from './AnchorModal/AnchorModal';
import { AnchorToggleEl } from './AnchorToggleEl/AnchorToggleEl';

export const AnchorIdx = ({ type, text, href, isTargetBlank, isShown, anchorOnclick, anchorClass, anchorStyle, dataTargetUserId, dataTargetPostId, dataTargetBody }) => {
    return (
        (type == 'regular') ? 
            <AnchorReg 
                text={ text } 
                href={ href } 
                isTargetBlank={ isTargetBlank } 
                anchorClass={ anchorClass } 
                anchorStyle={ anchorStyle }
            /> : 
        (type == 'modal') ? 
            <AnchorModal 
                text={ text } 
                anchorClass={ anchorClass } 
                anchorOnclick={ anchorOnclick } 
                dataTargetUserId={ dataTargetUserId ? dataTargetUserId : false }
                dataTargetPostId={ dataTargetPostId ? dataTargetPostId : false } 
                dataTargetBody={ dataTargetBody ? dataTargetBody : false } 
                anchorStyle={ anchorStyle }
            /> :
            <AnchorToggleEl 
                text={ text } 
                anchorClass={ anchorClass } 
                anchorOnclick={ anchorOnclick } 
                isShown={ isShown } 
                anchorStyle={ anchorStyle }
            />
    )
};