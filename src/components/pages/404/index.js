import { styled } from "../../../css/stitches.config";

import Column from "../../core/Column";
import Container from "../../core/Container";
import Row from "../../core/Row";

const Div = styled('div', {
    variants: {
        size: {
            display1: {
                fontSize: '$display2',
            }
        }
    }
});

export const NotFound = () => {
  return (
    <Container type='regular'>
        <Container maxFluid='xl' className='mt-5'>
            <Row className='mt-5'>
                <Column className='d-flex align-items-center justify-content-center' style={{ minHeight: '50vh', }}>
                    <Div size='display1' className='d-flex align-items-center justify-content-center'>
                        Page not found.
                    </Div>
                </Column>
            </Row>
        </Container>
    </Container>
  )
}

export default NotFound;