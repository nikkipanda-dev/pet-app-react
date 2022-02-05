import ReactPaginate from 'react-paginate';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axiosDef from '../../../../util/Request';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImages, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ContainerIdx } from '../../../core/Container';
import { CardIdx } from '../../../widgets/Card';
import { RowIdx } from '../../../core/Row';
import { ColIdx } from '../../../core/Column';
import { AnchorIdx } from '../../../core/Anchor';
import { ImgIdx } from '../../../core/Image';
import { ModalIdx } from '../../../widgets/Modal';
import FormIdx from '../../../widgets/Form';
import { LabelIdx } from '../../../core/Label';
import { InputIdx } from '../../../core/Input';
import { BtnIdx } from '../../../core/Button';
import Pagination from '../../../widgets/Pagination';
import { func } from 'prop-types';

export const Posts = ({ isDefault }) => {
    // console.log(isDefault)

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

    // console.log(postsPathname)
    // console.log('asfASDf', postsPathname.slice(0, -6))
    // console.log('posts ', userPosts)
    // console.log('chunked: ', chunkedPosts)

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

        // console.log('del')

        const deletePostForm = new FormData(evt.target);

        axiosDef.post('http://localhost:8000/api/post/delete', deletePostForm)

        .then (res => {
            const deletePostRes = res.data;

            if (deletePostRes.isSuccess) {
                // getUserPosts();
                handleHideDelete();   
            } else {
                console.log('del err: ', deletePostRes.data);
            }
        })

        .catch (err => {
            console.log('del err: ', err.response.data.errors);
        })
    }

    console.log('chunked: ', chunkedPosts)
    // const chunkPosts = (min, max) => {
    //     console.log('min: ', min)
    //     console.log('max: ', max)
    // }

    // if (userPosts) {
    //     const chunkPosts = page => {
    //         window.scrollTo(0, 0);

    //         const minIndex = (page * pageSize) - pageSize;
    //         const maxIndex = (page * pageSize);
    //         const totalPages = Math.ceil(total / pageSize);

    //         setTimeout(() => {
    //             if (maxIndex > Object.keys(userPosts).length && (page === totalPages)) {
    //                 setChunkedPosts(data.slice(minIndex));
    //             } else {
    //                 setChunkedPosts(data.slice(minIndex, maxIndex));
    //             }
    //         }, 700);
    //     }
    // }

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
        const currentPage = parseInt(evt.selected) + 1;
        console.log('currentPage ', currentPage)

        const minIndex = (currentPage * 10) - 10;
        // ( 2 * 10 ) - 10 = 
        const maxIndex = (currentPage * 10);

        console.log('min in', minIndex)
        console.log('max in', maxIndex)

        setTimeout(() => {
            if (maxIndex > Object.keys(userPosts).length && (currentPage === pageSize)) {
                setChunkedPosts(userPosts.slice(minIndex));
            } else {
                setChunkedPosts(userPosts.slice(minIndex, maxIndex));
            }
        }, 700);
    }

    return (
        <ContainerIdx type='regular' containerClass=''>
            { userPosts &&
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

        {/* {
            chunkedPosts && chunkedPosts.map(i => {
                const userPostId = i['id'];
                const authorPostId = i['user_id'];
                const userPostCreated = i['created_at'];
                const userPostUpdated = i['updated_at'];
                const isUpdated = i['updated'];
                const userPostBody = i['body'];
                const userPostImages = i['post_images'];

                // console.log('inside')

                // <CardIdx key={ 'post' + userPostId } cardClass='bg-secondary mb-3'>
                //     <RowIdx>
                //         <ColIdx columnClass='bg-warning'>
                //             { userPostCreated } // Updated { userPostUpdated }
                //         </ColIdx>
                //         <ColIdx columnClass='bg-secondary'>
                //             {
                //                 (JSON.parse(Cookies.get('x_auth_user'))['username'] === postsPathname.slice(0, -6)) ? 
                //                 <>
                //                     <AnchorIdx
                //                         type='modal' 
                //                         text={ <FontAwesomeIcon icon={ faEdit } className='fa-2x'/> }
                //                         anchorClass='' 
                //                         dataTargetPostId={ userPostId } 
                //                         dataTargetBody={ userPostBody }
                //                         anchorOnclick={ handleShowEdit }/>
                //                     <AnchorIdx
                //                         type='modal' 
                //                         text={ <FontAwesomeIcon icon={ faTrash } className='fa-2x'/> }
                //                         anchorClass='' 
                //                         dataTargetPostId={ userPostId } 
                //                         dataTargetBody={ userPostBody }
                //                         anchorOnclick={ handleShowDelete }/>
                //                 </> : ''
                //             }
                //         </ColIdx>
                //         <ColIdx columnClass='bg-primary' sm={ 12 }>
                //             {
                //                 userPostImages && userPostImages.map(i => {
                //                     const postImageURL = new URL(i['image_path'], 'http://localhost:8000/storage/posts/');

                //                     return (
                //                         <ImgIdx 
                //                             key={ 'post' + userPostId + 'img' + i['id'] } 
                //                             src={ postImageURL } 
                //                             imgClass='img-fluid img-thumbnail curved-border' 
                //                             imgStyle={{ objectFit: 'cover', width: '100px', height: '100px' }}/>
                //                     )
                //                 })
                //             }
                //         </ColIdx>
                //         <ColIdx columnClass='bg-success' sm={ 12 }>
                //             <p>{ userPostBody }</p> post ID: { userPostId } author ID: { JSON.parse(Cookies.get('x_auth_user'))['id'] }
                //         </ColIdx>
                //         <ColIdx columnClass='bg-danger' sm={ 12 }>
                //             <AnchorIdx 
                //                     type='toggle' 
                //                     text='Comment' 
                //                     isShown={ showComment }
                //                     anchorOnclick= { setShowComment }/>
                //                 <ContainerIdx type='regular' containerClass={ showComment ? 'd-block' : 'd-none' }>
                //                     helo comment here
                //                 </ContainerIdx>
                //         </ColIdx>
                //     </RowIdx>
                // </CardIdx>
            })
        } */}
            <ModalIdx 
                type='regular' 
                btnOnhide={ handleHideDelete } 
                modalSize='md' 
                isShown={ showDelete } 
                modalHeader='Confirmation'>
                <ContainerIdx type='regular'>
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
                <ContainerIdx type='regular' >
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

export default Posts;