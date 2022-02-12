import { Regular } from './Regular';
import { Modal } from './Modal';

export const Button = ({ css, text, type, color, className, btnOnclick, btnOnhide, isShown, targetID }) => {
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
        className={ className }
        btnOnclick={ btnOnclick ? btnOnclick : false } 
        isShown={ isShown } 
        targetID={ targetID ? targetID : '' }/>
    )
};

export default Button;