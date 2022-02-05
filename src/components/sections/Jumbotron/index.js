import Container from "../../core/Container";

export const Jumbotron = ({ children, jumbotronClass, jumbotronStyle }) => {
    return (
        <Container fluid={ true } containerClass={ jumbotronClass } containerStyle={ jumbotronStyle }>
            { children }
        </Container>
    )
};

export default Jumbotron;