import { styled } from "../../../../css/stitches.config"

const Paragraph = styled('p', {
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
        color: {
            dark: {
                color: '$dark100',
            },
            tangerine: {
                color: '$tangerine200',
            },
            yellow: {
                color: '$yellow200',
            },
            cyan: {
                color: '$cyan200',
            }
        },
        textShadow: {
            dark: {
                textShadow: '3px 3px #1a1a1a',
            },
            tangerine: {
                textShadow: '3px 3px #ff9f1c',
            },
            yellow: {
                textShadow: '3px 3px #ffed66',
            },
            cyan: {
                textShadow: '3px 3px #00fafa',
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
        }
    }
});

export const Regular = ({ css, color, size, letterSpacing, height, className, children }) => {
  return (
    <Paragraph
    css={ css }
    color={ color }
    size={ size }
    letterSpacing={ letterSpacing }
    height={ height }
    className={ className }>
        { children }
    </Paragraph>
  )
}
