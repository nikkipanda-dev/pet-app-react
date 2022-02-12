import { styled } from "../../../../css/stitches.config";

const Anchor = styled('a', {
    textDecoration: 'none',
    fontSize: '1.3rem',
    fontWeight: 300,
    transition: 'all .1s',
    variants: {
        color: {
            neutral: {
                color: '$gray200',
            },
            tangerine: {
                color: '$tangerine200',
            }
        }
    },
    '&.navbar-link': {
        fontWeight: 400,
    },
    '&:hover': {
        color: '$dark100',
        transition: 'all .1s',                 
    },   
});

export const Modal = ({ color, css, text, anchorOnclick, className, dataTargetUserId, dataTargetPostId, dataTargetBody }) => {
    return (
        <Anchor 
        css={{ ...css }}
        color={ color }
        onClick={ evt => anchorOnclick(evt) } 
        className={ className } 
        data-target-user-id={ dataTargetUserId } 
        data-target-post-id={ dataTargetPostId } 
        data-target-body={ dataTargetBody }>
            { text }
        </Anchor>
    )
};