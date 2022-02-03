export const Textarea = ({ textareaClass, rows, name, value, onChange, defaultValue }) => {
    return (
        <textarea 
            className={ textareaClass } 
            name={ name }
            onChange={ evt => onChange(evt.target.value) } 
            rows={ rows }
            defaultValue={ defaultValue } 
            value={ value }
        />
    )
};
