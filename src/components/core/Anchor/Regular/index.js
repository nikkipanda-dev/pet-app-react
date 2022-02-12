import { styled } from "../../../../css/stitches.config";

const Anchor = styled('a', {
    textDecoration: 'none',
    fontSize: '1.3rem',
    fontWeight: 300,
    variants: {
        color: {
            yellow: {
                color: '$yellow200',          
            }
        }
    }, 
});

export const Regular = ( { text, color, css, href, isTargetBlank, className, anchorOnclick }) => {
    console.log('regular')

    return (
        <Anchor 
        css={{ ...css }}
        color={ color }
        { ...href && { href: href }} 
        className={ className } 
        target={ isTargetBlank ? '_blank' : '' } >
            { text }
        </Anchor>
    )
};