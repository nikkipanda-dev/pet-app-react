export const Toggle = ({ css, color, text, onClick, isShown, className, dataTarget }) => {
    return (
        <a 
            onClick={ evt => onClick(evt) } 
            className={ className } 
            color={ color }
            css={{ ...css }} 
            data-target={ dataTarget }>
            { text }
        </a>
    )
};