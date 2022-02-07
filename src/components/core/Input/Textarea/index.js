export const Textarea = ({ textareaClass, rows, name, value, onChange, defaultValue, dataTarget, onFocus }) => {
    return (
        <textarea 
            className={ textareaClass } 
            name={ name }
            { ...onChange && { onChange: evt => onChange(evt.target.value) }} 
            { ...onFocus && { onFocus: evt => onFocus(evt) }}
            rows={ rows }
            defaultValue={ defaultValue } 
            value={ value } 
            data-target={ dataTarget }
        />
    )
};
