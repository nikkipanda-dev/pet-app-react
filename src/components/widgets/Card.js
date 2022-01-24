import CardWrapper from 'react-bootstrap/Card';

import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader }from './CardHeader';

export const Card = ( { cardClass } ) => {
    return (
        <CardWrapper className={ cardClass }>
            <CardHeader cardHeaderContext='I am a header title' cardHeaderClass='bg-primary'/>
            <CardBody cardBodyContext='Default body context' cardBodyClass='bg-warning'/>
            <CardFooter cardFooterContext='Default footer context' cardFooterClass='bg-dark'/>
        </CardWrapper>
    )
};
