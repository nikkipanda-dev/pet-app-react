import { InputReg } from './InputReg/InputReg'
import validate from '../../../util/Validation';
import { AlertIdx } from '../Alert';

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
            <AlertIdx alertClass='text-danger fine-print mb-3'>
                { validateInput && validate(value, alertAttr, validationType, validateInput, () => setIsError) }
            </AlertIdx>
        </>
    )
};