import Form from 'react-bootstrap/Form';

export const FormReg = ({ children, formClass, formStyle, action, method, encType, onSubmit }) => {
    return (
        <Form
            onSubmit={ (evt) => onSubmit(evt) }
            action={ action } 
            method={ method } 
            encType={ encType } 
            className={ formClass } 
            style={{ formStyle }}
        >
            { children }
        </Form>
    )
};
