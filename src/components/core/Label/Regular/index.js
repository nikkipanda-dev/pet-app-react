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
            neutral: {
                color: '$darkGray',
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
    },
    '&.label-file': {
        cursor: 'pointer',
        border: 'solid $gray100',
        borderWidth: '$borderThin',
        fontWeight: '$weight600',
        borderRadius: '10px',
        background: 'transparent',
        padding: '5px 10px',
        '$:hover': {
            background: 'transparent',
        }
    },
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
