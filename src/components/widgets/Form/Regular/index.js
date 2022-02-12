// import Form from 'react-bootstrap/Form';
import { styled } from '../../../../css/stitches.config';

const Form = styled('form', {});

export const Regular = ({ children, className, css, color, action, method, encType, onSubmit, hidden, refTarget, dataTarget }) => {
    return (
        <Form
            onSubmit={ (evt) => onSubmit(evt) }
            color={ color }
            action={ action } 
            method={ method } 
            encType={ encType } 
            className={ className } 
            style={{ ...css }} 
            hidden={ hidden } 
            { ...refTarget && { ref: refTarget }}
            data-target={ dataTarget }>
            { children }
        </Form>
    )
};
