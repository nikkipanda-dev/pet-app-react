import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axiosDef from '../../../../util/Request';
import Cookies from 'js-cookie';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImages, faTrash } from '@fortawesome/free-solid-svg-icons';

import Container from '../../../core/Container';
import Card from '../../../widgets/Card';
import Row from '../../../core/Row';
import Column from '../../../core/Column';
import Anchor from '../../../core/Anchor';
import Image from '../../../core/Image';
import Modal from '../../../widgets/Modal';
import Form from '../../../widgets/Form';
import Label from '../../../core/Label';
import Input from '../../../core/Input';
import Button from '../../../core/Button';

export const Posts = ({ isDefault }) => {
    const location = useLocation();
    const userId = Cookies.get('x_auth_user') && JSON.parse(Cookies.get('x_auth_user'))['id'];
    const [postId, setPostId] = useState(null);
    const [isPostsLoading, setIsPostLoading] = useState(true);
    const postsPathname = isDefault ? location.pathname.slice(3) + '/posts' : location.pathname.slice(3); // current username and action

    const [userPosts, setUserPosts] = useState(null);
    const [pageSize, setPageSize] = useState(0);
    const [showComment, setShowComment] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [body, setBody] = useState('');

    const imageRef = useRef();

    // pagination
    const [chunkedPosts, setChunkedPosts] = useState(null);

    const focusField = evt => {
        evt.current.click();
    }

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

    const getUserPosts = async(user) => {
        await axiosDef.get('http://localhost:8000/api/user/' + postsPathname)

        .then (res => {
            const userPostsRes = res.data;

            if (userPostsRes.isSuccess) {
                console.log('success')
                setUserPosts([ ...userPostsRes.data ]);
                setIsPostLoading(false);
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
        updatePostForm.append('id', parseInt(JSON.parse(Cookies.get('x_auth_user'))['id'], 10));
        updatePostForm.append('post_id', parseInt(postId));

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

        const deletePostForm = new FormData(evt.target);
        deletePostForm.append('id', parseInt(JSON.parse(Cookies.get('x_auth_user'))['id'], 10));
        deletePostForm.append('post_id', parseInt(postId));

        axiosDef.post('http://localhost:8000/api/post/delete', deletePostForm)

        .then (res => {
            const deletePostRes = res.data;

            if (deletePostRes.isSuccess) {
                setUserPosts(userPosts && userPosts.filter(i => {
                    return (i['id'] !== parseInt(postId)) && i
                }));
                handleHideDelete();   
            } else {
                console.log('del err: ', deletePostRes.data);
            }
        })

        .catch (err => {
            console.log('del err: ', err.response.data.errors);
        })
    }

    useEffect(() => {
        console.log('1st')
        if ((userPosts === null) && isPostsLoading) {
            console.log('1st effect')
            getUserPosts(postsPathname.slice(0, -6));
        }
    }, []);
    
    useEffect(() => {
        console.log('2nd effect')
        userPosts && setChunkedPosts(userPosts.slice(0, 10));
        userPosts && setPageSize(Math.ceil(Object.keys(userPosts).length / 10));
    }, [userPosts])

    const setPage = evt => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        const currentPage = parseInt(evt.selected) + 1;

        const minIndex = (currentPage * 10) - 10;
        const maxIndex = (currentPage * 10);

        setTimeout(() => {
            if (maxIndex > Object.keys(userPosts).length && (currentPage === pageSize)) {
                setChunkedPosts(userPosts.slice(minIndex));
            } else {
                setChunkedPosts(userPosts.slice(minIndex, maxIndex));
            }
        }, 700);
    }

    return (
        <Container type='regular' containerClass='mt-3'>
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
                    <Card key={ 'post' + userPostId } cardClass='mb-3'>
                        <Row rowClass='m-1 g-0'>
                            <Column columnClass='' sm={ 6 }>
                                { userPostCreated } // Updated { userPostUpdated }
                            </Column>
                            <Column columnClass='' sm={ 6 }>
                                {
                                    (JSON.parse(Cookies.get('x_auth_user'))['username'] === postsPathname.slice(0, -6)) ? 
                                    <>
                                        <Anchor
                                            type='modal' 
                                            text={ <FontAwesomeIcon icon={ faEdit } className='fa-2x'/> }
                                            anchorClass='' 
                                            dataTargetPostId={ userPostId } 
                                            dataTargetBody={ userPostBody }
                                            anchorOnclick={ handleShowEdit }/>
                                        <Anchor
                                            type='modal' 
                                            text={ <FontAwesomeIcon icon={ faTrash } className='fa-2x'/> }
                                            anchorClass='' 
                                            dataTargetPostId={ userPostId } 
                                            dataTargetBody={ userPostBody }
                                            anchorOnclick={ handleShowDelete }/>
                                    </> : ''
                                }
                            </Column>
                            <Column columnClass='' sm={ 12 }>
                                {
                                    userPostImages && userPostImages.map(i => {
                                        const postImageURL = new URL(i['image_path'], 'http://localhost:8000/storage/posts/');

                                        return (
                                            <Image 
                                                key={ 'post' + userPostId + 'img' + i['id'] } 
                                                src={ postImageURL } 
                                                imgClass='img-fluid img-thumbnail curved-border' 
                                                imgStyle={{ objectFit: 'cover', width: '100px', height: '100px' }}/>
                                        )
                                    })
                                }
                            </Column>
                            <Column columnClass='' sm={ 12 }>
                                <p>{ userPostBody }</p> post ID: { userPostId } author ID: { JSON.parse(Cookies.get('x_auth_user'))['id'] }
                            </Column>
                            <Column columnClass='' sm={ 12 }>
                                <Anchor 
                                        type='toggle' 
                                        text='Comment' 
                                        isShown={ showComment }
                                        anchorOnclick= { setShowComment }/>
                                    <Container type='regular' containerClass={ showComment ? 'd-block' : 'd-none' }>
                                        helo comment here
                                    </Container>
                            </Column>
                        </Row>
                    </Card>
                )
            })
        }
        {
            chunkedPosts && 
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                // pageClassName="page-item"
                // pageLinkClassName="page-link"
                // previousClassName="page-item"
                // previousLinkClassName="page-link"
                // nextClassName="page-item"
                // nextLinkClassName="page-link"
                breakLabel="..."
                // breakClassName="page-item"
                // breakLinkClassName="page-link"
                pageCount={ pageSize }
                marginPagesDisplayed={ 2 }
                pageRangeDisplayed={ 5 }
                onPageChange={ setPage }
                containerClassName="pagination"
                activeClassName="active"/>
        }
            <Modal 
                type='regular' 
                btnOnhide={ handleHideDelete } 
                modalSize='md' 
                isShown={ showDelete } 
                modalHeader='Confirmation'>
                <Container type='regular'>
                    <Form
                        action='#' 
                        method='POST' 
                        encType='multipart' 
                        onSubmit={ evt => deleteUserPost(evt) }>
                        <Input 
                            name='id'
                            value={ userId } 
                            hidden={ true }/>
                        <Input 
                            name='post_id'
                            value={ postId } 
                            hidden={ true }/>
                        <Button 
                            type='submit' 
                            text='Delete' 
                            btnClass='' />
                    </Form>
                </Container>
            </Modal>
            <Modal 
                type='regular' 
                btnOnhide={ handleHideEdit } 
                modalSize='md' 
                isShown={ showEdit } 
                modalHeader='test'>
                <Container type='regular' >
                    <Form
                        action='#' 
                        method='POST' 
                        encType='multipart' 
                        onSubmit={ updateUserPost }>
                        <Input 
                            fieldType='textarea'
                            textareaClass='' 
                            onChange={ setBody } 
                            rows={ 3 } 
                            name='body'
                            defaultValue={ body }/>
                        <Label 
                            text={ <FontAwesomeIcon icon={ faImages } className='fa-2x'/> } 
                            refTarget={ imageRef } 
                            labelOnclick={ focusField } 
                            labelClass='pointer-cursor mt-3 mt-sm-0 align-self-center'/>
                        <Input 
                            fieldType='file' 
                            type='file' 
                            refTarget={ imageRef } 
                            name='images[]' 
                            inputClass='bg-purple-200' 
                            accept='image/*' 
                            multiple={ true } 
                            hidden={ true }/>
                        <Button 
                            type='submit' 
                            text='Save' 
                            btnClass=''/>
                    </Form>
                </Container>
            </Modal>
        </Container>
    )
};

export default Posts;