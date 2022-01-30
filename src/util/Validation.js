export function validate(value, alertAttr, validationType, validateInput, setIsError) {
    let errorMsg = '';

    const charLen = (validationType === 'name') ? '2' :
    (validationType === 'email') ? '5' : 
    (validationType === 'password') ? '8' : '';

    const blankAndLenError = `The ${ alertAttr } cannot be blank and must be at least ${ charLen } characters.`;
    const requiredField = `The ${ alertAttr } is required.`;

    if (validateInput && value.length < 2) {
        setIsError(true);
        errorMsg = (validationType === 'repeatPassword') ? requiredField : blankAndLenError;
    } else {
        setIsError(false);
    }

    return errorMsg;
}

export default validate;