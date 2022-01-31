import { useEffect, useState } from 'react';

import { InputReg } from './InputReg/InputReg'
import { AlertIdx } from '../Alert';

export const InputIdx = ({ validationType, type, inputClass, refTarget, name, onChange, value, alertAttr, validateInput, isError, alertClass, errorMsg }) => { 
    let thisErrorMsg = null;

    const charLen = (validationType === 'name') ? '2' :
    (validationType === 'email') ? '5' : 
    (validationType === 'password') ? '8' : '';

    const blankAndLenError = `The ${ alertAttr } field cannot be blank and must be at least ${ charLen } characters.`;
    const requiredField = `The ${ alertAttr } field is required.`;

    if (validateInput) {
        if ((name !== 'password' && name !== 'password_confirmation') && value.length < 2) {
            thisErrorMsg = blankAndLenError;
        } else if (((name === 'password' || name === 'password_confirmation') && value.length < 8)) {
            thisErrorMsg = requiredField;
        }
    }

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
            <AlertIdx alertClass={ alertClass }>
                {
                    // TO DO: Client-side validation
                    
                    // thisErrorMsg ? thisErrorMsg : 
                    errorMsg[name] ? (!errorMsg['password_confirmation'] ? errorMsg[name][0] : errorMsg[name]) :
                     null
                }
            </AlertIdx>
        </>
    )
};