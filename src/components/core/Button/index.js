import { ButtonReg } from './ButtonReg/ButtonReg';
import { ButtonModal } from './ButtonModal/ButtonModal';

export const BtnIdx = ({ text, type, btnOnclick, btnOnhide }) => {
    return (
        (type === 'modal') ? <ButtonModal text={ text } btnOnclick={ btnOnclick ? btnOnclick : btnOnhide } /> : 
        <ButtonReg type={ type } text={ text } btnOnclick={ btnOnclick ? btnOnclick : false }/>
    )
};
