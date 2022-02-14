import { Regular } from './Regular';
import { Modal } from './Modal';
import { Toggle } from './Toggle';

export const Anchor = (
    { 
        type, 
        color, 
        css, 
        text, 
        href, 
        to,
        size,
        fontWeight,
        isTargetBlank, 
        isShown, 
        onClick, 
        className, 
        dataTargetUserId, 
        dataTargetPostId, 
        dataTargetBody, 
        dataTarget 
    }
) => {
    return (
        (type === 'regular') ? 
            <Regular 
            text={ text } 
            color={ color }
            size={ size }
            css={ css }
            href={ href } 
            to={ to } 
            fontWeight={ fontWeight }
            onClick={ onClick }
            isTargetBlank={ isTargetBlank } 
            className={ className }/> : 
        (type == 'modal') ? 
            <Modal 
            text={ text } 
            className={ className } 
            color={ color }
            css={ css }
            onClick={ onClick } 
            dataTargetUserId={ dataTargetUserId ? dataTargetUserId : false }
            dataTargetPostId={ dataTargetPostId ? dataTargetPostId : false } 
            dataTargetBody={ dataTargetBody ? dataTargetBody : false }/> :
            <Toggle 
            text={ text } 
            className={ className } 
            color={ color }
            css={ css }
            onClick={ onClick } 
            isShown={ isShown } 
            dataTarget={ dataTarget }/>
    )
};

export default Anchor;