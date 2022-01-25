import CardBodyWrapper from 'react-bootstrap/Card';

export const CardBody = ({ cardBodyContext, cardBodyClass }) => {
    return (
        <CardBodyWrapper.Body className={ cardBodyClass }>
            { cardBodyContext }
        </CardBodyWrapper.Body>
    )
};
