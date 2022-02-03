import { LabelReg } from "./LabelReg/LabelReg";

export const LabelIdx = ({ text, labelClass, labelOnclick, refTarget }) => {
    return (
        <LabelReg text={ text } labelClass={ labelClass } labelOnclick={ labelOnclick } refTarget={ refTarget }/>
    )
};
