import Col from 'react-bootstrap/Col';

export const Regular = ({ children, className, style, xs, sm, md, lg, xl, xxl, refTarget }) => {
    return (
        <Col 
        xs={ xs } 
        sm={ sm } 
        md={ md } 
        lg={ lg } 
        xl={ xl } 
        xxl={ xxl } 
        className={ className } 
        style={{ ...style }} 
        { ...refTarget && { ref: refTarget }}>
            { children }
        </Col>
    )
};
