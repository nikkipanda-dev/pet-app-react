import PropTypes from 'prop-types';
import { ColumnReg } from "./ColumnReg/ColumnReg";

export const ColIdx = ({ children, columnClass, columnStyle, xs, sm, md, lg, xl, xxl }) => {
    return (
        <ColumnReg 
            columnClass={ columnClass } 
            columnStyle={ columnStyle } 
            xs={ xs } 
            sm={ sm } 
            md={ md } 
            lg={ lg } 
            xl={ xl } 
            xxl={ xxl } 
        >
            { children }
        </ColumnReg>
    )
};

ColIdx.propTypes = {
    'columnClass': PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    'columnStyle': PropTypes.oneOfType([
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
}

ColIdx.defaultProps = {
    'columnClass': false,
    'columnStyle': false,
    'xs': false,
    'sm': false,
    'md': false,
    'lg': false,
    'xl': false,
    'xxl': false,
}