import { Regular } from './Regular';
import { Modal } from './Modal';

export const Button = (
    {
        css, 
        text, 
        type, 
        color, 
        size, 
        refTarget, 
        className, 
        btnOnclick, 
        btnOnhide, 
        isShown, 
        hidden,
        targetID 
    }
) => {
    return (
        (type === 'modal') ? 
        <Modal 
        text={ text } 
        className={ className } 
        css={ css } 
        btnOnclick={ btnOnclick ? btnOnclick : btnOnhide } 
        targetID={ targetID ? targetID : '' }/> : 
        <Regular 
        type={ type } 
        css={ css } 
        text={ text } 
        color={ color } 
        refTarget={ refTarget }
        size={ size }
        className={ className }
        btnOnclick={ btnOnclick ? btnOnclick : false } 
        isShown={ isShown } 
        hidden={ hidden }
        targetID={ targetID ? targetID : '' }/>
    )
};

export default Button;