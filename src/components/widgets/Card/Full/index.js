import { styled } from '../../../../css/stitches.config';
import Row from '../../../core/Row';
import Column from '../../../core/Column';

const Div = styled('div', {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'between',
    '& > .header': {
        flex: '20%',
    },
    '& > .body': {
        flex: '70%',
    },
    '& > .footer': {
        flex: '10%',
    },
});

export const Full = ({ children, header, footer, css, color, className }) => {    
    return (
        <Div 
        css={{ ...css }}
        color={ color }
        className={ className }>
            <Div className='header'>
                { header }
            </Div>
            <Div className='body'>
                { children }
            </Div>
            <Div className='footer'>
                { footer }
            </Div>
        </Div>
    )
};