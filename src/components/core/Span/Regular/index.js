import { styled } from "../../../../css/stitches.config";

const Span = styled('span', {
    variants: {
        color: {
            gray: {
                color: '$darkGray',
            },
            dark: {
                color: '$dark100',
            },
            tangerine: {
                color: '$darkTangerine',
            },
            yellow: {
                color: '$darkYellow',
            },
            cyan: {
                color: '$darkCyan',
            },
            danger: {
                color: '$error',
            },
        },
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
        }
    },
    '&.handle': {
        '&::before': {
            content: `@`,
        }
    }
});

export const Regular = ({ css, color, text, size, className, onClick, dataTarget }) => {
    return (
        <Span
        className={ className }
        css={{ ...css }}
        size={ size }
        color={ color }
        { ...onClick && { onClick: evt => onClick(evt) }}
        data-target={ dataTarget }>
            { text }
        </Span>
    )
};
