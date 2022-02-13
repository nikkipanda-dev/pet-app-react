import axiosDef from '../../../util/Request';
import { useState, createRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Container from '../../core/Container'
import Jumbotron from '../../sections/jumbotron'
import Row from '../../core/Row'
import Column from '../../core/Column'
import Form from '../../widgets/Form'
import Label from '../../core/Label'
import Input from '../../core/Input'
import Button from '../../core/Button'
import Header from '../../core/Header';
import Card from '../../widgets/Card';

const LandingPage = () => {
    const navigate = useNavigate();

    // if registered true
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [validateRegister, setValidateRegister] = useState(false);
    const [isRegisterError, setIsRegisterError] = useState(false);
    const [registerErr, setRegisterErr] = useState({});
    
    // focus input
    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const usernameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const repeatPasswordRef = createRef();

    const focusRegister = el => {
        el.current.focus();
    }

    const register = (evt) => {
        evt.preventDefault();

        // set validate before request
        setValidateRegister(true);

        const registerForm = new FormData(evt.target);
    
        // TODO update client-side validation
        if (!(isRegisterError)) {
            axiosDef.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(() => {
                    axiosDef.post('http://localhost:8000/api/register', registerForm)

                    .then (res => {
                        const registerResponse = res.data;
                        
                        if (registerResponse.isSuccess) {
                            Cookies.set('x_auth_user', JSON.stringify(registerResponse.data), { sameSite: 'strict', secure: true });
                            Cookies.set('x_auth_secret_tk', registerResponse.secret, { sameSite: 'strict', secure: true });

                            return (
                                navigate('home')
                            );
                        } 
                    })

                    .catch (err => {
                        if (err.response) {
                            const regErr = err.response.data.errors;

                            Object.keys(regErr).forEach((i, val) => {
                                console.log('keys: ', i);
                                setRegisterErr({...regErr, [i]: Object.values(regErr)[val][0]});
                            })
                        }
                    })
            })            
        } else {
            console.log('react err');
        }
    }

    return (
        <>
            <Container type='regular'>
                <Container maxFluid='xl' className='mt-5'>
                    <Jumbotron style={{ minHeight: '90vh', }} className='mt-3'>
                        <Row className='m-0'>
                            <Column 
                            className='mt-5 py-3' 
                            md={ 7 } 
                            lg={ 8 } >
                                <Header text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, dolorem necessitatibus!' headerClass='display-5'/>
                            </Column>
                            <Column 
                            className='mt-5 py-3' 
                            md={ 5 } 
                            lg={ 4 }>
                                <Form 
                                action='#' 
                                method='post' 
                                encType='multipart' 
                                onSubmit={ register }>
                                    <Container type='regular' className='d-flex flex-column'>
                                        <Label 
                                            text='First name:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ firstNameRef }/>
                                        <Input 
                                            validationType='name' 
                                            type='text' 
                                            inputClass='form-control' 
                                            refTarget={ firstNameRef } 
                                            name='first_name' 
                                            onChange={ setFirstName } 
                                            value={ firstName } 
                                            alertAttr='first name' 
                                            validateInput={ validateRegister } 
                                            setIsValidateInput={ setValidateRegister } 
                                            isError={ isRegisterError } 
                                            setIsError={ setIsRegisterError } 
                                            alertClass='text-alert red-300 mb-4' 
                                            errorMsg={ registerErr } 
                                            fieldType='regular'/>
                                    </Container>
                                    <Container type='regular' className='d-flex flex-column'>
                                        <Label 
                                            text='Last name:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ lastNameRef }/>
                                        <Input 
                                            validationType='name' 
                                            type='text' 
                                            inputClass='form-control' 
                                            refTarget={ lastNameRef } 
                                            name='last_name' 
                                            onChange={ setLastName } 
                                            value={ lastName } 
                                            alertAttr='last name' 
                                            validateInput={ validateRegister } 
                                            setIsValidateInput={ setValidateRegister } 
                                            isError={ isRegisterError } 
                                            setIsError={ setIsRegisterError } 
                                            alertClass='text-alert red-300 mb-4' 
                                            errorMsg={ registerErr } 
                                            fieldType='regular'/>
                                    </Container>
                                    <Container type='regular' className='d-flex flex-column'>
                                        <Label 
                                            text='Username:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ usernameRef }/>
                                        <Input 
                                            validationType='name' 
                                            type='text' 
                                            inputClass='form-control' 
                                            refTarget={ usernameRef } 
                                            name='username' 
                                            onChange={ setUsername } 
                                            value={ username } 
                                            alertAttr='username' 
                                            validateInput={ validateRegister } 
                                            setIsValidateInput={ setValidateRegister } 
                                            isError={ isRegisterError } 
                                            setIsError={ setIsRegisterError } 
                                            alertClass='text-alert red-300 mb-4' 
                                            errorMsg={ registerErr } 
                                            fieldType='regular'/>
                                    </Container>
                                    <Container type='regular' className='d-flex flex-column'>
                                        <Label 
                                            text='Email:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ emailRef }/>
                                        <Input 
                                            validationType='email' 
                                            type='email' 
                                            inputClass='form-control' 
                                            refTarget={ emailRef } 
                                            name='email' 
                                            onChange={ setEmail } 
                                            value={ email } 
                                            alertAttr='email address' 
                                            validateInput={ validateRegister } 
                                            setIsValidateInput={ setValidateRegister } 
                                            isError={ isRegisterError } 
                                            setIsError={ setIsRegisterError } 
                                            alertClass='text-alert red-300 mb-4' 
                                            errorMsg={ registerErr } 
                                            fieldType='regular'/>
                                    </Container>
                                    <Container type='regular' className='d-flex flex-column'>
                                        <Label 
                                            text='Password:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ passwordRef }/>
                                        <Input 
                                            validationType='password' 
                                            type='password' 
                                            inputClass='form-control' 
                                            refTarget={ passwordRef } 
                                            name='password' 
                                            onChange={ setPassword } 
                                            value={ password } 
                                            alertAttr='password' 
                                            validateInput={ validateRegister } 
                                            setIsValidateInput={ setValidateRegister } 
                                            isError={ isRegisterError } 
                                            setIsError={ setIsRegisterError } 
                                            alertClass='text-alert red-300 mb-4' 
                                            errorMsg={ registerErr } 
                                            fieldType='regular'/>
                                    </Container>
                                    <Container type='regular' className='d-flex flex-column'>
                                        <Label 
                                            text='Repeat password:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ repeatPasswordRef }/>
                                        <Input 
                                            validationType='repeatPassword' 
                                            type='password' 
                                            inputClass='form-control' 
                                            refTarget={ repeatPasswordRef } 
                                            name='password_confirmation' 
                                            onChange={ setRepeatPassword } 
                                            value={ repeatPassword } 
                                            alertAttr='password confirmation' 
                                            validateInput={ validateRegister } 
                                            setIsValidateInput={ setValidateRegister } 
                                            isError={ isRegisterError } 
                                            setIsError={ setIsRegisterError } 
                                            alertClass='text-alert red-300 mb-4' 
                                            errorMsg={ registerErr } 
                                            fieldType='regular'/>
                                    </Container>
                                    <Container type='regular' className='d-grid gap-2 col-12 col-sm-6 mx-auto'>
                                        <Button 
                                        type='submit' 
                                        text='Register'  
                                        color='yellow'/>
                                    </Container>
                                </Form>
                            </Column>
                        </Row>
                    </Jumbotron>
                </Container>
            </Container>
            <Container maxFluid={ true } className='mt-5'>
                <Container maxFluid='md'>
                    <Row className='g-5' md={ 1 } lg={ 2 }>
                        <Column>
                            <Card type='regular' color='yellow' className='p-3 fs-3 d-flex flex-column justify-content-between'>
                                <Container type='regular' className='body'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat explicabo neque totam amet autem quasi iusto sequi non aspernatur accusantium, modi quas ab cupiditate, laboriosam magnam unde, laudantium vel sit.
                                </Container>
                                <Container type='regular' className='footer d-grid gap-2 mt-5'>
                                    <Button type='regular' text='Browse Communities' color='yellow'/>
                                </Container>
                            </Card>
                        </Column>
                        <Column>
                            <Card type='regular' color='yellow' className='p-3 fs-3 d-flex flex-column justify-content-between'>
                                <Container type='regular' className='body'>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae debitis dolorem eligendi natus laborum praesentium officia, repellat nobis. Voluptatum inventore tenetur vel cumque ab libero consequatur quam saepe accusantium necessitatibus.
                                </Container>
                                <Container type='regular' className='footer d-grid gap-2 mt-5'>
                                    <Button type='regular' text='Browse Stories' color='yellow'/>
                                </Container>
                            </Card>
                        </Column>
                        <Column>
                            <Card type='regular' color='yellow' className='p-3 fs-3 d-flex flex-column justify-content-between'>
                                <Container type='regular' className='body'>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem natus, odio labore nesciunt quis eaque nobis quod quaerat suscipit id quibusdam non quo rerum dolores excepturi provident in laborum asperiores.
                                </Container>
                                <Container type='regular' className='footer d-grid gap-2 mt-5'>
                                    <Button type='regular' text='Browse Memes' color='yellow'/>
                                </Container>
                            </Card>
                        </Column>
                        <Column>
                            <Card type='regular' color='yellow' className='p-3 fs-3 d-flex flex-column justify-content-between'>
                                <Container type='regular' className='body'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore laudantium sunt quaerat quam! Tempora suscipit modi ipsa sint eaque similique voluptatem. Nobis id assumenda reprehenderit nemo fugit dolor aperiam. Animi.
                                </Container>
                                <Container type='regular' className='footer d-grid gap-2 mt-5'>
                                    <Button type='regular' text='Browse DOFTD' color='yellow'/>
                                </Container>
                            </Card>
                        </Column>
                    </Row>
                </Container>
            </Container>
        </>
    )
};

export default LandingPage;