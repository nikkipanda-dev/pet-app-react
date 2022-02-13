export const Regular = ({ type, className, refTarget, hidden, name, onChange, defaultValue, value }) => {
    return (
        <input 
            type={ type } 
            className={ className } 
            ref={ refTarget } 
            name={ name } 
            // { ...onChange && { onChange: evt => onChange(evt.target.value) }} 
            // { ...value && { value: value }} 
            { ...defaultValue && { defaultValue: defaultValue }}
            hidden={ hidden }
        />
    )
};
