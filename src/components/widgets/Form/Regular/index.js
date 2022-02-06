import Form from 'react-bootstrap/Form';

export const Regular = ({ children, formClass, formStyle, action, method, encType, onSubmit, hidden }) => {
    return (
        <Form
            onSubmit={ (evt) => onSubmit(evt) }
            action={ action } 
            method={ method } 
            encType={ encType } 
            className={ formClass } 
            style={{ formStyle }} 
            hidden={ hidden }
        >
            { children }
        </Form>
    )
};
