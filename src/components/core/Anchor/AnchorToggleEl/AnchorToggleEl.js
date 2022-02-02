export const AnchorToggleEl = ({ text, anchorOnclick, isShown, anchorClass }) => {
    return (
        <a 
            onClick={ evt => anchorOnclick(!isShown) } 
            className={ anchorClass }
        >
            { text }
        </a>

    )
};
