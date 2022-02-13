import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axiosDef from "../../../../util/Request";

import Container from "../../../core/Container";
import Row from "../../../core/Row";
import Column from "../../../core/Column";
import Span from "../../../core/Span";
import Form from "../../../widgets/Form";
import Button from "../../../core/Button";
import Input from "../../../core/Input";
import Header from "../../../core/Header";

export const AccountSettings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const username = JSON.parse(Cookies.get('x_auth_user'))['username'];

    const [email, setEmail] = useState(null);

    const [isEmailShown, setIsEmailShown] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [emailText, setEmailText] = useState('Update');
    const [passwordText, setPasswordText] = useState('update');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();

    const toggleEmail = () => {
        isEmailShown ? setEmailText('Update') : setEmailText('Cancel');

        setIsEmailShown(!isEmailShown);
        setIsSubmitted(false);
    }

    const togglePassword = () => {
        isPasswordShown ? setPasswordText('Update') : setPasswordText('Cancel');

        setIsPasswordShown(!isPasswordShown);
        setIsSubmitted(false);
    }

    const updateEmail = evt => {
        evt.preventDefault();

        const updateEmailForm = new FormData(evt.target);
        updateEmailForm.append('id', parseInt(JSON.parse(Cookies.get('x_auth_user'))['id'], 10));

        axiosDef.post('http://localhost:8000/api/user/' + username + '/settings/email/update', updateEmailForm)

        .then (res => {
            const updateEmailRes = res.data;

            if (updateEmailRes.isSuccess) {
                Cookies.set('x_auth_user', JSON.stringify(updateEmailRes.data), { sameSite: 'strict', secure: true });
                setEmail(updateEmailRes.data['email']);

                toggleEmail();
                emailRef.current.value = '';
                passwordRef.current.value= '';

                setIsSubmitted(true);
            } else {
                console.log('update email res err: ', updateEmailRes.data);
            }
        })
    
        .catch (err => {
            console.log('err update email: ', err.response.data.errors)
        })
    }
    
    const updatePassword = evt => {
        evt.preventDefault();

        const updatePasswordForm = new FormData(evt.target);
        updatePasswordForm.append('id', parseInt(JSON.parse(Cookies.get('x_auth_user'))['id'], 10));

        axiosDef.post('http://localhost:8000/api/user/' + username + '/settings/password/update', updatePasswordForm)

        .then (res => {
            const updatePasswordRes = res.data;

            if (updatePasswordRes.isSuccess) {
                Cookies.set('x_auth_user', JSON.stringify(updatePasswordRes.data), { sameSite: 'strict', secure: true });
                setEmail(updatePasswordRes.data['email']);

                togglePassword();
                oldPasswordRef.current.value = '';
                newPasswordRef.current.value = '';
                confirmNewPasswordRef.current.value = '';

                setIsSubmitted(true);
            } else {
                console.log('update email res err: ', updatePasswordRes.data);
            }
        })
    
        .catch (err => {
            console.log('err update email: ', err.response.data.errors)
        })
    }

    useEffect(() => {
        if ((email === null) && isLoading) {
            setEmail(JSON.parse(Cookies.get('x_auth_user'))['email']);
        }
    }, [email]);

    return (
       <Container 
       type='regular' 
       className='p-2 d-flex flex-column' 
       color='neutral'>
           <Header 
           text='Settings / Account' 
           color='dark' 
           size='display1'/>
           <Row className='mt-3 p-3'>
               <Column className='' style={{ background: '#fff', }} md={ 6 }>
                   <Container type='regular' className='d-flex flex-column'>
                        <Span type='regular' text='Email address:'/>
                        <Span type='regular' text={ email }/>
                        {
                            !(isSubmitted) ? 
                            <Form
                            action='#'
                            method='POST'
                            encType='multipart'
                            onSubmit={ updateEmail }
                            hidden={ isEmailShown ? false : true }>
                                <Input
                                fieldType='regular' 
                                type='email'
                                name='email' 
                                refTarget={ emailRef }
                                defaultValue=''/>
                                <Input
                                fieldType='regular' 
                                type='password'
                                name='password' 
                                refTarget={ passwordRef }
                                defaultValue=''/>
                                <Button 
                                type='submit' 
                                text='Save'
                                color='yellowNoTranslate'
                                size='tiny'/>
                            </Form> : 'submitted'
                        }
                   </Container>
               </Column>
               <Column 
               className='d-flex flex-column py-2' 
               style={{ background: '#fff', }} 
               md={ 6 }>
                   <Container type='regular'>
                        <Button 
                        type='regular' 
                        text={ emailText } 
                        color='neutralNoTranslate'
                        size='tiny'
                        btnOnclick={ toggleEmail }/>
                   </Container>
               </Column>
           </Row>
           <Row className='mt-3 p-3'>
                <Column style={{ background: '#fff', }} md={ 6 }>
                {
                    !(isSubmitted) ? 
                    <Form
                    action='#'
                    method='POST'
                    encType='multipart'
                    onSubmit={ updatePassword }
                    hidden={ isPasswordShown ? false : true }>
                        <Input
                        fieldType='regular' 
                        type='password'
                        name='old_password' 
                        refTarget={ oldPasswordRef }
                        defaultValue=''/>
                        <Input
                        fieldType='regular' 
                        type='password'
                        name='new_password' 
                        refTarget={ newPasswordRef }
                        defaultValue=''/>
                        <Input
                        fieldType='regular' 
                        type='password'
                        name='new_password_confirmation' 
                        refTarget={ confirmNewPasswordRef }
                        defaultValue=''/>
                        <Button 
                        type='regular' 
                        text='Save'
                        color='yellow'
                        size='tiny'/>
                    </Form> : 'submitted'
                }
                </Column>
                <Column className='' style={{ background: '#fff', }} md={ 6 }>
                    <Button 
                    type='regular' 
                    text={ passwordText } 
                    color='neutralNoTranslate'
                    size='tiny'
                    btnOnclick={ togglePassword }/>
                </Column>
            </Row>
            <Row className='mt-3 p-3'>
                <Column style={{ background: '#fff', }} md={ 6 }>
                    Delete account
                </Column>
                <Column style={{ background: '#fff', }} md={ 6 }>
                    Request
                </Column>
            </Row>
       </Container>
    )
};

export default AccountSettings;