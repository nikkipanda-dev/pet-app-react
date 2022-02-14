import { useState, createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosDef from "../../../util/Request";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import Modal from "../Modal";
import Container from "../../core/Container";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Anchor from "../../core/Anchor";
import Image from '../../core/Image';
import Form from "../Form";
import Label from "../../core/Label";
import Input from "../../core/Input";
import Button from "../../core/Button";

export const Navbar = () => {
    const navigate = useNavigate();
    
    const navbarStyle = {
        background: '#fff',
        minHeight: '7vh',
        zIndex: '9999',
        borderBottom: '.05rem solid $gray100',
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
                        Cookies.set('x_auth_secret_tk', JSON.stringify(loginRes.secret), { sameSite: 'strict', secure: true });

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

    const logout = evt => {
        evt.preventDefault();

        const logoutForm = new FormData();
        logoutForm.append('id', parseInt(JSON.parse(Cookies.get('x_auth_user'))['id'], 10));
        logoutForm.append('token', parseInt(JSON.parse(Cookies.get('x_auth_secret_tk')).match(/[^|]*/), 10));

        axiosDef.post('http://localhost:8000/api/logout', logoutForm)

        .then (res => {
            console.log('res ', res.data);
            const logoutRes = res.data;

            if (logoutRes.isSuccess) {
                Cookies.remove('x_auth_user');
                Cookies.remove('x_auth_secret_tk');
                Cookies.remove('laravel_session');
                Cookies.remove('XSRF-TOKEN');

                navigate('/');
            } else {
                console.log('logoutRes err' , logoutRes.data);
            }
        })

        .catch (err => {
            console.log('err ' , err.response.data.errors);
        })
    }

    return (
        <>
            <Container 
                type='regular'
                css={ navbarStyle } 
                className='position-fixed d-flex align-items-center'>
                <Container maxFluid='xl'>
                    <Row>
                        <Column 
                        className='ps-auto ps-sm-5 d-flex flex-column flex-sm-row justify-content-center justify-content-sm-start align-items-center' 
                        sm={ 2 }>
                            <Link to={Cookies.get('x_auth_secret_tk') ? '/home' : '/'}>
                                <Image src='/pup_patrol_logo.png' size='logo'/>
                            </Link>
                        </Column>
                        <Column 
                        className='pe-auto pe-sm-5 d-flex flex-row flex-wrap justify-content-center justify-content-sm-end align-items-center mt-3 mt-sm-0'
                        sm={ 10 }>
                        { 
                            Cookies.get('x_auth_secret_tk') ? 
                            <>
                                <Anchor 
                                type='regular'
                                text='Home' 
                                color='tangerine'
                                to='home'
                                className='navbar-link me-2'/>
                                <Anchor 
                                type='regular'
                                text='Profile' 
                                to={ 'u/' + JSON.parse(Cookies.get('x_auth_user'))['username'] }
                                color='tangerine'
                                className='navbar-link me-2'/>
                                <Anchor 
                                type='regular'
                                text='Settings' 
                                to={ 'u/' + JSON.parse(Cookies.get('x_auth_user'))['username'] + '/settings' }
                                color='tangerine'
                                className='navbar-link me-2'/>
                                <Form
                                action='#'
                                method='POST'
                                encType='multipart'
                                onSubmit={ logout }
                                css={{ width: 'auto', }}>
                                    <Button 
                                    type='submit'
                                    text={ <FontAwesomeIcon icon={faSignOutAlt}/> } 
                                    color='yellowNoTranslate'
                                    size='tiny'/>
                                </Form>
                            </> :
                            <Anchor 
                            type='modal' 
                            text='Log In' 
                            className='navbar-link'
                            color='tangerine'
                            onClick={ showNavModal }/>
                        }
                        </Column>
                    </Row>
                </Container>
            </Container>
            <Modal 
                type='regular' 
                modalSize='md' 
                modalHeader=''
                isShown={ navModal } 
                btnOnhide={ hideNavModal } >
                <Form 
                action='#' 
                method='POST' 
                encType='multipart' 
                onSubmit={ authenticate }>
                    <Label 
                        text='Email address:' 
                        className='form-label' 
                        refTarget={ authEmailRef } 
                        labelOnclick={ focusField }/>
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
                        fieldType='regular'/>
                    <Label 
                        text='Password:' 
                        className='form-label' 
                        refTarget={ authPasswordRef } 
                        labelOnclick={ focusField }/>
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
                        fieldType='regular'/>
                    <Button 
                    type='regular' 
                    text='Log In' 
                    color='yellow'/>
                </Form>
            </Modal>
        </>
    );
};

export default Navbar;