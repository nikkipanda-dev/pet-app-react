import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
    const [user, setUser] = useState(null);
    const currentPathname = location.pathname.startsWith('/u/') && location.pathname.replace('/u/', ''); // current username

    const userId = Cookies.get('x_auth_user') && JSON.parse(Cookies.get('x_auth_user'))['id'];
    const [userPosts, setUserPosts] = useState(null);
    const [friends, setFriends] = useState(null);
    const [postId, setPostId] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [body, setBody] = useState('');

    // pagination
    const [chunkedPosts, setChunkedPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const imageRef = useRef();

    const handleShowEdit = evt => {
        setPostId((evt.target.nodeName !== 'A') ? evt.target.closest('a').dataset.targetPostId : evt.target.dataset.targetPostId);
        setBody((evt.target.nodeName !== 'A') ? evt.target.closest('a').dataset.targetBody : evt.target.dataset.targetBody);

        setShowEdit(true);
    }

    const handleHideEdit = evt => {
        setPostId('');
        setBody('');

        setShowEdit(false);
    }

    const handleShowDelete = evt => {
        setPostId((evt.target.nodeName !== 'A') ? evt.target.closest('a').dataset.targetPostId : evt.target.dataset.targetPostId);

        setShowDelete(true);
    }

    const handleHideDelete = evt => {
        setPostId('');

        setShowDelete(false);
    }

    const focusField = evt => {
        evt.current.click();
    }

    const getUserPosts = async(user) => {
        console.log('user: ', user)
        await axiosDef.get('http://localhost:8000/api/user/' + user + '/posts')

        .then (res => {
            const userPostsRes = res.data;

            if (userPostsRes.isSuccess) {
                setUserPosts([ ...userPostsRes.data ]);
                setIsLoading(false);
            } else {
                console.log('user err res: ', userPostsRes.data);
            }
        })

        .catch (err => {
            console.log('user err: ', err)
        })
    }

    const updateUserPost = evt => {
        evt.preventDefault();

        const updatePostForm = new FormData(evt.target)

        axiosDef.post('http://localhost:8000/api/post/update', updatePostForm)

        .then (res => {
            const updatePostRes = res.data;

            if (updatePostRes.isSuccess) {
                // clear input file
                imageRef.current.value = '';

                // setsetUserPosts
                const newPosts = userPosts.filter((i, val) => {
                    return i['id'] !== updatePostRes.data['id']
                });
                updatePostRes.data['updated'] = true;
                setUserPosts([ updatePostRes.data, ...newPosts ])

                // hide modal
                handleHideEdit();
            } else {
                console.log('err res', updatePostRes.data)
            }
        })

        .catch (err => {
            console.log('EERRRRRRRRRRRR: ', err.response.data.errors);
        })
    }

    const deleteUserPost = evt => {
        evt.preventDefault();

        console.log('del')

        const deletePostForm = new FormData(evt.target);

        axiosDef.post('http://localhost:8000/api/post/delete', deletePostForm)

        .then (res => {
            const deletePostRes = res.data;

            if (deletePostRes.isSuccess) {
                getUserPosts();
                handleHideDelete();   
            } else {
                console.log('del err: ', deletePostRes.data);
            }
        })

        .catch (err => {
            console.log('del err: ', err.response.data.errors);
        })
    }

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

    // const 

    const getFriends = async() => {
        await axiosDef.get('http://localhost:8000/api/user/' + currentPathname + '/friends')

        .then (res => {
            console.log('fre res: ', res.data);
            const getFriendsRes = res.data;

            if (getFriendsRes.isSuccess) {
                setFriends(getFriends.data);
                setIsLoading(false);
            } else {
                console.log('get friends err: ', getFriendsRes.data);
            }
        })

        .catch (err => {
            console.log('fre err: ', err.response.data.errors);
        })
    }

    useEffect(() => {
        if (userPosts === null && isLoading) {
            console.log('1st useeffect')

            getUserPosts(currentPathname);
        }

        if (user === null && isLoading) {
            setUser(currentPathname);
        }

        if (friends === null && isLoading) {
            getFriends();
        }
    }, []);

    useEffect(() => {
        userPosts && setChunkedPosts(userPosts.slice(0, 10));
    }, [userPosts])

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
                            Followers
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
                            View posts from: username | username's friends
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                        {
                            chunkedPosts && chunkedPosts.map(i => {
                                const userPostId = i['id'];
                                const authorPostId = i['user_id'];
                                const userPostCreated = i['created_at'];
                                const userPostUpdated = i['updated_at'];
                                const isUpdated = i['updated'];
                                const userPostBody = i['body'];
                                const userPostImages = i['post_images'];

                                return (
                                    <CardIdx key={ 'post' + userPostId } cardClass='bg-secondary mb-3'>
                                        <RowIdx>
                                            <ColIdx columnClass='bg-warning'>
                                                { userPostCreated } // Updated { userPostUpdated }
                                            </ColIdx>
                                            <ColIdx columnClass='bg-secondary'>
                                                {
                                                    (JSON.parse(Cookies.get('x_auth_user'))['username'] === currentPathname) ? 
                                                    <>
                                                        <AnchorIdx
                                                            type='modal' 
                                                            text={ <FontAwesomeIcon icon={ faEdit } className='fa-2x'/> }
                                                            anchorClass='' 
                                                            dataTargetPostId={ userPostId } 
                                                            dataTargetBody={ userPostBody }
                                                            anchorOnclick={ handleShowEdit }/>
                                                        <AnchorIdx
                                                            type='modal' 
                                                            text={ <FontAwesomeIcon icon={ faTrash } className='fa-2x'/> }
                                                            anchorClass='' 
                                                            dataTargetPostId={ userPostId } 
                                                            dataTargetBody={ userPostBody }
                                                            anchorOnclick={ handleShowDelete }/>
                                                    </> : ''
                                                }
                                            </ColIdx>
                                            <ColIdx columnClass='bg-primary' sm={ 12 }>
                                                {
                                                    userPostImages && userPostImages.map(i => {
                                                        const postImageURL = new URL(i['image_path'], 'http://localhost:8000/storage/posts/');

                                                        return (
                                                            <ImgIdx 
                                                                key={ 'post' + userPostId + 'img' + i['id'] } 
                                                                src={ postImageURL } 
                                                                imgClass='img-fluid img-thumbnail curved-border' 
                                                                imgStyle={{ objectFit: 'cover', width: '100px', height: '100px' }}/>
                                                        )
                                                    })
                                                }
                                            </ColIdx>
                                            <ColIdx columnClass='bg-success' sm={ 12 }>
                                                <p>{ userPostBody }</p> post ID: { userPostId } author ID: { JSON.parse(Cookies.get('x_auth_user'))['id'] }
                                            </ColIdx>
                                            <ColIdx columnClass='bg-danger' sm={ 12 }>
                                                <AnchorIdx 
                                                        type='toggle' 
                                                        text='Comment' 
                                                        isShown={ showComment }
                                                        anchorOnclick= { setShowComment }/>
                                                    <ContainerIdx type='regular' containerClass={ showComment ? 'd-block' : 'd-none' }>
                                                        helo comment here
                                                    </ContainerIdx>
                                            </ColIdx>
                                        </RowIdx>
                                    </CardIdx>
                                )
                            })
                        }
                        </ContainerIdx>
                        <Pagination 
                        total={ userPosts ? Object.keys(userPosts).length : '' } 
                        currentPage={ currentPage } 
                        setCurrentPage={ setCurrentPage } 
                        pageSize={ 10 } 
                        setChunkedPosts={ setChunkedPosts } 
                        data={ userPosts }/> 
                    </ColIdx>
                </RowIdx>
            </ContainerIdx>
            <ModalIdx 
                type='regular' 
                btnOnhide={ handleHideDelete } 
                modalSize='md' 
                isShown={ showDelete } 
                modalHeader='Confirmation'>
                <ContainerIdx type='regular' >
                    <FormIdx
                        action='#' 
                        method='POST' 
                        encType='multipart' 
                        onSubmit={ evt => deleteUserPost(evt) }>
                        <InputIdx 
                            name='id'
                            value={ userId } 
                            hidden={ true }/>
                        <InputIdx 
                            name='post_id'
                            value={ postId } 
                            hidden={ true }/>
                        <BtnIdx 
                            type='submit' 
                            text='Delete' 
                            btnClass='' />
                    </FormIdx>
                </ContainerIdx>
            </ModalIdx>
            <ModalIdx 
                type='regular' 
                btnOnhide={ handleHideEdit } 
                modalSize='md' 
                isShown={ showEdit } 
                modalHeader='test'>
                <ContainerIdx 
                    type='regular' >
                    <FormIdx
                        action='#' 
                        method='POST' 
                        encType='multipart' 
                        onSubmit={ evt => updateUserPost(evt) }>
                        <InputIdx 
                            fieldType='regular'
                            name='id'
                            value={ userId } 
                            hidden={ true }/>
                        <InputIdx 
                            fieldType='regular'
                            name='post_id'
                            value={ postId } 
                            hidden={ true }/>
                        <InputIdx 
                            fieldType='textarea'
                            textareaClass='' 
                            onChange={ setBody } 
                            rows={ 3 } 
                            name='body'
                            defaultValue={ body }/>
                        <LabelIdx 
                            text={ <FontAwesomeIcon icon={ faImages } className='fa-2x'/> } 
                            refTarget={ imageRef } 
                            labelOnclick={ focusField } 
                            labelClass='pointer-cursor mt-3 mt-sm-0 align-self-center'/>
                        <InputIdx 
                            fieldType='file' 
                            type='file' 
                            refTarget={ imageRef } 
                            name='images[]' 
                            inputClass='bg-purple-200' 
                            accept='image/*' 
                            multiple={ true } 
                            hidden={ true }/>
                        <BtnIdx 
                            type='submit' 
                            text='Save' 
                            btnClass=''/>
                    </FormIdx>
                </ContainerIdx>
            </ModalIdx>
        </ContainerIdx>
    )
};

export default Profile;