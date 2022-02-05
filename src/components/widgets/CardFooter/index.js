import CardFooterWrapper from 'react-bootstrap/Card';

export const CardFooter = ({ cardFooterContext, CardFooterClass }) => {
    return (
        <CardFooterWrapper.Footer className={ CardFooterClass }>
            { cardFooterContext }
        </CardFooterWrapper.Footer>
    )
};

export default CardFooter;