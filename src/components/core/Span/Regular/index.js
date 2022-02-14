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
        }
    },
    '&.handle': {
        '&::before': {
            content: `@`,
        }
    }
});

export const Regular = ({ css, color, text, className, onClick, dataTarget }) => {
    return (
        <Span
        className={ className }
        css={{ ...css }}
        color={ color }
        { ...onClick && { onClick: evt => onClick(evt) }}
        data-target={ dataTarget }>
            { text }
        </Span>
    )
};
