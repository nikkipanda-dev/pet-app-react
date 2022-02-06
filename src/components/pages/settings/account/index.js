import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axiosDef from "../../../../util/Request";

import Container from "../../../core/Container";
import Row from "../../../core/Row";
import Column from "../../../core/Column";
import Span from "../../../core/Span";
import Form from "../../../widgets/Form";
import Button from "../../../core/Button";
import Input from "../../../core/Input";

export const AccountSettings = ({ isDefault }) => {
    const [isLoading, setIsLoading] = useState(true);
    const username = JSON.parse(Cookies.get('x_auth_user'))['username'];

    const [email, setEmail] = useState(null);

    const [isEmailShown, setIsEmailShown] = useState(false);
    const [emailText, setEmailText] = useState('Update');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const toggleEmail = evt => {
        isEmailShown ? setEmailText('Update') : setEmailText('Cancel');

        setIsEmailShown(!isEmailShown);
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
            } else {
                console.log('update email res err: ', updateEmailRes.data);
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
    }, [email])

    return (
       <Container fluid={ true } containerClass='bg-warning'>
           Settings/Account
           <Row rowClass='bg-success mt-3'>
               <Column columnClass='bg-secondary'>
                   <Container type='regular' containerClass='d-flex flex-column'>
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
                                <Button type='regular' text='Save'/>
                            </Form> : 'submitted'
                        }
                   </Container>
               </Column>
               <Column>
                    <Button type='regular' text={ emailText } btnOnclick={ toggleEmail }/>
               </Column>
           </Row>
           <Row rowClass='bg-success mt-3'>
               <Column>
                    Password
               </Column>
               <Column columnClass='bg-secondary'>
                    Update
               </Column>
           </Row>
           <Row rowClass='bg-success mt-3'>
               <Column columnClass='bg-secondary'>
                    Delete account
               </Column>
               <Column>
                    Request
               </Column>
           </Row>
       </Container>
    )
};

export default AccountSettings;