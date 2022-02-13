import { Regular } from "./Regular";

export const Header = ({ color, size, css, text, textShadow, className }) => {
    return (
        <Regular 
        text={ text } 
        color={ color }
        size={ size }
        className={ className }
        textShadow={ textShadow }
        css={ css }/>
    )
};

export default Header;