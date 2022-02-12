import { Regular } from './Regular';
import { Modal } from './Modal';
import { Toggle } from './Toggle';

export const Anchor = ({ type, color, css, text, href, isTargetBlank, isShown, anchorOnclick, className, dataTargetUserId, dataTargetPostId, dataTargetBody, dataTarget }) => {
    return (
        (type == 'regular') ? 
            <Regular 
            text={ text } 
            color={ color }
            css={ css }
            href={ href } 
            isTargetBlank={ isTargetBlank } 
            className={ className }/> : 
        (type == 'modal') ? 
            <Modal 
            text={ text } 
            className={ className } 
            color={ color }
            css={ css }
            anchorOnclick={ anchorOnclick } 
            dataTargetUserId={ dataTargetUserId ? dataTargetUserId : false }
            dataTargetPostId={ dataTargetPostId ? dataTargetPostId : false } 
            dataTargetBody={ dataTargetBody ? dataTargetBody : false }/> :
            <Toggle 
            text={ text } 
            className={ className } 
            color={ color }
            css={ css }
            anchorOnclick={ anchorOnclick } 
            isShown={ isShown } 
            dataTarget={ dataTarget }/>
    )
};

export default Anchor;