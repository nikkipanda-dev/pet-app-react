import { styled, riseUp, yellowLinearGradient } from "../../../../css/stitches.config";

const Button = styled('button', {
    fontFamily: 'Fira Sans',
    fontSize: '1.3rem',
    padding: '.2rem 1rem',
    borderRadius: '10px',
    transition: 'all .2s',
    variants: {
        color: {
            yellow: {
                background: 'linear-gradient(to right, $yellow200 0%, $tangerine200 100%)',
                '&:hover': {
                    animation: `${yellowLinearGradient} .2s 1 normal forwards, ${riseUp} .1s 1 normal forwards`
                },
            },
            yellowNoTranslate: {
                background: 'linear-gradient(to right, $yellow200 0%, $tangerine200 100%)',
                '&:hover': {
                    animation: `${yellowLinearGradient} .2s 1 normal forwards`,
                },
            },
            neutral: {
                '&:hover': {
                    background: 'linear-gradient(to right, $gray100 0%, $gray200 100%)',
                    animation: `${riseUp} .2s 1 normal forwards`,
                },
            },
            dark: {
                background: '$gray200',
                '&:hover': {
                    background: '#cbcbcb',
                },
            },
        },
        size: {
            tiny: {
                fontSize: '$tiny',
            }
        }
    },
    '&:hover': {
        transition: 'all .2s',
        color: '$dark100',
    } 
});

export const Regular = ({ css, text, color, size, type, className, btnOnclick, isShown, targetID }) => {
    return (
        <Button 
        css={{ ...css }}
        color={ color } 
        size={ size }
        className={ className }
        type={ type } 
        { ...btnOnclick && { onClick: evt => btnOnclick(evt) }}
        data-is-shown={ isShown } 
        data-target-id={ targetID }>
            { text }
        </Button>
    )
};
