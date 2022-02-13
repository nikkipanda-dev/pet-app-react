import { styled } from "../../../../css/stitches.config";

const Span = styled('span', {
    variants: {
        color: {
            gray: {
                color: '$darkGray',
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
