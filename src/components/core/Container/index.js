import PropTypes from 'prop-types';
import { ContainerReg } from './ContainerReg/ContainerReg';
import { Div } from './Div/Div';

export const ContainerIdx = ({ type, children, fluid, containerStyle, containerClass, hidden }) => {
    return (
        (type === 'regular') ?
            <Div 
                divClass={ containerClass } 
                divStyle={ containerStyle } 
                hidden={ hidden ? true : false }
            >
                { children }
            </Div> :
            <ContainerReg 
                fluid={ fluid } 
                containerStyle={ containerStyle ? containerStyle : false } 
                containerClass={ containerClass } 
                hidden={ hidden ? true : false }
            >
                { children }
            </ContainerReg>
    )
};

ContainerIdx.propTypes = {
    'fluid': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    'containerClass': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    'containerStyle': PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ])
}

ContainerIdx.defaultProps = {
    'fluid': false,
    'containerClass': '',
    'containerStyle': false,
}