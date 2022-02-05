import Row from 'react-bootstrap/Row';

export const Regular = ({ children, rowClass, rowStyle, xs, sm, md, lg, xl, xxl }) => {
    return (
        <Row 
            xs={ xs } 
            sm={ sm } 
            md={ md } 
            lg={ lg } 
            xl={ xl } 
            xxl={ xxl } 
            className={ rowClass } 
            style={{ ...rowStyle }}
        >
            { children }
        </Row>
    )
};
