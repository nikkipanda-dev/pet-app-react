import { useState, useEffect, useRef } from 'react';
import { useLocation, Outlet, Link, Navigate } from 'react-router-dom';
import axiosDef from '../../../util/Request';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImages, faTrash } from '@fortawesome/free-solid-svg-icons';

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

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const currentPathname =  location.pathname.slice(3);
    const [displayPhoto, setDisplayPhoto] = useState(null);

    console.log('currentPathname ', currentPathname)

    const addUser = evt => {
        evt.preventDefault();

        console.log('add frienddd');

        const addUserForm = new FormData(evt.target);

        for (let [i, val] of addUserForm.entries()) {
            console.log('i: ', i)
            console.log('val: ', val)
        }

        axiosDef.post('http://localhost:8000/api/user/add', addUserForm)

        .then (res => {
            console.log('res: ', res.data);
        })

        .catch (err => {
            console.log('err ', err.response.data.errors);
        })
    }

    const getDisplayPhoto = () => {
        axiosDef.get('http://localhost:8000/api/user/' + currentPathname + '/display-photo/get')

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
        <Container fluid={ true } containerClass='pt-5'>
            <Container fluid='xl' containerClass='mt-5'>
                <Row>
                    <Column columnClass='p-2 d-flex flex-column' xs={ 12 } sm={ 5 } md={ 4 }>
                        <Container type='regular' containerClass='bg-purple-100'>
                            <img 
                            src={ new URL(displayPhoto, 'http://localhost:8000/storage/display_photos/') } 
                            style={{ objectFit: 'cover', width: '300px', height: '300px', maxHeight: '100%', }}/>
                            {/* <Row>
                                <Column>
                                {
                                    (currentPathname !== JSON.parse(Cookies.get('x_auth_user'))['username']) ? 
                                    <Form
                                        action='#'
                                        method='POST'
                                        encType='multipart'
                                        onSubmit={ evt => addUser(evt) }>
                                        <Input 
                                            fieldType='regular'
                                            name='id'
                                            value={ JSON.parse(Cookies.get('x_auth_user'))['id'] } 
                                            hidden={ true }/>
                                        <Input 
                                            fieldType='regular'
                                            name='member_username'
                                            value={ currentPathname } 
                                            hidden={ true }/>
                                        <Button 
                                            type='submit'
                                            text='Send friend invitation'/>
                                    </Form> : ''
                                }
                                </Column>
                                <Column>
                                    message
                                </Column>
                            </Row> */}
                        </Container>
                        <Container type='regular' containerClass=''>
                            badges
                        </Container>
                        <Container type='regular' containerClass=''>
                            Friends
                            <Link to='friends'>See all</Link>
                        </Container>
                        <Container type='regular' containerClass=''>
                            communities
                        </Container>
                        <Container type='regular' containerClass=''>
                            memes
                        </Container>
                        <Container type='regular' containerClass=''>
                            activities
                        </Container>
                    </Column>
                    <Column columnClass='' xs={ 12 } sm={ 7 } md={ 8 }>
                        <Container type='regular' containerClass=''>
                            cover photo
                        </Container>
                        <Container type='regular' containerClass=''>
                            featured stories
                        </Container>
                        <Container type='regular' containerClass=''>
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