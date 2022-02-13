import { styled } from "../../../../css/stitches.config";

const Header = styled('span', {
    display: '$block',
    fontSize: '$medium',
    fontWeight: '$weight500',
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
        textShadow: {
            dark: {
                textShadow: '2px 2px #1a1a1a',
            },
            tangerine: {
                textShadow: '2px 2px #ff9f1c',
            },
            yellow: {
                textShadow: '2px 2px #ffed66',
            },
            cyan: {
                textShadow: '2px 2px #00fafa',
            },
        }
    },
});

export const Regular = ({ css, color, size, text, textShadow, className }) => {
    return (
        <Header 
        className={ className }
        css={{ ...css }}
        size={ size }
        color={ color }
        textShadow={ textShadow }>
            { text }
        </Header>
    )
};
