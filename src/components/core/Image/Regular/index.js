import { styled } from "../../../../css/stitches.config";

const Image = styled('img', {
    variants: {
        size: {
            logo: {
                width: '40px',
                height: '40px',
                maxHeight: '100%',
                objectFit: 'cover',
            },
            thumbnail: {
                width: '70px',
                height: '70px',
                maxHeight: '100%',
                objectFit: 'cover',
            },
            post: {
                width: '150px',
                height: '150px',
                maxHeight: '100%',
                objectFit: 'cover',
            },
            displayPhoto: {
                width: '300px',
                height: '300px',
                maxHeight: '100%',
                objectFit: 'cover',
            },
            full: {
                width: '100%',
                height: 'auto',
            },
        },
        color: {
            neutral: {
                background: '$gray100',
                padding: '$normal',
                border: 'solid $gray200',
                borderWidth: '$borderThick',
            },
            tangerine: {
                background: 'linear-gradient(to right, $yellow200 0%, $tangerine200 100%) content-box, linear-gradient(to right, $yellow200 0%, $tangerine200 100%) border-box',
                border: 'solid transparent',
                borderWidth: '$borderThick',
            },
        },
        radius: {
            rounded: {
                borderRadius: '$rounded3',
            },
            full: {
                borderRadius: '$roundedFull',
            }
        }
    }
});

export const Regular = ({ src, color, size, className, css, radius }) => {
    return (
        <Image 
        src={ src } 
        color={ color }
        size={ size }
        radius={ radius }
        className={ className } 
        css={{ ...css }}/>
    )
};