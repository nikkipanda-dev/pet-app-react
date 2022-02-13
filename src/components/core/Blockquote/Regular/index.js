import { styled } from '../../../../css/stitches.config'

const Blockquote = styled('blockquote', {
    width: '100%',
    variants: {
        size: {
            tiny: {
                fontSize: '$tiny',
            },
            regular: {
                fontSize: '$regular',
            },
            medium: {
                fontSize: '$medium',
            },
            display1: {
                fontSize: '$display1',
            },
            display2: {
                fontSize: '$display2',
            },
            display3: {
                fontSize: '$display3',
            },
        },
        height: {
            condensed: {
                lineHeight: '$condensed',
            },
            expand: {
                lineHeight: '$expand',
            }
        },
        letterSpacing: {
            normal: {
                letterSpacing: '$normal',
            },
            expand: {
                letterSpacing: '$expand',
            }
        },
        border: {
            dark: {
                borderLeft: '.1rem solid $gray200',
            }
        }
    }
});

export const Regular = (
    {
        children, 
        css, 
        color, 
        border, 
        height, 
        letterSpacing, 
        size, 
        className 
    }
) => {
    return ( 
        <Blockquote
        css={ css }
        color={ color }
        border={ border }
        height={ height }
        letterSpacing={ letterSpacing }
        size={ size }
        className={ className }>
            { children }
        </Blockquote>
    )
}
