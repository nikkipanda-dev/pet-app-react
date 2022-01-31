import { Link } from "react-router-dom";

import { ContainerIdx } from "../../core/Container";
import { RowIdx } from "../../core/Row";
import { ColIdx } from "../../core/Column";

const Footer = () => {
    const footerStyle= {
        minHeight: '30vh',
        background: '#22223b',
    }
    return (
        <ContainerIdx 
            fluid={ true }  
            containerStyle={ footerStyle } 
            containerClass='mt-5'
        >
            <span className="text-white">F.A.Q.</span>
            <span className="text-white">About</span>
            <span className="text-white">Contact Us</span>
        </ContainerIdx>
    )
};

export default Footer;