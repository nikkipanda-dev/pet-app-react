import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axiosDef from "../../../../util/Request";
import Cookies from "js-cookie";

import Container from "../../../core/Container";
import Row from "../../../core/Row";
import Column from "../../../core/Column";
import Span from "../../../core/Span";
import Form from "../../../widgets/Form";
import Input from "../../../core/Input";
import Label from "../../../core/Label";
import Button from "../../../core/Button";
import Image from "../../../core/Image";
import Header from "../../../core/Header";

export const ProfileSettings = () => {
    const location = useLocation();
    const username = JSON.parse(Cookies.get('x_auth_user'))['username'];

    const [showUploadBtn, setShowUploadBtn] = useState(false);
    const [displayPhotoPath, setDisplayPhotoPath] = useState(null);
    const displayPhotoRef = useRef();

    // console.log('displayPhotoPath ', displayPhotoPath ? true : false)

    const triggerFileSelect = evt => {
        evt.current.click();
    }

    const addDisplayPhoto = evt => {
        evt.preventDefault();

        const addPhotoForm = new FormData(evt.target)
        addPhotoForm.append('id', JSON.parse(Cookies.get('x_auth_user'))['id']);

        axiosDef.post('http://localhost:8000/api/user/' + username + '/settings/display-photo/store', addPhotoForm)

        .then (res => {
            const addPhotoRes = res.data;

            if (addPhotoRes.isSuccess) {
                Cookies.set('x_auth_user_display_photo', JSON.stringify(addPhotoRes.data['image_path']), { sameSite: 'strict', secure: true });

                setDisplayPhotoPath(addPhotoRes.data['image_path']);
                setShowUploadBtn(false);

                // clear input field
                displayPhotoRef.current.value = '';
            } else {
                console.log('res upload err ', addPhotoRes.data);
            }
        })

        .catch (err => {
            console.log('err photo res', err.response.data.errors)
        })
    }

    const changeDisplayPhoto = evt => {
        evt.preventDefault();

        const updatePhotoForm = new FormData(evt.target)
        updatePhotoForm.append('id', JSON.parse(Cookies.get('x_auth_user'))['id']);

        axiosDef.post('http://localhost:8000/api/user/' + username + '/settings/display-photo/update', updatePhotoForm)

        .then (res => {
            const changePhotoRes = res.data;

            if (changePhotoRes) {
                Cookies.set('x_auth_user_display_photo', JSON.stringify(changePhotoRes.data['image_path']), { sameSite: 'strict', secure: true });

                setDisplayPhotoPath(changePhotoRes.data['image_path']);
                setShowUploadBtn(false);
                // clear input field
                displayPhotoRef.current.value = '';
            } else {
                console.log('err change:" ', changePhotoRes.data);
            }
        })

        .catch (err => {
            console.log('err upd ', err)
        })
    }

    const removeDisplayPhoto = evt => {
        evt.preventDefault();

        const removePhotoForm = new FormData(evt.target)
        removePhotoForm.append('id', JSON.parse(Cookies.get('x_auth_user'))['id']);

        axiosDef.post('http://localhost:8000/api/user/' + username + '/settings/display-photo/destroy', removePhotoForm)

        .then (res => {
            const removePhotoRes = res.data;

            if (removePhotoRes) {
                Cookies.remove('x_auth_user_display_photo');

                setDisplayPhotoPath('');
            } else {
                console.log('err change:" ', removePhotoRes.data);
            }
        })

        .catch (err => {
            console.log('err upd ', err)
        })
    }

    const handleUpload = evt => {
        console.log('upload ', evt.target.files.length);

        (evt.target.files.length !== 0) ? setShowUploadBtn(true) : setShowUploadBtn(false);
    }

    useEffect(() => {
        if (displayPhotoPath === null) {
            Cookies.get('x_auth_user_display_photo') && setDisplayPhotoPath(JSON.parse(Cookies.get('x_auth_user_display_photo')));
        }
    }, [])

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
                    <Span 
                    type='regular' 
                    text='Display photo: '/>
                    <Container 
                    type='regular' 
                    className='mt-5 d-flex flex-column align-items-center'>
                    {
                        displayPhotoPath ? 
                        <Image 
                        src={ new URL(displayPhotoPath, 'http://localhost:8000/storage/display_photos/') }
                        style={{ objectFit: 'cover', width: '400px', height: '400px', maxHeight: '100%', }}/> : 
                        <Span 
                        type='regular' 
                        text='No display photo yet.' 
                        size='tiny'
                        color='gray'/>
                    }
                        <Container 
                        type='regular'
                        className='mt-3 d-flex flex-column justify-content-center align-items-center p-2'>
                        {
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
                        }
                        </Container>
                    </Container>
                </Column>
            </Row>
        </Container>
    )
};

export default ProfileSettings;