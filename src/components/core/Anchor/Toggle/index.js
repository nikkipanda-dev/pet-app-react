export const Toggle = ({ css, color, text, anchorOnclick, isShown, className, dataTarget }) => {
    return (
        <a 
            onClick={ evt => anchorOnclick(evt) } 
            className={ className } 
            color={ color }
            css={{ ...css }} 
            data-target={ dataTarget }>
            { text }
        </a>
    )
};