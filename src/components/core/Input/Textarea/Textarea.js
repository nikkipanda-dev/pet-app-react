export const Textarea = ({ textareaClass, rows, name, value, onChange }) => {
    return (
        <textarea 
            className={ textareaClass } 
            name={ name }
            onChange={ evt => onChange(evt.target.value) } 
            rows={ rows }
            value={ value }
        />
    )
};
