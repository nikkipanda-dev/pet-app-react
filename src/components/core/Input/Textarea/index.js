export const Textarea = ({ className, rows, name, value, style, onChange, defaultValue, dataTarget, onFocus }) => {
    return (
        <textarea 
        className={ className } 
        name={ name }
        { ...onChange && { onChange: evt => onChange(evt.target.value) }} 
        { ...onFocus && { onFocus: evt => onFocus(evt) }}
        rows={ rows }
        defaultValue={ defaultValue } 
        value={ value } 
        data-target={ dataTarget }
        style={{ ...style }}/>
    )
};
