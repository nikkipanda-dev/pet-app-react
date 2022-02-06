import { Regular } from './Regular';
import { Modal } from './Modal';

export const Button = ({ text, type, btnClass, btnStyle, btnOnclick, btnOnhide, isShown, targetID }) => {
    return (
        (type === 'modal') ? <Modal 
            text={ text } 
            btnClass={ btnClass } 
            btnStyle={ btnStyle } 
            btnOnclick={ btnOnclick ? btnOnclick : btnOnhide } 
            targetID={ targetID ? targetID : '' }
        /> : 
        <Regular 
            type={ type } 
            text={ text } 
            btnClass={ btnClass } 
            btnOnclick={ btnOnclick ? btnOnclick : false } 
            isShown={ isShown } 
            targetID={ targetID ? targetID : '' }
        />
    )
};

export default Button;