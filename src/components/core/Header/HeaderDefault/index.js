import { styled } from "../../../../css/stitches.config";

export const HeaderDefault = ({ css, text, headerClass }) => {
    return (
        <div className={ headerClass }>
            { text }
        </div>
    )
};
