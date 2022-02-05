import axiosDef from '../../../util/Request';
import { useState, createRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import Container from '../../core/Container'
import Jumbotron from '../../sections/Jumbotron'
import Row from '../../core/Row'
import Column from '../../core/Column'
import Form from '../../widgets/Form'
import Label from '../../core/Label'
import Input from '../../core/Input'
import Button from '../../core/Button'
import Header from '../../core/Header';
import Card from '../../widgets/Card';
import Modal from '../../widgets/Modal';

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
            <Container fluid={ true }>
                <Container fluid='md' containerClass='pt-5'>
                    <Jumbotron jumbotronStyle={{ minHeight: '100vh', }}>
                        <Row rowClass='p-2' rowStyle={{ minHeight: 'inherit', }}>
                            <Column columnClass='mt-5 py-3' sm={ 6 } md={ 7 } lg={ 8 } columnStyle={{ height: '100%', }}>
                                <Header text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, dolorem necessitatibus!' headerClass='display-5'/>
                            </Column>
                            <Column columnClass='mt-5 py-3' sm={ 6 } md={ 5 } lg={ 4 } columnStyle={{ height: '100%', }}>
                                <Form action='#' method='post' encType='multipart' onSubmit={ register }>
                                    <div>
                                        <Label 
                                            text='First name:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ firstNameRef }
                                        />
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
                                            fieldType='regular'
                                        />
                                    </div>
                                    <div>
                                        <Label 
                                            text='Last name:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ lastNameRef }
                                        />
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
                                            fieldType='regular'
                                        />
                                    </div>
                                    <div>
                                        <Label 
                                            text='Username:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ usernameRef }
                                        />
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
                                            fieldType='regular'
                                        />
                                    </div>
                                    <div>
                                        <Label 
                                            text='Email:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ emailRef }
                                        />
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
                                            fieldType='regular'
                                        />
                                    </div>
                                    <div>
                                        <Label 
                                            text='Password:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ passwordRef }
                                        />
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
                                            fieldType='regular'
                                        />
                                    </div>
                                    <div>
                                        <Label 
                                            text='Repeat password:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ repeatPasswordRef }
                                        />
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
                                            fieldType='regular'
                                        />
                                    </div>
                                    <div className='d-grid gap-2 col-12 col-sm-6 mx-auto'>
                                        <Button 
                                            type='submit' 
                                            text='Register' 
                                            btnClass='btn btn-reg btn-purple'
                                        />
                                    </div>
                                </Form>
                            </Column>
                        </Row>
                    </Jumbotron>
                </Container>
            </Container>
            <Container fluid={ true } containerClass='mt-5'>
                <Container fluid='md' containerClass=''>
                    <Row rowClass='g-5' xs={ 1 } md={ 2 }>
                        <Column>
                            <Card 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat explicabo neque totam amet autem quasi iusto sequi non aspernatur accusantium, modi quas ab cupiditate, laboriosam magnam unde, laudantium vel sit.
                                <Button btnClass='btn btn-purple' text='Browse Communities'/>
                            </Card>
                        </Column>
                        <Column>
                            <Card 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae debitis dolorem eligendi natus laborum praesentium officia, repellat nobis. Voluptatum inventore tenetur vel cumque ab libero consequatur quam saepe accusantium necessitatibus.
                                <Button btnClass='btn btn-purple' text='Browse Stories'/>
                            </Card>
                        </Column>
                        <Column>
                            <Card 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem natus, odio labore nesciunt quis eaque nobis quod quaerat suscipit id quibusdam non quo rerum dolores excepturi provident in laborum asperiores.
                                <Button btnClass='btn btn-purple' text='Browse Memes'/>
                            </Card>
                        </Column>
                        <Column>
                            <Card 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore laudantium sunt quaerat quam! Tempora suscipit modi ipsa sint eaque similique voluptatem. Nobis id assumenda reprehenderit nemo fugit dolor aperiam. Animi.
                                <Button btnClass='btn btn-purple' text='Browse DOFTD'/>
                            </Card>
                        </Column>
                    </Row>
                </Container>
            </Container>
        </>
    )
};

export default LandingPage;