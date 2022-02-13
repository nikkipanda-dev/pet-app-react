import { Link } from "react-router-dom";
import { styled } from "../../../../css/stitches.config";

const style = {
    textDecoration: 'none',
    fontSize: '$medium',
    fontWeight: 300,
    transition: 'all .1s',
    color: '$dark200',
    variants: {
        color: {
            neutral: {
                color: '$gray200',
            },
            tangerine: {
                color: '$tangerine200',
            },
            yellowBg: {
                color: '$yellow200',
                background: '$dark100',
                borderRadius: '10px',
                '&:hover': {
                    color: '$tangerine100',
                }, 
            }
        },
        size: {
            tiny: {
                fontSize: '$tiny',
            },
            medium: {
                fontSize: '$medium',
            }
        },
    },
    '&.navbar-link': {
        fontWeight: 400,
    },
    '&:hover': {
        color: '$dark100',
        transition: 'all .1s',                 
    }, 
}

const Div = styled('div', 
    style,
    {
        '&:hover': {
            cursor: 'pointer',               
        }, 
    }
);

const Anchor = styled('a', style);

export const Regular = (
    {
        text, 
        color, 
        css, 
        size, 
        href, 
        to, 
        isTargetBlank, 
        className, 
        onClick,
    }
) => {
    return (
        (href) ?
        <Anchor 
        css={{ ...css }}
        color={ color }
        href= { href } 
        size={ size }
        className={ className } 
        target={ isTargetBlank ? '_blank' : '' } >
            { text }
        </Anchor> : 
        (onClick) ? 
        <Div color={ color } className={ className } size={ size } onClick={ evt => onClick(evt) }>{ text }</Div> :
        <Link 
        to={ to } 
        className={ className }
        style={{ textDecoration: 'none' }}>
            <Div color={ color } className={ className } size={ size }>{ text }</Div>
        </Link> 
    )
};