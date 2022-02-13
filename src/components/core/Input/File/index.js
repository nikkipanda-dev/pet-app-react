export const File = ({ type, className, inputStyle, refTarget, name, accept, multiple, onChange, value, hidden }) => {
    return (
        <input 
            type={ type } 
            className={ className } 
            ref={ refTarget } 
            name={ name } 
            { ...onChange && { onChange: evt => onChange(evt) }} 
            accept={ accept } 
            multiple={ multiple } 
            style={{ ...inputStyle }} 
            hidden={ hidden } 
            // value={ value } 
            // defaultValue={ value }
        />
    )
};
