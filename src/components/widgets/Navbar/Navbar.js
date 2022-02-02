import { useState, createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosDef from "../../../util/Request";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { ModalIdx } from "../Modal";
import { ContainerIdx } from "../../core/Container";
import { AnchorIdx } from "../../core/Anchor";
import { ImgIdx } from '../../core/Image';
import FormIdx from "../Form";
import { LabelIdx } from "../../core/Label";
import { InputIdx } from "../../core/Input";
import { BtnIdx } from "../../core/Button";

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

                        // console.log(Cookies.get('x_auth_user'));
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
            <ContainerIdx 
                fluid={ true } 
                containerStyle={ navbarStyle } 
                containerClass='position-fixed d-flex align-items-center'
            >
                <ContainerIdx fluid='xl' containerClass='d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center'>
                    <div>
                        <Link to={Cookies.get('x_auth_secret_tk') ? '/home' : '/'}>
                            <ImgIdx src='/pup_patrol_logo.png' imgStyle={{ objectFit: 'cover', width: '40px', height: '40px', }}/>
                        </Link>
                    </div>
                    <div className="d-flex flex-wrap">
                        { Cookies.get('x_auth_secret_tk') ? 
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
                modalHeader=''
                isShown={ navModal } 
                btnOnhide={ hideNavModal } 
            >
                <FormIdx action='#' method='POST' encType='multipart' onSubmit={ authenticate }>
                    <LabelIdx 
                        text='Email address:' 
                        labelClass='form-label' 
                        refTarget={ authEmailRef } 
                        labelOnclick={ focusField }
                    />
                    <InputIdx
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
                    <LabelIdx 
                        text='Password:' 
                        labelClass='form-label' 
                        refTarget={ authPasswordRef } 
                        labelOnclick={ focusField }
                    />
                    <InputIdx
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
                    <BtnIdx type='regular' text='Log In' btnClass='btn btn-purple'/>
                </FormIdx>
            </ModalIdx>
        </>
    );
};