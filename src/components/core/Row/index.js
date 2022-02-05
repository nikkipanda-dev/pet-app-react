import PropTypes from 'prop-types';
import { Regular } from "./RowReg";

export const Row = ({ children, rowClass, rowStyle, xs, sm, md, lg, xl, xxl }) => {
    return (
        <Regular 
            rowClass={ rowClass ? rowClass : '' } 
            rowStyle={ rowStyle } 
            xs={ xs } 
            sm={ sm } 
            md={ md } 
            lg={ lg } 
            xl={ xl } 
            xxl={ xxl } 
        >
            { children }
        </Regular>
    )
};

Row.propTypes = {
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
}

Row.defaultProps = {
    'xs': false,
    'sm': false,
    'md': false,
    'lg': false,
    'xl': false,
    'xxl': false,
}

export default Row;