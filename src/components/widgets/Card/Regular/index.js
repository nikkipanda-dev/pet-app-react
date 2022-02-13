import { styled } from '../../../../css/stitches.config';
import Row from '../../../core/Row';
import Column from '../../../core/Column';

const Div = styled('div', {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    '& > .body': {
        flex: '90%',
    },
    '& > .footer': {
        flex: '10%',
    },
    variants: {
        color: {
            neutral: {
                background: '$pastelGray',
            },
            yellow: {
                background: '$pastelYellow',
            },
            white: {
                background: '#fff',
            },
        }
    }
});

export const Regular = ({ children, css, color, className }) => {    
    return (
        <Div 
        css={{ ...css }}
        color={ color }
        className={ className }>
            { children }
        </Div>
    )
};