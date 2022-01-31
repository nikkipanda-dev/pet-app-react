import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { ModalIdx } from "../Modal";
import { ContainerIdx } from "../../core/Container";
import { AnchorIdx } from "../../core/Anchor";
import { ImgIdx } from '../../core/Image';

export const Navbar = () => {
    const navbarStyle = {
        backgroundColor: '#4b507a',
        minHeight: '7vh',
    }

    // trigger modal
    const [navModal, setNavModal] = useState(false);
    const showNavModal = () => { setNavModal(true) }
    const hideNavModal = () => { setNavModal(false) }

    return (
        <>
            <ContainerIdx 
                fluid={ true } 
                containerStyle={ navbarStyle } 
                containerClass='sticky-top d-flex align-items-center'
            >
                <ContainerIdx fluid='xl' containerClass='d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center'>
                    <div>
                        <Link to={Cookies.get('secretTk') ? '/home' : '/'}>
                            <ImgIdx src='/pup_patrol_logo.png' imgStyle={{ objectFit: 'cover', width: '40px', height: '40px', }}/>
                        </Link>
                    </div>
                    <div className="d-flex flex-wrap">
                        { Cookies.get('secretTk') ? 
                            <>
                                <Link to='home' className='navbar-link me-3'>Home</Link>
                                <Link to='profile' className='navbar-link me-3'>Profile</Link>
                                <Link to='settings' className='navbar-link me-3'>Settings</Link> 
                                <a href='/' className='navbar-link'><FontAwesomeIcon icon={faSignOutAlt}/></a>
                            </> :
                            <AnchorIdx 
                                type='modal' 
                                text='Log In' 
                                anchorClass='navbar-link me-3' 
                                anchorOnclick={ showNavModal }
                            />
                        }
                    </div>
                </ContainerIdx>
            </ContainerIdx>
            <ModalIdx 
                type='regular' 
                modalSize='md' 
                isShown={ navModal } 
                btnOnhide={ hideNavModal } 
                modalHeader='Test header'
            >
                helo
            </ModalIdx>
        </>
    );
};