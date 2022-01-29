import Container from "react-bootstrap/Container";

export const ContainerReg = ({ children , fluid, containerStyle, containerClass}) => {
    return (
        <Container 
            fluid={ fluid } 
            className={ containerClass } 
            style={{ ...containerStyle }}
        >
            { children }
        </Container>
    )
};
