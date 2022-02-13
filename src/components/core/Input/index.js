import { Regular } from './Regular';
import { Textarea } from './Textarea';
import { File } from './File';
import Alert from '../Alert';

export const Input = (
    { 
        fieldType, 
        type, 
        css,
        color,
        size,
        inputClass, 
        inputStyle, 
        refTarget, 
        name, 
        onChange, 
        value, 
        alertClass, 
        errorMsg, 
        rows, 
        multiple, 
        accept, 
        hidden, 
        defaultValue, 
        dataTarget, 
        onFocus 
    }
) => { 
    // TODO: Client-side validation

    return (
        <>
        {
            (fieldType === 'regular') ? 
                <Regular
                type={ type } 
                className={ inputClass } 
                refTarget={ refTarget } 
                name={ name } 
                css={ css }
                color={ color }
                size={ size }
                // onChange={ onChange } 
                // value={ value }
                defaultValue={ defaultValue ? defaultValue : '' } 
                hidden={ hidden }/>  : 

                (fieldType === 'textarea') ? 
                <Textarea 
                className={ inputClass } 
                onChange={ onChange } 
                onFocus={ onFocus }
                rows={ rows } 
                name={ name } 
                value={ value } 
                style={ inputStyle } 
                defaultValue={ defaultValue } 
                dataTarget={ dataTarget }/> :

                <File 
                type={ type } 
                className={ inputClass } 
                refTarget={ refTarget } 
                name={ name } 
                accept={ accept }
                onChange={ onChange } 
                inputStyle={ inputStyle } 
                multiple={ multiple } 
                hidden={ hidden }/>
        }

            <Alert className={ alertClass } color='tangerine'>
                {                    
                    // thisErrorMsg ? thisErrorMsg : 
                    errorMsg && errorMsg[name] ? (!errorMsg['password_confirmation'] ? errorMsg[name] : errorMsg[name]) :
                    null
                }
            </Alert>
        </>
    )
};

export default Input;