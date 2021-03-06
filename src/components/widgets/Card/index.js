import { Regular } from "./Regular";
import { Full } from "./Full";

export const Card = ({ type, children, css, color, border, header, footer, className }) => {
    return (
        (type === 'regular') ? 
        <Regular 
        className={ className } 
        color={ color }
        header={ header } 
        border={ border }
        footer={ footer }
        css={ css }>
            { children }
        </Regular> :
        <Full 
        className={ className } 
        color={ color }
        header={ header }
        footer={ footer }
        css={ css }>
            { children }
        </Full>
    )
};

export default Card;