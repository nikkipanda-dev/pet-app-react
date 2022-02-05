import { Link } from "react-router-dom";

import Container from "../../core/Container";
import Row from "../../core/Row";
import Column from "../../core/Column";

const Footer = () => {
    const footerStyle= {
        minHeight: '30vh',
        background: '#22223b',
    }
    return (
        <Container 
            fluid={ true }  
            containerStyle={ footerStyle } 
            containerClass='mt-5'
        >
            <span className="text-white">F.A.Q.</span>
            <span className="text-white">About</span>
            <span className="text-white">Contact Us</span>
        </Container>
    )
};

export default Footer;