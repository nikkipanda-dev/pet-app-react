import axiosDef from '../../../util/Request';
import { useState, createRef } from 'react';
import Cookies from 'js-cookie';

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
            axiosDef.get('http://localhost:8000/sanctum/csrf-cookie')
                .then(() => {
                    axiosDef.post('http://localhost:8000/api/register', registerForm)

                    .then (res => {
                        const registerResponse = res.data;

                        registerResponse.isSuccess && Cookies.set('secretTk', registerResponse.secret, { sameSite: 'strict', secure: true });
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
        <>
            <ContainerIdx fluid={ true }>
                <ContainerIdx fluid='md'>
                    <JumbotronIdx>
                        <RowIdx>
                            <ColIdx columnClass='mt-5' sm={ 6 } md={ 7 } lg={ 8 }>
                                <HeaderIdx text='YEEEEEEEET' headerClass='lead'/>
                            </ColIdx>
                            <ColIdx columnClass='' sm={ 6 } md={ 5 } lg={ 4 }>
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
                </ContainerIdx>
            </ContainerIdx>
            <ContainerIdx fluid={ true } containerClass='mt-5'>
                <ContainerIdx fluid='md' containerClass=''>
                    <RowIdx>
                        <ColIdx 
                            columnClass='p-0' sm={ 6 }>
                            <CardIdx cardClass='curved-border p-3 fs-3' cardStyle={{ backgroundColor: '#e8d9ff', }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non eveniet, incidunt voluptatem libero tenetur deserunt ex porro nostrum explicabo laboriosam, molestiae ut quis aliquam, esse totam. Rem necessitatibus modi esse!
                            </CardIdx>
                        </ColIdx>
                        <ColIdx columnClass='' sm={ 6 }>
                            <CardIdx cardClass='curved-border p-3 fs-3' cardStyle={{ backgroundColor: '#e8d9ff', }}>
                                col 2
                            </CardIdx>
                        </ColIdx>
                    </RowIdx>
                </ContainerIdx>
            </ContainerIdx>
        </>
    )
};

export default LandingPage;