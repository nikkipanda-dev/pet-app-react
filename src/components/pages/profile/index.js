import { useState, useEffect, useRef } from 'react';
import { useLocation, Outlet, Link, Navigate, useParams } from 'react-router-dom';
import axiosDef from '../../../util/Request';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret, faEdit, faImages, faTrash } from '@fortawesome/free-solid-svg-icons';

import Container from '../../core/Container';
import Row from '../../core/Row';
import Column from '../../core/Column';
import Card from '../../widgets/Card';
import Image from '../../core/Image';
import Anchor from '../../core/Anchor';
import Input from '../../core/Input';
import Button from '../../core/Button';
import Form from '../../widgets/Form';
import Label from '../../core/Label';
import Modal from '../../widgets/Modal';
import Span from '../../core/Span';

const Profile = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [displayPhoto, setDisplayPhoto] = useState(null);

    const addUser = evt => {
        evt.preventDefault();

        const addUserForm = new FormData(evt.target);
        addUserForm.append('id', parseInt(JSON.parse(Cookies.get('x_auth_user'))['id']));
        addUserForm.append('member_username', params.username);

        axiosDef.post('http://localhost:8000/api/user/add', addUserForm)

        .then (res => {
            console.log('res: ', res.data);
        })

        .catch (err => {
            console.log('err ', err.response.data.errors);
        })
    }

    const getDisplayPhoto = () => {
        axiosDef.get('http://localhost:8000/api/user/' + params.username + '/display-photo/get')

        .then (res => {
            const getDisplayPhotoRes = res.data;

            if (getDisplayPhotoRes.isSuccess) {
                setDisplayPhoto(getDisplayPhotoRes.data['image_path']);
            } else {
                console.log('get dp res err ', getDisplayPhotoRes.data)
            }
        })

        .catch (err => {
            console.log('err dp ', err)
        })
    }

    useEffect(() => {
        isLoading && (!(displayPhoto) && getDisplayPhoto());
        return () => {
            setIsLoading(false);
        } 
    }, [])

    return (
        JSON.parse(Cookies.get('x_auth_user'))['username'] ? 
        <Container type='regular'>
            <Container maxFluid='xl' className='mt-5'>
                <Row className='mt-5'>
                    <Column className='p-2 d-flex flex-column' sm={ 12 } md={ 4 }>
                        <Container type='regular' className='d-flex flex-column align-items-center'>
                        {
                            displayPhoto ? 
                            <img 
                            src={ new URL(displayPhoto, 'http://localhost:8000/storage/display_photos/') } 
                            style={{ objectFit: 'cover', width: '300px', height: '300px', maxHeight: '100%', }}/> : <FontAwesomeIcon icon={ faUserSecret } size='10x'/>
                        }
                        name here
                        </Container>
                        <Container type='regular' className='mt-3'>
                        {
                            (params.username !== JSON.parse(Cookies.get('x_auth_user'))['username']) ? 
                            <Form
                            action='#'
                            method='POST'
                            encType='multipart'
                            onSubmit={ addUser }
                            className='d-flex flex-column flex-sm-row align-items-center justify-content-center'>
                                <Button
                                type='submit'
                                text='Add friend'
                                color='yellowNoTranslate'
                                size='tiny'/>
                            </Form> : ''
                        }
                        </Container>
                        <Container type='regular' className='mt-3 d-flex flex-column'>
                            <Span type='regular' text='Badges'/>
                        </Container>
                        <Container type='regular' className='mt-3 d-flex flex-column'>
                            <Span type='regular' text='Friends'/>
                            <Anchor type='regular' to='friends' text='See all' size='tiny' color='tangerine'/>
                        </Container>
                        <Container type='regular' className='mt-3 d-flex flex-column'>
                            <Span type='regular' text='Communities'/>
                        </Container>
                        <Container type='regular' className='mt-3 d-flex flex-column'>
                            <Span type='regular' text='Memes'/>
                        </Container>
                        <Container type='regular' className='mt-3 d-flex flex-column'>
                            <Span type='regular' text='Activities'/>
                        </Container>
                    </Column>
                    <Column className='' sm={ 12 } md={ 8 }>
                        <Container type='regular'>
                            cover photo
                        </Container>
                        <Container type='regular'>
                            featured stories
                        </Container>
                        <Container type='regular'>
                            <Link to='posts'>Posts</Link>
                        </Container>
                        <Outlet />
                    </Column>
                </Row>
            </Container>
        </Container> : <Navigate to='/'replace={true}/>
    )
};

export default Profile;