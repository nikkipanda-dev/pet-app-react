import { useState, useEffect, useRef } from 'react';
import { useLocation, Outlet, Link } from 'react-router-dom';
import axiosDef from '../../../util/Request';
import Cookies from 'js-cookie';
import { faEdit, faImages, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../widgets/Pagination';

import { ContainerIdx } from '../../core/Container';
import { RowIdx } from '../../core/Row';
import { ColIdx } from '../../core/Column';
import { CardIdx } from '../../widgets/Card';
import { ImgIdx } from '../../core/Image';
import { AnchorIdx } from '../../core/Anchor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputIdx } from '../../core/Input';
import { BtnIdx } from '../../core/Button';
import FormIdx from '../../widgets/Form';
import { LabelIdx } from '../../core/Label';
import { ModalIdx } from '../../widgets/Modal';
import Comment from '../../sections/Comment';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const currentPathname = location.pathname.startsWith('/u/') && location.pathname.replace('/u/', ''); // current username

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

    // const getFriends = async() => {
    //     await axiosDef.get('http://localhost:8000/api/user/' + currentPathname + '/friends')

    //     .then (res => {
    //         console.log('fre res: ', res.data);
    //         const getFriendsRes = res.data;

    //         if (getFriendsRes.isSuccess) {
    //             setFriends(getFriends.data);
    //             setIsLoading(false);
    //         } else {
    //             console.log('get friends err: ', getFriendsRes.data);
    //         }
    //     })

    //     .catch (err => {
    //         console.log('fre err: ', err);
    //     })
    // }

    return (
        <ContainerIdx fluid={ true } containerClass='pt-5'>
            <ContainerIdx fluid='xl' containerClass='mt-5'>
                <RowIdx rowClass='flex-column flex-md-row'>
                    <ColIdx columnClass='' sm={ 4 }>
                        <ContainerIdx type='regular' containerClass='bg-purple-100'>
                            <img src='/pup_patrol_logo.png' style={{ objectFit: 'cover', width: '100%', maxWidth: '300px', maxHeight: '300px' }}/>
                            <RowIdx xs={ 1 } sm={ 2 }>
                                {
                                    (currentPathname !== JSON.parse(Cookies.get('x_auth_user'))['username']) ? 
                                    <FormIdx
                                        action='#'
                                        method='POST'
                                        encType='multipart'
                                        onSubmit={ evt => addUser(evt) }>
                                        <InputIdx 
                                            fieldType='regular'
                                            name='id'
                                            value={ JSON.parse(Cookies.get('x_auth_user'))['id'] } 
                                            hidden={ true }/>
                                        <InputIdx 
                                            fieldType='regular'
                                            name='member_username'
                                            value={ currentPathname } 
                                            hidden={ true }/>
                                        <BtnIdx 
                                            type='submit'
                                            text='Send friend invitation'/>
                                    </FormIdx> : ''
                                }
                                <ColIdx>
                                    message
                                </ColIdx>
                            </RowIdx>
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            badges
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            Friends
                            <Link to='friends'>See all</Link>
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            communities
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            memes
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            activities
                        </ContainerIdx>
                    </ColIdx>
                    <ColIdx columnClass='' sm={ 8 }>
                        <ContainerIdx type='regular' containerClass=''>
                            cover photo
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            featured stories
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            <Link to='posts'>Posts</Link>
                        </ContainerIdx>
                        <Outlet />
                    </ColIdx>
                </RowIdx>
            </ContainerIdx>
        </ContainerIdx>
    )
};

export default Profile;