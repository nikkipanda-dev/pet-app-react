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
        backgroundColor: 'transparent',
        minHeight: '10vh',
    }

    return (
        <>
            <ContainerIdx 
                fluid={ true } 
                containerStyle={ navbarStyle } 
                containerClass='sticky-top'
            >
                <ContainerIdx fluid='md'>
                    <Link to='home'>Home</Link>
                    <Link to='profile'>Profile</Link>
                    <Link to='settings'>Settings</Link>
                </ContainerIdx>
            </ContainerIdx>
        </>
    );
};