import Row from 'react-bootstrap/Row';

export const Regular = ({ children, className, style, xs, sm, md, lg, xl, xxl }) => {
    return (
        <Row 
            xs={ xs } 
            sm={ sm } 
            md={ md } 
            lg={ lg } 
            xl={ xl } 
            xxl={ xxl } 
            className={ className } 
            style={{ ...style }}
        >
            { children }
        </Row>
    )
};
