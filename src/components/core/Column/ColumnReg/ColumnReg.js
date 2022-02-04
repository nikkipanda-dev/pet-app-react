import Col from 'react-bootstrap/Col';

export const ColumnReg = ({ children, columnClass, columnStyle, xs, sm, md, lg, xl, xxl, refTarget }) => {
    return (
        <Col 
            xs={ xs } 
            sm={ sm } 
            md={ md } 
            lg={ lg } 
            xl={ xl } 
            xxl={ xxl } 
            className={ columnClass } 
            style={{ ...columnStyle }} 
            { ...refTarget && { ref: refTarget }}
        >
            { children }
        </Col>
    )
};
