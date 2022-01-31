import { func } from "prop-types";
import { useState } from "react";

export const Validate = ({ value, alertAttr, validationType, validateInput }) => {
    const [isErr, setRegisterErrClient] = useState({});

    let errorMsg = '';
    let isError = false;

    const charLen = (validationType === 'name') ? '2' :
    (validationType === 'email') ? '5' : 
    (validationType === 'password') ? '8' : '';

    const blankAndLenError = `The ${ alertAttr } cannot be blank and must be at least ${ charLen } characters.`;
    const requiredField = `The ${ alertAttr } is required.`;

    if (validateInput && value.length < 2) {
        // setIsError(true);
        isError = true;
        errorMsg = (validationType === 'repeatPassword') ? requiredField : blankAndLenError;
    }

    return {
        'errorMsg': errorMsg,
        'isError': isError,
    };
}

export default Validate;