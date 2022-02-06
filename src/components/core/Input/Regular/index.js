export const Regular = ({ type, inputClass, refTarget, hidden, name, onChange, defaultValue, value }) => {
    return (
        <input 
            type={ type } 
            className={ inputClass } 
            ref={ refTarget } 
            name={ name } 
            // { ...onChange && { onChange: evt => onChange(evt.target.value) }} 
            // { ...value && { value: value }} 
            { ...defaultValue && { defaultValue: defaultValue }}
            hidden={ hidden }
        />
    )
};
