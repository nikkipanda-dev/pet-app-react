import PropTypes from 'prop-types';
import { ContainerDefault } from './ContainerDefault';
import { Div } from './Div';

export const Container = ({ type, children, fluid, containerStyle, containerClass, hidden, refTarget }) => {
    return (
        (type === 'regular') ?
            <Div 
                divClass={ containerClass } 
                divStyle={ containerStyle } 
                refTarget={ refTarget }
                hidden={ hidden ? true : false }
            >
                { children }
            </Div> :
            <ContainerDefault 
                fluid={ fluid } 
                containerStyle={ containerStyle ? containerStyle : false } 
                containerClass={ containerClass } 
                hidden={ hidden ? true : false }
            >
                { children }
            </ContainerDefault>
    )
};

Container.propTypes = {
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

Container.defaultProps = {
    'fluid': false,
    'containerClass': '',
    'containerStyle': false,
}

export default Container;