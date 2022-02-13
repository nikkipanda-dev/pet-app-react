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
import Span from "../../core/Span";

export const Post = ({ isDefault, data, showUserPosts, userThumbnail }) => {
    // console.log('data: ', data)
    const [isLoading, setIsLoading] = useState(true);
    const [postId, setPostId] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [postImages, setPostImages] = useState(null);
    const [postDate, setPostDate] = useState(null);
    const [comments, setComments] = useState(null);
    const [commentBody, setCommentBody] = useState('');
    const [limit, setLimit] = useState(5);
    const [postDisplayPhotoPath, setPostDisplayPhotoPath] = useState('');

    console.log('postImages ', postImages)

    const getComments = async() => {
        setIsLoading(false);
        
        await axiosDef.get('http://localhost:8000/api/post/' + postId + '/comments/get', {
            params: {
                'limit': limit,
                'length': comments ? comments.length : 0,
            }
        })

        .then(res => {
            const getCommentsRes = res.data;

            if (getCommentsRes.isSuccess) {
                setComments(getCommentsRes.data);
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
                // const postIndex = Object.keys(posts).findIndex((i, val) => {
                //     return (Object.values(posts)[val]['post_id'] === parseInt(evt.target.dataset.target, 10)) && Object.values(posts)[val]
                // });

                getComments();
                //clear textarea
                document.querySelector("textarea[data-target=comment-" + postId + "]").value='';
            } else {
                console.log('err comment add ', addCommentRes.data);
            }
        })

        .catch (err => {
            console.log('err comment add', err.response.data.errors);
        })
    }

    useEffect(() => {
        if (isLoading) {
            !(postId) && (data && setPostId(data['post_id'] ? data['post_id'] : data['id']));
            !(postBody) && (data && setPostBody(data['body']));
            !(postImages) && (data && setPostImages(data['post_images']));
            !(postAuthor) && (data && setPostAuthor(data['username']));
            !(postDate) && (data && setPostDate(data['date_posted']));
            !(postDisplayPhotoPath) && (userThumbnail && setPostDisplayPhotoPath(userThumbnail));
            !(postDisplayPhotoPath) && (data && data['display_photo']) && setPostDisplayPhotoPath(userThumbnail['image_path']);
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
        <Card type='regular' className='mt-5' color='white'>
            <Row className='m-1'>
                <Column 
                className='d-flex flex-column justify-content-center align-items-center py-sm-3 py-md-4' 
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
                className='d-flex flex-column align-items-end'
                xs={ 10 }
                sm={ 9 }
                md={ 10 }>
                    <FontAwesomeIcon 
                    icon={ faPaw } 
                    size='3x' 
                    style={{ transform: 'translateY(-30px)', color: '#00ebeb', stroke: '#fff', strokeWidth: '30px' }}/>
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
                    <p className='mt-3' style={{ width: '100%', }}>{ postBody }</p>
                </Column>
                <Column className='bg-secondary text-end mt-3' xs={ 12 }>
                    { postDate }
                </Column>
            </Row>
            <Row>
                <Column>
                    <Container type='regular' className='p-3' color='dark'>
                    {
                        comments && 
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
                    </Container>
                </Column>
                {
                    comments && Object.values(comments).map((a, b) => {
                        const commentId = a['id'];
                        const commentData = a;

                        return (
                            <Column 
                            key={ 'comment-' + commentId } 
                            columnClass='bg-success'
                            xs={ 12 }>
                                <Comment data={ commentData }/>
                            </Column>
                        )
                    })
                }
            </Row>
        </Card>
    )
};

export default Post;