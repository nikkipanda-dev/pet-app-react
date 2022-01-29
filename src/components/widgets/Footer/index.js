import { ContainerIdx } from "../../core/Container";

const Footer = () => {
    const footerStyle= {
        minHeight: '10vh',
        background: 'transparent',
        width: '100vw',
    }

    return (
        <ContainerIdx 
            fluid='md' 
            containerStyle={ footerStyle }
        >
            Footer here
        </ContainerIdx>
    )
};

export default Footer;