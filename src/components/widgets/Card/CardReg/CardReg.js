import CardWrapper from 'react-bootstrap/Card';

export const CardReg = ( { children, keyID, cardClass, cardStyle } ) => {
    
    return (
        <CardWrapper key={ keyID } className={ cardClass } style={{ ...cardStyle }}>
            { children }
        </CardWrapper>
    )
};