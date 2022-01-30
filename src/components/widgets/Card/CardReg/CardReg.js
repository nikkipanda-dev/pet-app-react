import CardWrapper from 'react-bootstrap/Card';

export const CardReg = ( { children, cardClass, cardStyle } ) => {
    
    return (
        <CardWrapper className={ cardClass } style={{ ...cardStyle }}>
            { children }
        </CardWrapper>
    )
};