import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosDef from "../../../util/Request";

import Container from "../../core/Container";
import Post from "../../widgets/post";

export const Posts = () => {
    const [posts, setPosts] = useState(null);

    const getFriendsPosts = async(evt) => {
        await axiosDef.get('http://localhost:8000/api/user/' + JSON.parse(Cookies.get('x_auth_user'))['username'] + '/friends/posts')

        .then (res => {
            const getPostsRes = res.data;

            if (getPostsRes.isSuccess) {
                setPosts(getPostsRes.data);
            } else {
                console.log('res error get comments ', getPostsRes.data);
            }
        })

        .catch (err => {
            console.log('err get comments ', err);
        })
    }

    useEffect(() => {
        if (posts === null) {
            getFriendsPosts();
        }
    }, []);

    return (
        <Container type='regular'>
            {
                posts && Object.keys(posts).map((i, val) => {
                    const data = Object.values(posts)[val];
                    const postId = Object.values(posts)[val]['post_id'];

                    return (
                        <Post 
                        key={ 'post-' + postId }
                        data={ data }/>
                    )
                })
            }
        </Container>
    )
};

export default Posts;