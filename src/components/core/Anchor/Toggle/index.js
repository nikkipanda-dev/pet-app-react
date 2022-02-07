export const Toggle = ({ text, anchorOnclick, isShown, anchorClass, anchorStyle, dataTarget }) => {
    return (
        <a 
            onClick={ evt => anchorOnclick(evt) } 
            className={ anchorClass } 
            style={{ ...anchorStyle }} 
            data-target={ dataTarget }>
            { text }
        </a>
    )
};