import Container from "react-bootstrap/Container";

export const Responsive = ({ children, maxFluid, style, className, hidden }) => {
    return (
        <Container 
            fluid={ maxFluid } 
            className={ className } 
            style={{ ...style }}
            hidden={ hidden }>
            { children }
        </Container>
    )
};
