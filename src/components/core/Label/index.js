import { Regular } from "./Regular";

export const Label = ({ css, text, color, size, className, labelOnclick, refTarget }) => {
    return (
        <Regular 
        css={ css }
        text={ text } 
        size={ size }
        color={ color }
        className={ className } 
        labelOnclick={ labelOnclick } 
        refTarget={ refTarget }/>
    )
};

export default Label;