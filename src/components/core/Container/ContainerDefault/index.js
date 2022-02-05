import Container from "react-bootstrap/Container";

export const ContainerDefault = ({ children , fluid, containerStyle, containerClass, hidden }) => {
    return (
        <Container 
            fluid={ fluid } 
            className={ containerClass } 
            style={{ ...containerStyle }}
            hidden={ hidden }
        >
            { children }
        </Container>
    )
};
