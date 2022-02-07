import { Regular } from './Regular';
import { Textarea } from './Textarea';
import { File } from './File';
import Alert from '../Alert';

export const Input = ({ validationType, fieldType, type, inputClass, inputStyle, refTarget, name, onChange, value, alertAttr, validateInput, isError, alertClass, errorMsg, rows, multiple, accept, hidden, defaultValue, dataTarget, onFocus }) => { 
    // TODO: Client-side validation

    return (
        <>
            {
                (fieldType === 'regular') ? 
                    <Regular
                        type={ type } 
                        inputClass={ inputClass } 
                        refTarget={ refTarget } 
                        name={ name } 
                        // onChange={ onChange } 
                        // value={ value }
                        defaultValue={ defaultValue ? defaultValue : '' } 
                        hidden={ hidden }
                    />  : 
                    (fieldType === 'textarea') ? 
                        <Textarea 
                            textareaClass={ inputClass } 
                            onChange={ onChange } 
                            onFocus={ onFocus }
                            rows={ rows } 
                            name={ name } 
                            value={ value } 
                            defaultValue={ defaultValue } 
                            dataTarget={ dataTarget }
                        /> :
                    <File 
                        type={ type } 
                        inputClass={ inputClass } 
                        refTarget={ refTarget } 
                        name={ name } 
                        accept={ accept }
                        onChange={ onChange } 
                        inputStyle={ inputStyle } 
                        multiple={ multiple } 
                        hidden={ hidden }
                    />
            }

            <Alert alertClass={ alertClass }>
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