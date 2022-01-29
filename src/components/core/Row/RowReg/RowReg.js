import Row from 'react-bootstrap/Row';

export const RowReg = ({ children, rowClass, rowStyle }) => {
    return (
        <Row className={ rowClass } style={{ ...rowStyle }}>
            { children }
        </Row>
    )
};
