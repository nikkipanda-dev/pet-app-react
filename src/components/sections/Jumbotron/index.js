import Container from "../../core/Container";

export const Jumbotron = ({ children, className, style }) => {
    return (
        <Container 
        type='regular' 
        className={ className } 
        style={{ ...style }}>
            { children }
        </Container>
    )
};

export default Jumbotron;