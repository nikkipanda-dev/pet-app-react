import { ButtonReg } from './ButtonReg/ButtonReg';
import { ButtonModal } from './ButtonModal/ButtonModal';

export const BtnIdx = ({ text, type, btnClass, btnStyle, btnOnclick, btnOnhide, targetID }) => {
    return (
        (type === 'modal') ? <ButtonModal 
            text={ text } 
            btnClass={ btnClass } 
            btnStyle={ btnStyle } 
            btnOnclick={ btnOnclick ? btnOnclick : btnOnhide } 
            targetID={ targetID ? targetID : '' }
        /> : 
        <ButtonReg 
            type={ type } 
            text={ text } 
            btnClass={ btnClass } 
            btnOnclick={ btnOnclick ? btnOnclick : false }
        />
    )
};
