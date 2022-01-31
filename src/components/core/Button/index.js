import { ButtonReg } from './ButtonReg/ButtonReg';
import { ButtonModal } from './ButtonModal/ButtonModal';

export const BtnIdx = ({ text, type, btnClass, btnOnclick, btnOnhide }) => {
    return (
        (type === 'modal') ? <ButtonModal text={ text } btnClass={ btnClass } btnOnclick={ btnOnclick ? btnOnclick : btnOnhide } /> : 
        <ButtonReg type={ type } text={ text } btnClass={ btnClass } btnOnclick={ btnOnclick ? btnOnclick : false }/>
    )
};
