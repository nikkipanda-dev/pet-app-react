import { useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Container from "../../../core/Container";
import Header from "../../../core/Header";
import Row from "../../../core/Row";
import Column from "../../../core/Column";
import Span from "../../../core/Span";

export const PrivacySettings = () => {
    const location = useLocation();
    const username = JSON.parse(Cookies.get('x_auth_user'))['username'];

    return (
        <Container 
        type='regular' 
        className='p-2 d-flex flex-column'
        color='neutral'>
            <Header 
           text={ location.pathname.replace('/u/' + username, '') } 
           color='dark' 
           size='display1'/>
            <Row className='mt-3 p-3'>
                <Column 
                className='py-2'
                style={{ background: '#fff', }} >
                    {/* <Span 
                    type='regular' 
                    text='Display photo: '/> */}
                    <Container 
                    type='regular' 
                    className='mt-5 d-flex flex-column align-items-center'>
                    {/* {
                        displayPhotoPath ? 
                        <Image 
                        src={ new URL(displayPhotoPath, 'http://localhost:8000/storage/display_photos/') }
                        size='displayPhoto'
                        color='tangerine'
                        radius='full'/> : 
                        <Span 
                        type='regular' 
                        text='No display photo yet.' 
                        size='tiny'
                        color='gray'/>
                    } */}
                        <Container 
                        type='regular'
                        className='mt-3 d-flex flex-column justify-content-center align-items-center p-2'>
                        {/* {
                            !(displayPhotoPath) ? 
                            <Form
                            action='#'
                            method='POST'
                            encType='multipart'
                            onSubmit={ addDisplayPhoto }
                            className='d-flex flex-column justify-content-center align-items-center'>
                                <Label
                                text='Add a new photo' 
                                size='regular'
                                color='neutral'
                                className='label-file'
                                labelOnclick={ triggerFileSelect } 
                                refTarget={ displayPhotoRef }/>
                                <Input 
                                fieldType='file'
                                type='file' 
                                refTarget={ displayPhotoRef }
                                onChange={ handleUpload }
                                name='display_photo' 
                                accept='image/*'
                                hidden={ true }/>
                                <Button 
                                type='submit' 
                                text='Upload'
                                hidden={ showUploadBtn ? false : true }
                                size='tiny'
                                color='neutralNoTranslate'
                                className='mt-3'/>
                            </Form> :
                            <>
                                <Form
                                action='#'
                                method='POST'
                                encType='multipart'
                                onSubmit={ changeDisplayPhoto }
                                className='d-flex flex-column justify-content-center align-items-center'>
                                <Label
                                text='Change photo' 
                                size='tiny'
                                color='neutral'
                                className='label-file'
                                labelOnclick={ triggerFileSelect } 
                                refTarget={ displayPhotoRef }/>
                                <Input 
                                fieldType='file'
                                type='file' 
                                refTarget={ displayPhotoRef } 
                                onChange={ handleUpload }
                                name='display_photo' 
                                accept='image/*'
                                hidden={ true }/>
                                <Button 
                                type='submit' 
                                text='Save'
                                size='tiny'
                                hidden={ showUploadBtn ? false : true }
                                color='neutralNoTranslate'
                                className='mt-3'/>
                            </Form>
                            <Form
                                action='#'
                                method='POST'
                                encType='multipart'
                                onSubmit={ removeDisplayPhoto }
                                className='mt-3 d-flex flex-column justify-content-center align-items-center'>
                                <Button 
                                type='submit' 
                                text='Remove display photo'
                                size='tiny'
                                color='danger'/>
                            </Form>
                        </>
                        } */}
                        </Container>
                    </Container>
                </Column>
            </Row>
        </Container>
    )
};

export default PrivacySettings;