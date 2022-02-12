import PropTypes from 'prop-types';
import { Responsive } from './ContainerDefault';
import { Fluid } from './Div';

export const Container = ({ css, color, type, children, maxFluid, style, className, hidden, refTarget }) => {
    return (
        (type === 'regular') ?
        <Fluid
        css={ css }
        color={ color }
        className={ className } 
        style={ style } 
        refTarget={ refTarget }
        hidden={ hidden ? true : false }>
            { children }
        </Fluid> :
        <Responsive 
        maxFluid={ maxFluid } 
        style={ style ? style : false } 
        className={ className } 
        hidden={ hidden ? true : false }>
            { children }
        </Responsive>
    )
};

Container.propTypes = {
    'maxFluid': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    'className': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    'style': PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ])
}

Container.defaultProps = {
    'maxFluid': false,
    'className': '',
    'style': false,
}

export default Container;