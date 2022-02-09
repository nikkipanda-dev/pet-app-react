import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosDef from "../../../util/Request";

import Comment from "../comment";
import Card from "../Card";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Form from "../Form";
import Input from "../../core/Input";
import Button from "../../core/Button";
import Span from "../../core/Span";
import Image from "../../core/Image";

export const Post = ({ isDefault, data, userThumbnail }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [postId, setPostId] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [postDate, setPostDate] = useState(null);
    const [comments, setComments] = useState(null);
    const [commentBody, setCommentBody] = useState('');
    const [limit, setLimit] = useState(5);
    const [postDisplayPhotoPath, setPostDisplayPhotoPath] = useState('');

    const getComments = async() => {
        setIsLoading(false);

        await axiosDef.get('http://localhost:8000/api/post/' + postId + '/comments/get', {
            params: {
                'limit': limit,
                'length': comments ? comments.length : 0,
            }
        })

        .then(res => {
            console.log('res get comment ', res.data)
            const getCommentsRes = res.data;

            if (getCommentsRes.isSuccess) {
                setComments(getCommentsRes.data);
            } else {
                console.log('res err');
            }
        })

        .catch (err => {
            console.log('err comment', err.response.data.errors)
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
            console.log('err comment', err.response && err.response.data.errors);
        })
    }

    useEffect(() => {
        if (isLoading) {
            !(postId) && (data && setPostId(data['post_id']));
            !(postBody) && (data && setPostBody(data['body']));
            !(postAuthor) && (data && setPostAuthor(data['username']));
            !(postDate) && (data && setPostDate(data['date_posted']));
            !(postDisplayPhotoPath) && (userThumbnail && setPostDisplayPhotoPath(userThumbnail));
            !(postDisplayPhotoPath) && (data && data['display_photo']) && setPostDisplayPhotoPath(userThumbnail['image_path']);
        }
    }, []);

    useEffect(() => {
        postId && (!(comments) && (data && getComments()));
    }, [postId])

    return (
        <Card cardClass='bg-purple-100 mb-3 py-3'>
            <Row rowClass=''>
                <Column 
                columnClass='bg-secondary d-flex flex-column' 
                xs={ 12 }
                sm={ 3 }>
                    {
                        postDisplayPhotoPath && 
                        <Image 
                        src={ new URL(postDisplayPhotoPath, 'http://localhost:8000/storage/display_photos/') }
                        imgStyle={{ objectFit: 'cover', width: '70px', height: '70px', maxHeight: '100%', }}/>
                    }
                    { postAuthor }
                </Column>
                <Column 
                columnClass='bg-warning'
                xs={ 12 }
                sm={ 9 }>
                    paw
                </Column>
                <Column 
                columnClass='bg-danger'
                xs={ 12 }>
                    { postBody }
                </Column>
                <Column 
                columnClass='bg-secondary text-end'
                xs={ 12 }>
                    { postDate }
                </Column>
            </Row>
            <Row>
                <Column>
                    <Span type='regular' text='Load more' spanOnclick={ getComments }/>
                    <Form
                    action='#'
                    method='POST'
                    encType='multipart'
                    onSubmit={ evt => addComment(evt) }
                    dataTarget={ 'comment-' + postId }>
                        <Input 
                        fieldType='textarea'
                        onChange={ setCommentBody } 
                        // onFocus={ onFocus }
                        rows={ 1 } 
                        name='body' 
                        value={ commentBody } 
                        dataTarget={ 'comment-' + postId }/>
                        <Button 
                        type='submit'
                        text='Comment'/>
                    </Form>
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