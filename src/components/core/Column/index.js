import PropTypes from 'prop-types';
import { Regular } from "./Regular";

export const Column = ({ children, className, style, xs, sm, md, lg, xl, xxl, refTarget }) => {
    return (
        <Regular 
            className={ className } 
            style={ style } 
            xs={ xs } 
            sm={ sm } 
            md={ md } 
            lg={ lg } 
            xl={ xl } 
            xxl={ xxl } 
            refTarget={ refTarget }
        >
            { children }
        </Regular>
    )
};

Column.propTypes = {
    'className': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    'style': PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    'xs': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
    'sm': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
    'md': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
    'lg': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
    'xl': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
    'xxl': PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.bool,
    ]),
    'refTarget': PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
}

Column.defaultProps = {
    'className': false,
    'style': false,
    'xs': false,
    'sm': false,
    'md': false,
    'lg': false,
    'xl': false,
    'xxl': false,
    'refTarget': false,
}

export default Column;