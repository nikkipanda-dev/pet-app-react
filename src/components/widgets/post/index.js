import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Comment from "../comment";
import Card from "../Card";
import Row from "../../core/Row";
import Column from "../../core/Column";
import axiosDef from "../../../util/Request";

export const Post = ({ data }) => {
    // console.log('data ', data)

    const [isLoading, setIsLoading] = useState(true);
    const [postAuthor, setPostAuthor] = useState(null);
    const [postBody, setPostBody] = useState(null);
    const [postDate, setPostDate] = useState(null);
    const [comments, setComments] = useState(null);
    const [limit, setLimit] = useState(5);

    const getComments = async() => {
        setIsLoading(false);

        await axiosDef.get('http://localhost:8000/api/post/' + data['post_id'] + '/comments/get', {
            params: {
                'limit': limit,
                'length': comments ? comments.length : 0,
            }
        })

        .then(res => {
            const getCommentsRes = res.data;

            if (getCommentsRes.isSuccess) {
                // console.log('success')
                setComments(getCommentsRes.data);
            } else {
                console.log('res err');
            }
        })

        .catch (err => {
            console.log('err comment', err.response.data.errors)
        })
    }

    useEffect(() => {
        if (isLoading) {
            !(postBody) && (data && setPostBody(data['body']));
            !(postAuthor) && (data && setPostAuthor(data['username']));
            !(postDate) && (data && setPostDate(data['date_posted']));
            !(comments) && (data && getComments());
        }
    }, []);

    return (
        <Card cardClass='bg-purple-100 mb-3 py-3'>
            <Row rowClass=''>
                <Column 
                columnClass='bg-secondary' 
                xs={ 12 }
                sm={ 6 }>
                    { postAuthor }
                </Column>
                <Column 
                columnClass='bg-warning'
                xs={ 12 }
                sm={ 6 }>
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