import { styled, riseUp } from "../../../../css/stitches.config";

const Button = styled('button', {
    fontFamily: 'Fira Sans',
    fontSize: '1.3rem',
    padding: '.2rem 1rem',
    borderRadius: '10px',
    transition: 'all .2s',
    variants: {
        color: {
            yellow: {
                '&:hover': {
                    background: 'linear-gradient(to right, $yellow200 0%, $tangerine200 100%);',
                    animation: `${riseUp} .1s 1 normal forwards`,
                },
            },
            neutral: {
                '&:hover': {
                    background: 'linear-gradient(to right, $gray100 0%, $gray200 100%);',
                    animation: `${riseUp} .1s 1 normal forwards`,
                },
            },
        },
    },
    '&:hover': {
        transition: 'all .2s',
        color: '$dark100',
    } 
});

export const Modal = ({ text, css, color, btnOnclick, className, btnStyle, targetID }) => {
    return (
        <Button 
        className={ className }
        onClick={ (evt) => btnOnclick(evt) } 
        data-target-id={ targetID } 
        css={{ ...css }}
        color={ color }>
            { text }
        </Button>
    )
};
