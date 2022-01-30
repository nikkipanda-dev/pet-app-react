export const InputReg = ({ type, inputClass, refTarget, name, onChange, value }) => {
    return (
        <input 
            type={ type } 
            className={ inputClass } 
            ref={ refTarget } 
            name={ name } 
            onChange={ (evt) => onChange(evt.target.value) } 
            value={ value }
        />
    )
};
