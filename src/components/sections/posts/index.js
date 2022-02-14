import { useState, useEffect, useRef } from "react";
import { useLocation, useParams, matchPath } from "react-router-dom";
import Cookies from "js-cookie";
import axiosDef from "../../../util/Request";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPaw } from "@fortawesome/free-solid-svg-icons";

import Container from "../../core/Container";
import { Post as PostSection } from '../../widgets/post'
import Form from "../../widgets/Form";
import Input from "../../core/Input";
import Label from "../../core/Label";
import Button from "../../core/Button";
import Card from "../../widgets/Card";

export const Posts = ({ showUserPosts }) => {
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState(null);
    const [pageSize, setPageSize] = useState(0);
    const [chunkedPosts, setChunkedPosts] = useState(null);
    const location = useLocation();
    const params = useParams();

    const imageRef = useRef();

    const focusField = evt => {
        evt.current.click();
    }

    const getUserPosts = async(evt) => {
        const userPosts = []
        
        await axiosDef.get('http://localhost:8000/api/user/' + params.username + '/posts')

        .then (res => {
            const userPostsRes = res.data;

            if (userPostsRes.isSuccess) {
                userPosts.push(userPostsRes.data);
            } else {
                console.log('res error get user posts ', userPostsRes.data);
            }
        })

        .catch (err => {
            console.log('err get user posts ', err);
        })

        return userPosts;
    }

    const getFriendsPosts = async(evt) => {
        const friendsPosts = []

        await axiosDef.get('http://localhost:8000/api/user/' + JSON.parse(Cookies.get('x_auth_user'))['username'] + '/friends/posts')

        .then (res => {
            const friendsPostsRes = res.data;

            if (friendsPostsRes.isSuccess) {
                console.log('success post get friends')
                friendsPosts.push(friendsPostsRes.data)
            } else {
                console.log('res error get friends posts ', friendsPostsRes.data);
            }
        })

        .catch (err => {
            console.log('err get friends posts ', err);
        })

        return friendsPosts;
    }

    const postForm = evt => {
        evt.preventDefault();

        const postForm = new FormData(evt.target);
        postForm.append('id', JSON.parse(Cookies.get('x_auth_user'))['id']);

        axiosDef.post('http://localhost:8000/api/post/create', postForm)

        .then(res => {
            const postRes = res.data;

            if (postRes.isSuccess) {
                setBody('');

                // clear file input
                imageRef.current.value = '';

                // refresh posts
                handlePosts();
            } else {
                console.log('texttttt: ', postRes.data);
            }
        })

        .catch(err => {
            console.log('err: ', err.response);
        })
    }

    const handlePosts = () => {
        if (showUserPosts) {
            const userPostsRes = getUserPosts();

            userPostsRes.then(res => {
                console.log('res ', res)
                setPosts(res[0]);
            })
    
            .catch (err => {
                console.log('err user ', err)
            })
        } else {
            console.log('show friends posts')

            const friendsPostsRes = getFriendsPosts();

            friendsPostsRes.then(res => {
                setPosts(res[0]);
            })
    
            .catch (err => {
                console.log('err user ', err)
            })
        }
    }

    const setPage = evt => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

        const currentPage = parseInt(evt.selected) + 1;

        const minIndex = (currentPage * 10) - 10;
        const maxIndex = (currentPage * 10);

        setTimeout(() => {
            if (maxIndex > Object.keys(posts).length && (currentPage === pageSize)) {
                setChunkedPosts(posts['posts'] ? posts['posts'].slice(minIndex) : posts.slice(minIndex));
            } else {
                setChunkedPosts(posts['posts'] ? posts['posts'].slice(minIndex, maxIndex) : posts.slice(minIndex, maxIndex));
            }
        }, 700);
    }

    useEffect(() => {
        let loading = true;

        if (loading) {
            handlePosts();
        }

        return () => {
            loading = false;
        }
    }, [params.username])

    useEffect(() => {
        let loading = true;

        if (loading && posts) {
            posts && setChunkedPosts(posts['posts'] ? posts['posts'].slice(0, 5) : posts.slice(0, 5));
            setPageSize(Math.ceil(posts['posts'] ? posts['posts'].length / 10 : posts.length / 10));

            return () => {
                loading = false;
            }
        }
    }, [posts])

    return (
        <>
            {
                (location.pathname !== '/home') && 
                <Container type='regular'>
                    <Form 
                    action='#' 
                    method='POST' 
                    encType='multipart' 
                    onSubmit={ postForm }>
                        <Input
                        fieldType='textarea' 
                        inputClass='form-control' 
                        value={ body } 
                        name='body' 
                        onChange={ setBody } 
                        rows={ 4 }/>
                        <Container type='regular' className='mt-3 d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-sm-center'>
                            <Label 
                            text={ <FontAwesomeIcon icon={ faImages } className='fa-2x'/> } 
                            refTarget={ imageRef } 
                            labelOnclick={ focusField } 
                            className='pointer-cursor mt-3 mt-sm-0 align-self-center'/>
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
                            text='post'
                            color='yellow'/>
                        </Container>
                    </Form>
                </Container>
            }
            <Container 
            type='regular' 
            className={ ((location.pathname !== '/home') ? 'mt-5 ' : '') + 'd-flex flex-column p-3' }
            color='neutral'>
            {
                chunkedPosts && Object.keys(chunkedPosts).map((i, val) => {
                    const data = Object.values(chunkedPosts)[val];
                    const postId = Object.values(chunkedPosts)[val]['id'] ? Object.values(chunkedPosts)[val]['id'] : Object.values(chunkedPosts)[val]['post_id'];
                    const userThumbnail = posts['display_photo'] ? posts['display_photo']['image_path'] : '';

                    return (
                        <PostSection 
                        key={ 'post-' + postId }
                        data={ data } 
                        showUserPosts={ showUserPosts }
                        userThumbnail={ userThumbnail }/>
                    )
                })
            }
            {
                !(chunkedPosts) && 
                <Card type='regular' color='neutral'>
                    <Container type='regular' className='d-flex justify-content-center align-items-center'>
                        <FontAwesomeIcon icon={ faPaw } size='1x' className='me-3'/> No post to show
                    </Container>
                </Card>
            }
            {
                posts && 
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
            </Container>
        </>
    )
};

export default Posts;