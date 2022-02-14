import PropTypes from 'prop-types';
import { Regular } from "./Regular";

let formMethod;
let formEncType;

const sanitizeFormProp = ({ ...props}) => {
    formMethod = props.formMethod ? props.formMethod.toUpperCase() : undefined;
    formEncType = (props.formEncType === 'default') ? 'application/x-www-form-urlencoded' : 
    (props.formEncType === 'multipart') ? 'multipart/form-data' : undefined;
}

export const Form = ({ children, className, color, css, action, method, encType, onSubmit, hidden, refTarget, dataTarget }) => {
    formMethod = method;
    formEncType = encType;

    sanitizeFormProp({formMethod, formEncType});

    return (
        <Regular
        onSubmit={ evt => onSubmit(evt) }
        className={ className } 
        css={ css }
        color={ color }
        action={ action }
        method={ formMethod }
        encType={ formEncType } 
        hidden={ hidden } 
        refTarget={ refTarget } 
        dataTarget={ dataTarget }>
            { children }
        </Regular>
    )
};

Form.propTypes = {
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

Form.defaultProps = {
    'formClass': false,
    'formStyle': false,
    'onSubmit': false,
}

export default Form;