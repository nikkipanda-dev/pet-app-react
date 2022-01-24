export const Label = ( { text, labelClass, onClickFocus } ) => {
    return (
        <>
            <label 
                className={ labelClass }
                onClick={ () => onClickFocus() }
            >
                { text }
                
            </label>
        </>
    )
};
