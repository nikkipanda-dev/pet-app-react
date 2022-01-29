import { InputReg } from './InputReg/InputReg'
import { InputValidation } from './InputValidation/InputValidation';

export const InputIdx = ({ validation, type, inputClass, refTarget, name, onChange, value, errorMsg, selfValidate }) => {
    console.log('validation: ', (validation === 'name') ? 'name' : 'zzz');

    const isError = false;
    // validate name
    // validate username
    // validate email
    // validate pw

    return (
        <>
            <InputReg
                type={type}
                inputClass={inputClass}
                refTarget={refTarget}
                name={name}
                onChange={onChange}
            />

            {
                isError ? <InputErrorMsg>
            }
        </>

    )
};
