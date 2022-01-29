import PropTypes from 'prop-types';
import { RowReg } from "./RowReg/RowReg";

export const RowIdx = ({ children, rowClass, rowStyle }) => {
    return (
        <RowReg rowClass={ rowClass ? rowClass : '' } rowStyle={ rowStyle }>
            { children }
        </RowReg>
    )
};

RowIdx.propTypes = {
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

RowIdx.defaultProps = {
    'xs': false,
    'sm': false,
    'md': false,
    'lg': false,
    'xl': false,
    'xxl': false,
}