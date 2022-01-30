import axiosDef from '../../../util/Request';
import { useState, createRef, useEffect } from 'react';

import { ContainerIdx } from '../../core/Container'
import { JumbotronIdx } from '../../sections/Jumbotron'
import { RowIdx } from '../../core/Row'
import { ColIdx } from '../../core/Column'
import FormIdx from '../../widgets/Form'
import { LabelIdx } from '../../core/Label'
import { InputIdx } from '../../core/Input'
import { BtnIdx } from '../../core/Button'

const LandingPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [validateRegister, setValidateRegister] = useState(false);
    const [isRegisterError, setIsRegisterError] = useState(false);
    
    // focus input
    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const usernameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const repeatPasswordRef = createRef();

    function focusRegister(el) {
        el.current.focus();
    }

    const register = (evt) => {
        evt.preventDefault();

        // set validate before axios
        setValidateRegister(true);

        const registerForm = new FormData(evt.target);
    
        if (!(isRegisterError)) {
            console.log('inside is error? ', isRegisterError);
            axiosDef.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(() => {
                    axiosDef.post('http://localhost:8000/api/register', registerForm)

                    .then (res => {

                        console.log('res: ', res.response)
                    })

                    .catch (err => {
                        if (err.response) {
                            const registerErr = err.response.data.errors;

                            Object.keys(registerErr).forEach((i, val) => {
                                console.log(Object.values(registerErr)[val][0]);
                            })
                        }
                    })
            })            
        }

    }

    return (
        <ContainerIdx fluid={ true } containerClass='p-2'>
            <JumbotronIdx>
                <RowIdx>
                    <ColIdx  columnClass='' sm={ 6 }>
                        Lead text
                    </ColIdx>
                    <ColIdx columnClass='' sm={ 6 }>
                        <FormIdx action='#' method='post' encType='multipart' onSubmit={ register }>
                            <div>
                                <LabelIdx text='First name:' labelClass='form-label' labelOnclick={ focusRegister } refTarget={ firstNameRef }/>
                                <InputIdx validationType='name' type='text' inputClass='form-control' refTarget={ firstNameRef } name='first_name' onChange={ setFirstName } value={ firstName } alertAttr='first name' validateInput={ validateRegister } setIsError={ () => setIsRegisterError }/>
                            </div>
                            <div>
                                <LabelIdx text='Last name:' labelClass='form-label' labelOnclick={ focusRegister } refTarget={ lastNameRef }/>
                                <InputIdx validationType='name' type='text' inputClass='form-control' refTarget={ lastNameRef } name='last_name' onChange={ setLastName } value={ lastName } alertAttr='last name' validateInput={ validateRegister } setIsError={ () => setIsRegisterError }/>
                            </div>
                            <div>
                                <LabelIdx text='Username:' labelClass='form-label' labelOnclick={ focusRegister } refTarget={ usernameRef }/>
                                <InputIdx validationType='name' type='text' inputClass='form-control' refTarget={ usernameRef } name='username' onChange={ setUsername } value={ username } alertAttr='username' validateInput={ validateRegister } setIsError={ () => setIsRegisterError }/>
                            </div>
                            <div>
                                <LabelIdx text='Email:' labelClass='form-label' labelOnclick={ focusRegister } refTarget={ emailRef }/>
                                <InputIdx validationType='email' type='email' inputClass='form-control' refTarget={ emailRef } name='email' onChange={ setEmail } value={ email } alertAttr='email address' validateInput={ validateRegister } setIsError={ () => setIsRegisterError }/>
                            </div>
                            <div>
                                <LabelIdx text='Password:' labelClass='form-label' labelOnclick={ focusRegister } refTarget={ passwordRef }/>
                                <InputIdx validationType='password' type='password' inputClass='form-control' refTarget={ passwordRef } name='password' onChange={ setPassword } value={ password } alertAttr='password' validateInput={ validateRegister } setIsError={ () => setIsRegisterError }/>
                            </div>
                            <div>
                                <LabelIdx text='Repeat password:' labelClass='form-label' labelOnclick={ focusRegister } refTarget={ repeatPasswordRef }/>
                                <InputIdx validationType='repeatPassword' type='password' inputClass='form-control' refTarget={ repeatPasswordRef } name='password_confirmation' onChange={ setRepeatPassword } value={ repeatPassword } alertAttr='repeat password' validateInput={ validateRegister } setIsError={ () => setIsRegisterError }/>
                            </div>
                            <div>
                                <BtnIdx 
                                    type='submit' 
                                    text='Register'
                                />
                            </div>
                        </FormIdx>
                    </ColIdx>
                </RowIdx>
            </JumbotronIdx>
            <ContainerIdx fluid='md' containerClass=''>
                <RowIdx>
                    <ColIdx 
                        columnClass='' sm={ 6 }>
                        Col 1
                    </ColIdx>
                    <ColIdx columnClass='' sm={ 6 }>
                        Col 2
                    </ColIdx>
                </RowIdx>
            </ContainerIdx>
        </ContainerIdx>
    )
};

export default LandingPage;