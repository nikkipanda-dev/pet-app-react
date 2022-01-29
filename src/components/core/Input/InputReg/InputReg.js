export const InputReg = ({ type, inputClass, refTarget, name, onChange }) => {
    console.log('name: ', name);

    return (
        <input type={ type } 
                className={ inputClass }
                ref={ refTarget } 
                name={ name }
                onChange={ () => onChange('i am ' + name) }
        />
    )
};
