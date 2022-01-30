import { InputReg } from './InputReg/InputReg'
import validate from '../../../util/Validation';

export const InputIdx = ({ validationType, type, inputClass, refTarget, name, onChange, value, alertAttr, validateInput, setIsError }) => {

    return (
        <>
            <InputReg
                type={ type } 
                inputClass={ inputClass } 
                refTarget={ refTarget } 
                name={ name } 
                onChange={ onChange } 
                value={ value }
            />

            { validateInput && validate(value, alertAttr, validationType, validateInput, () => setIsError) }
        </>
    )
};