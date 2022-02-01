import axiosDef from '../../../util/Request';
import { useState, createRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { ContainerIdx } from '../../core/Container'
import { JumbotronIdx } from '../../sections/Jumbotron'
import { RowIdx } from '../../core/Row'
import { ColIdx } from '../../core/Column'
import FormIdx from '../../widgets/Form'
import { LabelIdx } from '../../core/Label'
import { InputIdx } from '../../core/Input'
import { BtnIdx } from '../../core/Button'
import { HeaderIdx } from '../../core/Header';
import { CardIdx } from '../../widgets/Card';
import { ModalIdx } from '../../widgets/Modal';

const LandingPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [validateRegister, setValidateRegister] = useState(false);
    const [isRegisterError, setIsRegisterError] = useState(false);
    const [registerErr, setRegisterErr] = useState({});

    useEffect(() => {
    }, [firstName, lastName, username, email, password, repeatPassword, registerErr, validateRegister]);
    
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
                            Cookies.set('secretTk', registerResponse.secret, { sameSite: 'strict', secure: true });

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
            <ContainerIdx fluid={ true }>
                <ContainerIdx fluid='md' containerClass='pt-5'>
                    <JumbotronIdx jumbotronStyle={{ minHeight: '100vh', }}>
                        <RowIdx rowClass='p-2' rowStyle={{ minHeight: 'inherit', }}>
                            <ColIdx columnClass='mt-5 py-3' sm={ 6 } md={ 7 } lg={ 8 } columnStyle={{ height: '100%', }}>
                                <HeaderIdx text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, dolorem necessitatibus!' headerClass='display-5'/>
                            </ColIdx>
                            <ColIdx columnClass='mt-5 py-3' sm={ 6 } md={ 5 } lg={ 4 } columnStyle={{ height: '100%', }}>
                                <FormIdx action='#' method='post' encType='multipart' onSubmit={ register }>
                                    <div>
                                        <LabelIdx 
                                            text='First name:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ firstNameRef }
                                        />
                                        <InputIdx 
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
                                        <LabelIdx 
                                            text='Last name:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ lastNameRef }
                                        />
                                        <InputIdx 
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
                                        <LabelIdx 
                                            text='Username:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ usernameRef }
                                        />
                                        <InputIdx 
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
                                        <LabelIdx 
                                            text='Email:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ emailRef }
                                        />
                                        <InputIdx 
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
                                        <LabelIdx 
                                            text='Password:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ passwordRef }
                                        />
                                        <InputIdx 
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
                                        <LabelIdx 
                                            text='Repeat password:' 
                                            labelClass='form-label' 
                                            labelOnclick={ focusRegister } 
                                            refTarget={ repeatPasswordRef }
                                        />
                                        <InputIdx 
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
                                        <BtnIdx 
                                            type='submit' 
                                            text='Register' 
                                            btnClass='btn btn-reg btn-purple'
                                        />
                                    </div>
                                </FormIdx>
                            </ColIdx>
                        </RowIdx>
                    </JumbotronIdx>
                </ContainerIdx>
            </ContainerIdx>
            <ContainerIdx fluid={ true } containerClass='mt-5'>
                <ContainerIdx fluid='md' containerClass=''>
                    <RowIdx rowClass='g-5' xs={ 1 } md={ 2 }>
                        <ColIdx>
                            <CardIdx 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat explicabo neque totam amet autem quasi iusto sequi non aspernatur accusantium, modi quas ab cupiditate, laboriosam magnam unde, laudantium vel sit.
                                <BtnIdx btnClass='btn btn-purple' text='Browse Communities'/>
                            </CardIdx>
                        </ColIdx>
                        <ColIdx>
                            <CardIdx 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae debitis dolorem eligendi natus laborum praesentium officia, repellat nobis. Voluptatum inventore tenetur vel cumque ab libero consequatur quam saepe accusantium necessitatibus.
                                <BtnIdx btnClass='btn btn-purple' text='Browse Stories'/>
                            </CardIdx>
                        </ColIdx>
                        <ColIdx>
                            <CardIdx 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem natus, odio labore nesciunt quis eaque nobis quod quaerat suscipit id quibusdam non quo rerum dolores excepturi provident in laborum asperiores.
                                <BtnIdx btnClass='btn btn-purple' text='Browse Memes'/>
                            </CardIdx>
                        </ColIdx>
                        <ColIdx>
                            <CardIdx 
                                cardClass='curved-border p-3 fs-3' 
                                cardStyle={{ border: 'none', }}
                            >
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore laudantium sunt quaerat quam! Tempora suscipit modi ipsa sint eaque similique voluptatem. Nobis id assumenda reprehenderit nemo fugit dolor aperiam. Animi.
                                <BtnIdx btnClass='btn btn-purple' text='Browse DOFTD'/>
                            </CardIdx>
                        </ColIdx>
                    </RowIdx>
                </ContainerIdx>
            </ContainerIdx>
        </>
    )
};

export default LandingPage;