export const Toggle = ({ text, anchorOnclick, isShown, anchorClass, anchorStyle }) => {
    return (
        <a 
            onClick={ evt => anchorOnclick(!isShown) } 
            className={ anchorClass } 
            style={{ ...anchorStyle }}
        >
            { text }
        </a>
    )
};