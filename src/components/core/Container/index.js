import PropTypes from 'prop-types';
import { ContainerReg } from './ContainerReg/ContainerReg';

export const ContainerIdx = ({ children, fluid, containerStyle, containerClass }) => {
    return (
        <ContainerReg 
            fluid={ fluid } 
            containerStyle={ containerStyle ? containerStyle : false } 
            containerClass={ containerClass }
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