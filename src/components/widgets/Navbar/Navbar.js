import { useState } from "react";
import { Link } from "react-router-dom";


import { ContainerIdx } from "../../core/Container";
import { AnchorIdx } from "../../core/Anchor";

export const Navbar = () => {
    const navbarContext = {
        'text': '',
        'href': '',
        'type': '',
        'isTargetBlank': false,
    }

    const navbarStyle = {
        backgroundColor: 'white',
        minHeight: '10vh',
    }

    return (
        <>
            <ContainerIdx 
                fluid={ true } 
                containerStyle={ navbarStyle } 
                containerClass='sticky-top d-flex align-items-center'
            >
                <ContainerIdx fluid='md' containerClass='d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center'>
                    <div>
                        <span className='text-white'>Brand</span>
                    </div>
                    <div className="d-flex flex-wrap">
                        <Link to='home' className='navbar-link me-3'>Home</Link>
                        <Link to='profile' className='navbar-link me-3'>Profile</Link>
                        <Link to='settings' className='navbar-link'>Settings</Link>
                    </div>
                </ContainerIdx>
            </ContainerIdx>
        </>
    );
};