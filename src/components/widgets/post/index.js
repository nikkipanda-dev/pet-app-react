import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosDef from "../../../util/Request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faPaw } from "@fortawesome/free-solid-svg-icons";

import Comment from "../comment";
import Card from "../Card";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Form from "../Form";
import Input from "../../core/Input";
import Button from "../../core/Button";
import Image from "../../core/Image";
import Anchor from "../../core/Anchor";
import Container from "../../core/Container";

export const Post = ({ isDefault, data, showUserPosts, userThumbnail }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [postId, setPostId] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [postImages, setPostImages] = useState(null);
    const [postDate, setPostDate] = useState(null);
    const [comments, setComments] = useState(null);
    const [loadMore, setLoadMore] = useState(false);
    const [commentBody, setCommentBody] = useState('');
    const [limit, setLimit] = useState(5);
    const [postDisplayPhotoPath, setPostDisplayPhotoPath] = useState('');

    const getComments = async() => {        
        await axiosDef.get('http://localhost:8000/api/post/' + postId + '/comments/get', {
            params: {
                'limit': limit,
                'length': comments ? comments.length : 0,
            }
        })

        .then(res => {
            const getCommentsRes = res.data;

            if (getCommentsRes.isSuccess) {
                setComments(getCommentsRes.data['comments']);
                setLoadMore(getCommentsRes.data['loadMore']);
            } else {
                console.log('res err', getCommentsRes.data);
            }
        })

        .catch (err => {
            console.log('err comment get', err)
        })
    }

    const addComment = evt => {
        evt.preventDefault();

        const postCommentForm = new FormData(evt.target);
        postCommentForm.append('id', JSON.parse(Cookies.get('x_auth_user'))['id']);
        postCommentForm.append('post_id', parseInt(postId, 10));

        axiosDef.post('http://localhost:8000/api/post/' + postId + '/comment/store', postCommentForm)
        
        .then (res => {
            const addCommentRes = res.data;

            if(addCommentRes.isSuccess) {
                getComments();
                setCommentBody('');
            } else {
                console.log('err comment add ', addCommentRes.data);
            }
        })

        .catch (err => {
            console.log('err comment add', err.response.data.errors);
        })
    }

    useEffect(() => {
        // if (isLoading) {
        let loading = true;

        if (loading) {
            !(postId) && (data && setPostId(data['post_id'] ? data['post_id'] : data['id']));
            !(postBody) && (data && setPostBody(data['body']));
            !(postImages) && (data && setPostImages(data['post_images']));
            !(postAuthor) && (data && setPostAuthor(data['username']));
            !(postDate) && (data && setPostDate(data['date_posted']));
            !(postDisplayPhotoPath) && (userThumbnail && setPostDisplayPhotoPath(userThumbnail));
            !(postDisplayPhotoPath) && (data && data['display_photo']) && setPostDisplayPhotoPath(userThumbnail['image_path']);

            return () => {
                loading = false;
            }
        }
    }, []);

    useEffect(() => {
        let loading = true;

        if (loading) {
            postId && (!(comments) && (data && getComments()));

            return () => {
                loading = false;
            }
        }
    }, [postId])

    return (
        <Card type='regular' className='mb-5' color='white'>
            <Row className='m-1'>
                <Column 
                className='d-flex flex-column justify-content-center align-items-center p-sm-2 p-md-3' 
                xs={ 2 }
                sm={ 3 }
                md={ 2 }>
                {
                    postDisplayPhotoPath ?  
                    <Image 
                    src={ new URL(postDisplayPhotoPath, 'http://localhost:8000/storage/display_photos/') }
                    imgStyle={{ objectFit: 'cover', width: '70px', height: '70px', maxHeight: '100%', }}/> : <FontAwesomeIcon icon={ faUserSecret } size='3x'/>
                }
                <Container type='regular' className='d-none d-sm-block text-center'>
                    { postAuthor ? postAuthor : JSON.parse(Cookies.get('x_auth_user'))['username'] }
                </Container>
                </Column>
                <Column 
                className='d-flex flex-column align-items-end p-sm-2 p-md-3'
                xs={ 10 }
                sm={ 9 }
                md={ 10 }>
                    <FontAwesomeIcon icon={ faPaw } size='1x' style={{ color: '#ff9f1c' }}/>
                </Column>
                <Column className='mt-3'>
                {
                    (postImages && postImages.length !== 0) ? 
                    <Container type='regular' color='neutral' className='py-3 d-flex justify-content-center'>
                    {
                        postImages.map(i => {
                            const url = new URL(i['image_path'], 'http://localhost:8000/storage/posts/');

                            return (
                                <Image 
                                key={ 'post-' + postId + 'image-' + i['id'] } 
                                src={ url } 
                                className='mx-3'
                                style={{ objectFit: 'cover', width: '150px', height: '150px', maxHeight: '100%', }}/>
                            )
                        })
                    }
                    </Container> : ''
                }
                    <p className='mt-3' style={{ width: '100%', }}>{ postBody } { postId }</p>
                </Column>
                <Column className='text-end mt-3' xs={ 12 }>
                    { postDate }
                </Column>
            </Row>
            <Row>
                <Column xs={ 12 }>
                    <Container type='regular' className='p-3 d-flex flex-column' color='dark'>
                    {
                        loadMore && 
                        <Anchor 
                        type='regular' 
                        text='Load more comments' 
                        size='tiny' 
                        onClick={ getComments }/>
                    }
                        <Form
                        action='#'
                        method='POST'
                        encType='multipart'
                        onSubmit={ evt => addComment(evt) }
                        dataTarget={ 'comment-' + postId }
                        className='d-flex flex-column'>
                            <Input 
                            fieldType='textarea'
                            onChange={ setCommentBody } 
                            rows={ 1 } 
                            name='body' 
                            value={ commentBody } 
                            inputClass='p-2'
                            inputStyle={{ width: '100%' }}
                            dataTarget={ 'comment-' + postId }/>
                            <Button 
                            type='submit'
                            size='tiny'
                            className='mt-3 ms-sm-auto'
                            color='dark'
                            text='Comment'/>
                        </Form>
                    {
                        comments && Object.values(comments).map((a, b) => {
                            const commentId = a['id'];
                            const commentData = a;

                            return (
                                <Comment key={ 'comment-' + commentId } data={ commentData }/>
                            )
                        })
                    }
                    </Container>
                </Column>
            </Row>
        </Card>
    )
};

export default Post;