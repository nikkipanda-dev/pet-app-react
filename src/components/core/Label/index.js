import { Regular } from "./Regular";

export const Label = ({ text, labelClass, labelOnclick, refTarget }) => {
    return (
        <Regular text={ text } labelClass={ labelClass } labelOnclick={ labelOnclick } refTarget={ refTarget }/>
    )
};

export default Label;