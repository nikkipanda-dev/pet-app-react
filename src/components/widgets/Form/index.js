import PropTypes from 'prop-types';

import { FormReg } from "./FormReg/FormReg";

let formMethod;
let formEncType;

const sanitizeFormProp = ({ ...props}) => {
    formMethod = props.formMethod ? props.formMethod.toUpperCase() : undefined;
    formEncType = (props.formEncType === 'default') ? 'application/x-www-form-urlencoded' : 
    (props.formEncType === 'multipart') ? 'multipart/form-data' : undefined;
}

export const FormIdx = ({ children, formClass, formStyle, action, method, encType, onSubmit }) => {
    formMethod = method;
    formEncType = encType;

    sanitizeFormProp({formMethod, formEncType});

    return (
        <FormReg
            onSubmit={ evt => onSubmit(evt) }
            formClass={ formClass } 
            formStyle={ formStyle }
            action={ action }
            method={ formMethod }
            encType={ formEncType }    
        >
            { children }
        </FormReg>
    )
};

FormIdx.propTypes = {
    'formClass': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    'formStyle': PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    'action': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]).isRequired,
    'method': PropTypes.string.isRequired,
    'encType': PropTypes.string.isRequired,
    'onSubmit': PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
    ]),
}

FormIdx.defaultProps = {
    'formClass': false,
    'formStyle': false,
    'onSubmit': false,
}

export default FormIdx;