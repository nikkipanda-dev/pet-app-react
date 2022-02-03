import { useState, useEffect, createRef, } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosDef from '../../../util/Request';
import Cookies from 'js-cookie';
import { faEdit, faImages } from '@fortawesome/free-solid-svg-icons';

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
import { func } from 'prop-types';

const Profile = () => {
    const navigate = useNavigate();

    const userID = Cookies.get('x_auth_user') ? JSON.parse(Cookies.get('x_auth_user'))['id'] : navigate('/');
    const [userPosts, setUserPosts] = useState(null);
    const [postId, setPostId] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [body, setBody] = useState('');
    const [images, setImages] = useState([]);

    // pagination
    const [chunkedPosts, setChunkedPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [minIndex, setMinIndex] = useState(null);
    const [maxIndex, setMaxIndex] = useState(null);

    // console.log('size: ', userPosts);

    const imageRef = createRef();

    const handleShowEdit = evt => {
        setPostId((evt.target.nodeName !== 'A') ? evt.target.closest('a').dataset.targetPostId : evt.target.dataset.targetPostId);
        setBody((evt.target.nodeName !== 'A') ? evt.target.closest('a').dataset.targetBody : evt.target.dataset.targetBody);

        setShowEdit(true);
    }

    const handleHideEdit = evt => {
        setPostId('');
        setBody('');
        setImages([]);

        setShowEdit(false);
    }

    const focusField = evt => {
        evt.current.click();
    }

    const inputFiles = evt => {
        [ ...evt.target.files ].map(i => {
            console.log('img: ', i)
            setImages([ ...images, i ]);
        })
    }

    const getUserPosts = async() => {
        await axiosDef.get('http://localhost:8000/api/user/' + JSON.parse(Cookies.get('x_auth_user'))['username'] + '/posts', {
            params: {
                'id': JSON.parse(Cookies.get('x_auth_user'))['id'],
            }
        })

        .then (res => {
            const userPostsRes = res.data;

            console.log(userPostsRes)

            if (userPostsRes.isSuccess) {
                setUserPosts([ ...userPostsRes.data ]);
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
                getUserPosts();
                setShowEdit(false);
            } else {
                console.log('err res', updatePostRes.data)
            }
        })

        .catch (err => {
            console.log('EERRRRRRRRRRRR: ', err);
        })
    }

    useEffect(() => {
        if (userPosts === null) {
            getUserPosts();
        }
    }, []);

    // const handlePageChange = evt => {
    //     console.log('page: ', evt);

    //     if (chunkedPosts.length === 10) {
    //         setChunkedPosts(userPosts.slice((evt * 10) - 10, (evt * 1) - 1));
    //     } else if (chunkedPosts.length < 10) {
    //         setChunkedPosts(userPosts.slice((evt * 10) - 10));
    //     }
    //     setCurrentPage(evt);
    // }

    // console.log('chunked: ', chunkedPosts);

    console.log('len', userPosts && userPosts.length);
    const chunkPosts = page => {
        console.log('page: ', page);
        const minIndex = (page * 10) - 10;
        const maxIndex = (page * 10);
        const numPages = Math.ceil(userPosts.length / 10);

        if (maxIndex > userPosts.length && (page === numPages)) {
            console.log('maxIndex > userPosts.length && (page === numPages)')
            setChunkedPosts(userPosts.slice(minIndex));
        } else {
            console.log('else')
            setChunkedPosts(userPosts.slice(minIndex, maxIndex));
        }
    }

    console.log('chunked: ', chunkedPosts);
    const prev = evt => {
        let prevPage = parseInt(evt.target.dataset.targetPage, 10);

        if (!(prevPage <= 1) && userPosts) {
            chunkPosts(--prevPage);
            setCurrentPage(prevPage);
        }
    }

    const next = evt => {
        let nextPage = parseInt(evt.target.dataset.targetPage, 10);

        if (!(nextPage >= Math.ceil(userPosts.length / 10)) && userPosts) {
            chunkPosts(++nextPage);
            setCurrentPage(nextPage);
        }
    }

    useEffect(() => {
        if (userPosts) {
            setChunkedPosts(userPosts.slice(0, 10));
            setCurrentPage(1);
            // setMinIndex(0);
            // setMaxIndex(0);
        }
    }, [userPosts])

    return (
        <ContainerIdx fluid={ true } containerClass='pt-5'>
            {
                userPosts ? 
                <div className='mt-5'>
                    <span onClick={ (evt) => prev(evt) } className='me-2' data-target-page={ currentPage }>Prev</span>
                    <span className='me-2'>{ currentPage }</span>
                    <span onClick={ (evt) => next(evt) } data-target-page={ currentPage }>Next</span>
                </div> : ''
            }
            {/* <ContainerIdx fluid='xl' containerClass='mt-5'>
                <RowIdx rowClass='flex-column flex-md-row'>
                    <ColIdx columnClass='' sm={ 4 }>
                        <ContainerIdx type='regular' containerClass=''>
                            photo here
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            badges
                        </ContainerIdx>
                        <ContainerIdx type='regular' containerClass=''>
                            friends
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
                            userPosts && userPosts.map(i => {
                                const userPostId = i['id'];
                                const userPostCreated = i['created_at'];
                                const userPostBody = i['body'];
                                const userPostImages = i['post_images'];

                                return (
                                    <CardIdx key={ 'post' + userPostId } cardClass='bg-secondary mb-3'>
                                        <RowIdx>
                                            <ColIdx columnClass='bg-warning'>
                                                photo thumbnail
                                            </ColIdx>
                                            <ColIdx columnClass='bg-secondary'>
                                                { JSON.parse(Cookies.get('x_auth_user'))['username'] }
                                                <AnchorIdx
                                                    type='modal' 
                                                    text={ <FontAwesomeIcon icon={ faEdit } className='fa-2x'/> }
                                                    anchorClass='' 
                                                    dataTargetPostId={ userPostId } 
                                                    dataTargetBody={ userPostBody }
                                                    anchorOnclick={ handleShowEdit } 
                                                />
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
                                                                imgStyle={{ objectFit: 'cover', width: '100px', height: '100px' }}
                                                            />
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
                                                        anchorOnclick= { setShowComment }
                                                    />
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
                    </ColIdx>
                </RowIdx>
            </ContainerIdx>
            <ModalIdx 
                type='regular' 
                btnOnhide={ handleHideEdit } 
                modalSize='md' 
                isShown={ showEdit } 
                modalHeader='test'
            >
                <ContainerIdx 
                    type='regular' 
                >
                    <FormIdx
                        action='#' 
                        method='POST' 
                        encType='multipart' 
                        onSubmit={ evt => updateUserPost(evt) }
                    >
                        <InputIdx 
                            name='id'
                            value={ userID } 
                            hidden={ true }
                        />
                        <InputIdx 
                            name='post_id'
                            value={ postId } 
                            hidden={ true }
                        />
                        <InputIdx 
                            fieldType='textarea'
                            textareaClass='' 
                            onChange={ setBody } 
                            rows={ 3 } 
                            name='body'
                            defaultValue={ body }
                        />
                        <LabelIdx 
                            text={ <FontAwesomeIcon icon={ faImages } className='fa-2x'/> } 
                            refTarget={ imageRef } 
                            labelOnclick={ focusField } 
                            labelClass='pointer-cursor mt-3 mt-sm-0 align-self-center'
                        />
                        <InputIdx 
                            fieldType='file' 
                            type='file' 
                            refTarget={ imageRef } 
                            name='images[]' 
                            inputClass='bg-purple-200' 
                            // defaultValue={[ ...images ]} 
                            accept='image/*' 
                            onChange={ inputFiles } 
                            multiple={ true } 
                            hidden={ true }
                        />
                        <BtnIdx 
                            type='submit' 
                            text='Save' 
                            btnClass='' 
                        />
                    </FormIdx>
                </ContainerIdx>
            </ModalIdx> */}
        </ContainerIdx>
    )
};

export default Profile;