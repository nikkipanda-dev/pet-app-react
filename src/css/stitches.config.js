import { createStitches } from '@stitches/react';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
} = createStitches({
    prefix: 'draw',
    theme: {
        colors: {
            cyan100: '#90ffff',
            cyan200: '#00fafa',
            gray100: '#ececec',
            gray200: '#d8d8d8',
            yellow100: '#fff5a6',
            yellow200: '#ffed66',
            tangerine100: '#ffbf69',
            tangerine200: '#ff9f1c',
            dark100: '#3b3b3b',
            dark200: '#1a1a1a',
        },
        space: {
            1: '5px',
            2: '10px',
            3: '15px',
        },
        fontSizes: {
            12: '12px',
            13: '13px',
            15: '15px',
        },
        fontWeights: {
            weight200: '200',
            weight300: '300',
            weight400: '400',
        },
        lineHeights: {},
        letterSpacings: {},
        sizes: {},
        borderWidths: {
            'borderThin': '1px',
            'borderMedium': '3px',
            'borderThick': '10px',
        },
        borderStyles: {},
        radii: {},
        shadows: {},
        zIndices: {
            zIndex5: '5',
            zIndex10: '10',
        },
        transitions: {},
    },    
    media: {
        bp1: '(min-width: 480px)',
    },
    utils: {
        marginX: (value) => ({ marginLeft: value, marginRight: value }),
    },
});

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: '16px',
        font: 'inherit',
        verticalAlign: 'baseline',
    },
    'a:hover': {
        cursor: 'pointer',
    },
    '@import': ["url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,200;0,300;1,200;1,300&display=swap')", "url('https://fonts.googleapis.com/css2?family=Zen+Kurenaido&display=swap')"], 
});

// animations
export const riseUp = keyframes({
    '0%': { transform: 'translateY(0px)' },
    '100%': { transform: 'translateY(-5px)' },
});  

export const yellowLinearGradient = keyframes({
    '0%': { background: 'linear-gradient(to right, $yellow200 0%, $tangerine200 100%)' },
    '20%': { background: 'linear-gradient(to right, $tangerine200 0%, $tangerine200 100%)' },
    '100%': { background: 'linear-gradient(to right, $tangerine200 0%, $yellow200 100%)' },
});