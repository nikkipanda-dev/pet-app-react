import { useState, useEffect, useRef } from "react";
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

export const ProfileSettings = () => {
    const username = JSON.parse(Cookies.get('x_auth_user'))['username'];

    const [displayPhotoPath, setDisplayPhotoPath] = useState(null);
    const displayPhotoRef = useRef();

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

    useEffect(() => {
        if (displayPhotoPath === null) {
            Cookies.get('x_auth_user_display_photo') && setDisplayPhotoPath(JSON.parse(Cookies.get('x_auth_user_display_photo')));
        }
    }, [])

    return (
        <Container fluid={ true } containerClass='bg-warning'>
            Settings/Account
            <Row rowClass='bg-success mt-3'>
                <Column columnClass='bg-secondary p-3'>
                    <Span type='regular' text='Display photo:'/>
                    <Image 
                    src={ new URL(displayPhotoPath, 'http://localhost:8000/storage/display_photos/') }
                    imgClass='bg-purple-100'
                    imgStyle={{ objectFit: 'cover', width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px', }}/>
                </Column>
                <Column>
                {
                    !(displayPhotoPath) ? 
                    <Form
                    action='#'
                    method='POST'
                    encType='multipart'
                    onSubmit={ addDisplayPhoto }>
                        <Label
                        text='Select' 
                        labelOnclick={ triggerFileSelect } 
                        refTarget={ displayPhotoRef }/>
                        <Input 
                        fieldType='file'
                        type='file' 
                        refTarget={ displayPhotoRef } 
                        name='display_photo' 
                        accept='image/*'
                        hidden={ true }/>
                        <Button type='submit' text='Save'/>
                    </Form> :
                    <>
                        <Form
                        action='#'
                        method='POST'
                        encType='multipart'
                        onSubmit={ changeDisplayPhoto }>
                        <Label
                        text='Select' 
                        labelOnclick={ triggerFileSelect } 
                        refTarget={ displayPhotoRef }/>
                        <Input 
                        fieldType='file'
                        type='file' 
                        refTarget={ displayPhotoRef } 
                        name='display_photo' 
                        accept='image/*'
                        hidden={ true }/>
                        <Button type='submit' text='Change display photo'/>
                    </Form>
                    </>
                }
               </Column>
            </Row>
        </Container>
    )
};

export default ProfileSettings;