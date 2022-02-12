import { Regular } from "./Regular";

export const Alert = ({ css, color, children, className }) => {
    return (
        <Regular 
        css={ css } 
        color={ color } 
        className={ className }>
            { children }
        </Regular>
    )
};

export default Alert;