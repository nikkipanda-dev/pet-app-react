import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axiosDef from "../../../util/Request";
import ReactPaginate from 'react-paginate';

import Container from "../../core/Container";
import { Post as PostSection } from '../../widgets/post'

export const Posts = ({ isDefault, showUserPosts }) => {
    const [posts, setPosts] = useState(null);
    const [pageSize, setPageSize] = useState(0);
    const [chunkedPosts, setChunkedPosts] = useState(5);
    const location = useLocation();
    const currentPathname = isDefault ? location.pathname.slice(3) + '/posts' : location.pathname.slice(3);

    // console.log('posts ', posts)

    const getUserPosts = async(evt) => {
        const userPosts = []
        
        await axiosDef.get('http://localhost:8000/api/user/' + currentPathname.slice(0, -6) + '/posts')

        .then (res => {
            const userPostsRes = res.data;

            if (userPostsRes.isSuccess) {
                // console.log(userPostsRes.data)
                userPosts.push(userPostsRes.data);
            } else {
                console.log('res error get comments ', userPostsRes.data);
            }
        })

        .catch (err => {
            console.log('err get comments ', err);
        })

        return userPosts;
    }

    const getFriendsPosts = async(evt) => {
        const friendsPosts = []

        await axiosDef.get('http://localhost:8000/api/user/' + JSON.parse(Cookies.get('x_auth_user'))['username'] + '/friends/posts')

        .then (res => {
            const friendsPostsRes = res.data;

            if (friendsPostsRes.isSuccess) {
                friendsPosts.push(friendsPostsRes.data)
            } else {
                console.log('res error get comments ', friendsPostsRes.data);
            }
        })

        .catch (err => {
            console.log('err get comments ', err);
        })

        return friendsPosts;
    }

    const handlePosts = () => {
        if (showUserPosts) {
            const userPostsRes = getUserPosts();

            userPostsRes.then(res => {
                setPosts(res[0]);
            })
    
            .catch (err => {
                console.log('err user ', err)
            })
        } else {
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
        handlePosts();
    }, [currentPathname])

    useEffect(() => {
        if (posts) {
            setChunkedPosts(posts['posts'] ? posts['posts'].slice(0, 5) : posts.slice(0, 5));
            setPageSize(Math.ceil(posts['posts'] ? posts['posts'].length / 10 : posts.length / 10));
        }
    }, [posts])

    return (
        <Container type='regular'>
        {
            chunkedPosts && Object.keys(chunkedPosts).map((i, val) => {
                const data = Object.values(chunkedPosts)[val];
                const postId = Object.values(chunkedPosts)[val]['id'] ? Object.values(chunkedPosts)[val]['id'] : Object.values(chunkedPosts)[val]['post_id'];
                const userThumbnail = posts['display_photo'] ? posts['display_photo']['image_path'] : '';
                
                console.log('data', data)

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
        </Container>
    )
};

export default Posts;