import CardHeaderWrapper from 'react-bootstrap/Card';

export const CardHeader = ( { cardHeaderContext, cardHeaderClass }) => {
    return (
        <CardHeaderWrapper.Header className={ cardHeaderClass }>
            { cardHeaderContext }
        </CardHeaderWrapper.Header>
    )
};
