import { Regular } from './Regular';

export const Blockquote = ({ children, css, color, border, height, letterSpacing, size, className }) => {
return (
        <Regular
        css={ css }
        color={ color }
        border={ border }
        height={ height }
        letterSpacing={ letterSpacing }
        size={ size }
        className={ className }>
            { children }
        </Regular>
    )
}

export default Blockquote;