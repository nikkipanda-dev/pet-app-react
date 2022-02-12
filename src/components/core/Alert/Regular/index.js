import { styled } from "../../../../css/stitches.config";

const Alert = styled('div', {
    fontSize: '.8rem',
    variants: {
        color: {
            tangerine: {
                color: '$error',
            }
        }
    }
});

export const Regular = ({ css, color, children, className }) => {
    return (
        <Alert 
        css={{ ...css }}
        color={ color }
        className={ className }>
            { children }
        </Alert>
    )
};