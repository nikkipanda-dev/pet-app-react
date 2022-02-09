import { useState, createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosDef from "../../../util/Request";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import Modal from "../Modal";
import Container from "../../core/Container";
import Anchor from "../../core/Anchor";
import Image from '../../core/Image';
import Form from "../Form";
import Label from "../../core/Label";
import Input from "../../core/Input";
import Button from "../../core/Button";

export const Navbar = () => {
    // TODO: custom div

    const navigate = useNavigate();
    
    const navbarStyle = {
        backgroundColor: '#4b507a',
        minHeight: '7vh',
        zIndex: '9999',
    }

    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    const authEmailRef = createRef();
    const authPasswordRef = createRef();

    const [validateLogin, setValidateLogin] = useState(false);
    const [loginErr, setLoginErr] = useState({});

    const focusField = evt => {
        evt.current.focus();
    }

    // trigger modal
    const [navModal, setNavModal] = useState(false);
    const showNavModal = () => { setNavModal(true) }
    const hideNavModal = () => { setNavModal(false) }

    const authenticate = evt => {
        evt.preventDefault();

        setValidateLogin(true);

        const loginForm = new FormData(evt.target);

        axiosDef.get('http://localhost:8000/sanctum/csrf-cookie')
            .then(res => {
                axiosDef.post('http://localhost:8000/api/login', loginForm)

                .then (res => {
                    const loginRes = res.data;

                    if (loginRes.isSuccess) {
                        Cookies.set('x_auth_user', JSON.stringify(loginRes.data), { sameSite: 'strict', secure: true });
                        Cookies.set('x_auth_secret_tk', loginRes.secret, { sameSite: 'strict', secure: true });

                        hideNavModal(false);

                        return (
                            navigate('home')
                        );
                    }
                })

                .catch (err => {
                    if (err.response) {
                        const loginErrBag = err.response.data.errors;

                        Object.keys(loginErrBag).forEach((i, val) => {
                            setLoginErr({...loginErrBag, [i]: Object.values(loginErrBag)[val][0]});
                        })
                    }
                })
        });
    }

    return (
        <>
            <Container 
                fluid={ true } 
                containerStyle={ navbarStyle } 
                containerClass='position-fixed d-flex align-items-center'
            >
                <Container fluid='xl' containerClass='d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center'>
                    <div>
                        <Link to={Cookies.get('x_auth_secret_tk') ? '/home' : '/'}>
                            <Image src='/pup_patrol_logo.png' imgStyle={{ objectFit: 'cover', width: '40px', height: '40px', }}/>
                        </Link>
                    </div>
                    <div className="d-flex flex-wrap">
                        { Cookies.get('x_auth_secret_tk') ? 
                            <>
                                <Link to='home' className='navbar-link me-3'>Home</Link>
                                <Anchor type='regular' text='Profile' href={ new URL('u/' + JSON.parse(Cookies.get('x_auth_user'))['username'], 'http://localhost:3000') } anchorClass='navbar-link me-3' isTargetBlank={ false } />
                                <Link to={ '/u/' + JSON.parse(Cookies.get('x_auth_user'))['username'] + '/settings' } className='navbar-link me-3'>Settings</Link> 
                                <a href='/' className='navbar-link'><FontAwesomeIcon icon={faSignOutAlt}/></a>
                            </> :
                            <Anchor 
                                type='modal' 
                                text='Log In' 
                                anchorClass='navbar-link me-3' 
                                anchorOnclick={ showNavModal }
                            />
                        }
                    </div>
                </Container>
            </Container>
            <Modal 
                type='regular' 
                modalSize='md' 
                modalHeader=''
                isShown={ navModal } 
                btnOnhide={ hideNavModal } 
            >
                <Form action='#' method='POST' encType='multipart' onSubmit={ authenticate }>
                    <Label 
                        text='Email address:' 
                        labelClass='form-label' 
                        refTarget={ authEmailRef } 
                        labelOnclick={ focusField }
                    />
                    <Input
                        fieldType='regular' 
                        refTarget={ authEmailRef } 
                        inputClass='form-control' 
                        validationType='email' 
                        type='email' 
                        name='email' 
                        onChange={ setAuthEmail } 
                        value={ authEmail } 
                        alertAttr='email address' 
                        validateInput={ validateLogin } 
                        setIsValidateInput={ setValidateLogin } 
                        // isError={ isRegisterError } 
                        // setIsError={ setIsRegisterError } 
                        alertClass='text-alert red-300 mb-4' 
                        errorMsg={ loginErr } 
                        fieldType='regular'
                    />
                    <Label 
                        text='Password:' 
                        labelClass='form-label' 
                        refTarget={ authPasswordRef } 
                        labelOnclick={ focusField }
                    />
                    <Input
                        fieldType='regular' 
                        refTarget={ authPasswordRef } 
                        inputClass='form-control' 
                        validationType='password' 
                        type='password' 
                        name='password' 
                        onChange={ setAuthPassword } 
                        value={ authPassword } 
                        alertAttr='password' 
                        validateInput={ validateLogin } 
                        setIsValidateInput={ setValidateLogin } 
                        // isError={ isRegisterError } 
                        // setIsError={ setIsRegisterError } 
                        alertClass='text-alert red-300 mb-4' 
                        errorMsg={ loginErr } 
                        fieldType='regular'
                    />
                    <Button type='regular' text='Log In' btnClass='btn btn-purple'/>
                </Form>
            </Modal>
        </>
    );
};

export default Navbar;