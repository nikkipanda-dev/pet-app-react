import { styled } from "../../../../css/stitches.config";

const Span = styled('span', {
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
