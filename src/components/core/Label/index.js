import { Regular } from "./Regular";

export const Label = ({ css, text, color, className, labelOnclick, refTarget }) => {
    return (
        <Regular 
        css={ css }
        text={ text } 
        className={ className } 
        labelOnclick={ labelOnclick } 
        refTarget={ refTarget }/>
    )
};

export default Label;