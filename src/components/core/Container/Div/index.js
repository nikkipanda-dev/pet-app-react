import { styled } from "../../../../css/stitches.config";

const Div = styled('div', {
    display: 'flex',
    width: '100%',
    variants: {
        color: {
            neutral: {
                background: '$pastelGray',
            },
            dark: {
                background: '$gray100',
            },
            white: {
                background: '#fff',
            },
        }
    }
})

export const Fluid = ({ css, color, children, className, style, hidden, refTarget }) => {
    return (
        <Div 
            css={{ ...css }}
            color={ color }
            className={ className } 
            style={{ ...style }} 
            hidden={ hidden }
            ref={ refTarget }>
            { children }
        </Div>
    )
};
