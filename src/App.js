import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

import { Container } from "react-bootstrap";

// Core
import { AnchorIdx } from './components/core/Anchor';
import { ImgIdx } from './components/core/Image';
import { BadgeIdx } from './components/core/Badge';
import { BtnIdx } from './components/core/Button';
import { ListIdx } from './components/core/List';

// Widgets
// import { Navbar } from "./components/widgets/Navbar/Navbar";
// import { Footer } from './components/widgets/Footer/Footer';
// import { Card } from './components/widgets/Card/Card';
import { ModalIdx } from './components/widgets/Modal';

// Styling
import './css/bootstrap.css';
import './css/style.css';

// Bootstrap bundle
import 'react-bootstrap/dist/react-bootstrap.min.js';

export const App = () => {
    // toggle
    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(true) }
    const handleClose = () => { setShow(false) }

    return (
        <>
            {/* <Navbar 
                isModal={ false }
                modalToggle={ true } 
                modalShown={ show }
                modalOnclick={ handleShow } 
                modalOnhide={ handleClose }
                modalBtnText='Click me'
            /> */}
            <Container fluid="md" className="mt-5 bg-warning">
                <div className='d-flex flex-column align-items-center bg-dark text-white'>
                    <div className='align-self-start'>Core components:</div>
                    <BtnIdx text='Open' type='regular'/>
                    <BtnIdx text='Close' type='regular'/>
                    <BtnIdx text='Close' type='modal' isShown={ show } btnOnclick={ handleShow }/>
                    <ListIdx />
                </div>
                <div className='d-flex flex-column align-items-center bg-dark text-white'>
                    <div className='align-self-start'>Widget components:</div>
                </div>
                <ModalIdx type='regular' btnOnhide={ handleClose } isShown={ show }/>
            </Container>
        </>
    );
}