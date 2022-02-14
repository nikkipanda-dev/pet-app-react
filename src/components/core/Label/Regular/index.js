import { styled } from "../../../../css/stitches.config";

const Label = styled('label', {
    fontFamily: 'Fira Sans',
    fontWeight: '300',
    variants: {
        size: {
            tiny: {
                fontSize: '$tiny',
            },
            regular: {
                fontSize: '$regular',
            },
            medium: {
                fontSize: '$medium',
            },
            display1: {
                fontSize: '$display1',
            },
            display2: {
                fontSize: '$display2',
            },
            display3: {
                fontSize: '$display3',
            },
        },
        color: {
            dark: {
                color: '$dark100',
            },
            tangerine: {
                color: '$tangerine200',
            },
            yellow: {
                color: '$yellow200',
            },
            cyan: {
                color: '$cyan200',
            }
        },
    }
});

export const Regular = ({ css, color, text, size, className, labelOnclick, refTarget }) => {
    return (
        <Label 
            css={{ ...css }} 
            color={ color }
            size={ size }
            className={ className } 
            onClick={ () => labelOnclick(refTarget) }>
            { text }
        </Label>
    )
};
