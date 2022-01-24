import { useState, useEffect, useRef } from 'react';

import { Container } from "react-bootstrap";

// Widgets
import { Navbar } from "./components/widgets/Navbar";
import { Footer } from './components/widgets/Footer';
import { Card } from './components/widgets/Card';

// Styling
import './bootstrap.css';
import './css/style.css';

// Bootstrap bundle
import 'react-bootstrap/dist/react-bootstrap.min.js';

export const App = () => {
    // toggle modal
    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(true) }
    const handleClose = () => { setShow(false) }

    return (
        <>
            <Navbar 
                modalToggle={ true } 
                modalShown={ show }
                modalOnclick={ handleShow } 
                modalOnhide={ handleClose }
                modalBtnText='Click me'
            />
            <Container fluid="md" className="mt-5 bg-warning">
                <div>I am inside div</div>
                <Card cardClass='bg-success'/>
            </Container>
            <Container>
                <Footer />
            </Container>
        </>
    );
}