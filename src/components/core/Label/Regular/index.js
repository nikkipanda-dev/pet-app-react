export const Regular = ({ text, labelClass, labelOnclick, refTarget }) => {
    return (
        <label 
            className={ labelClass } 
            className={ labelClass } 
            onClick={ () => labelOnclick(refTarget) } 
        >
            { text }
        </label>
    )
};
