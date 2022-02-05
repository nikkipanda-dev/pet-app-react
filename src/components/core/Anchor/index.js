import { Regular } from './Regular';
import { Modal } from './Modal';
import { Toggle } from './Toggle';

export const Anchor = ({ type, text, href, isTargetBlank, isShown, anchorOnclick, anchorClass, anchorStyle, dataTargetUserId, dataTargetPostId, dataTargetBody }) => {
    return (
        (type == 'regular') ? 
            <Regular 
                text={ text } 
                href={ href } 
                isTargetBlank={ isTargetBlank } 
                anchorClass={ anchorClass } 
                anchorStyle={ anchorStyle }
            /> : 
        (type == 'modal') ? 
            <Modal 
                text={ text } 
                anchorClass={ anchorClass } 
                anchorOnclick={ anchorOnclick } 
                dataTargetUserId={ dataTargetUserId ? dataTargetUserId : false }
                dataTargetPostId={ dataTargetPostId ? dataTargetPostId : false } 
                dataTargetBody={ dataTargetBody ? dataTargetBody : false } 
                anchorStyle={ anchorStyle }
            /> :
            <Toggle 
                text={ text } 
                anchorClass={ anchorClass } 
                anchorOnclick={ anchorOnclick } 
                isShown={ isShown } 
                anchorStyle={ anchorStyle }
            />
    )
};

export default Anchor;