import CardWrapper from 'react-bootstrap/Card';

export const Regular = ( { children, keyID, cardClass, cardStyle } ) => {    
    return (
        <CardWrapper { ...keyID && { key: keyID }} className={ cardClass } style={{ ...cardStyle }}>
            { children }
        </CardWrapper>
    )
};