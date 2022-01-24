export const Input = ( { type, inputClass, refTarget } ) => {
    return (
        <>
            <input 
                type={ type } 
                className={ inputClass } 
                ref={ refTarget }
            />
        </>
    )
};
