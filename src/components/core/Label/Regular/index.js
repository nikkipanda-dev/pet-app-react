import { styled } from "../../../../css/stitches.config";

const Label = styled('label', {
    fontFamily: 'Fira Sans',
    fontWeight: '200',
});

export const Regular = ({ css, color, text, className, labelOnclick, refTarget }) => {
    return (
        <Label 
            css={{ ...css }} 
            color={ color }
            className={ className } 
            onClick={ () => labelOnclick(refTarget) }>
            { text }
        </Label>
    )
};
