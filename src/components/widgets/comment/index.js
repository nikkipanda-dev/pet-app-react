import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

import Container from "../../core/Container";
import Card from "../Card";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Image from "../../core/Image";

export const Comment = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [commentBody, setCommentBody] = useState(null);
    const [commentDatePosted, setCommentDatePosted] = useState(null);
    const [commentDateUpdated, setCommentDateUpdated] = useState(null);
    const [commentDateDeleted, setCommentDateDeleted] = useState(null);
    const [commentAuthor, setCommentAuthor] = useState(null);

    useEffect(() => {
        !(commentBody) && (data && setCommentBody(data['body']));
        !(commentDatePosted) && (data && setCommentDatePosted(data['created_at']));
        !(commentDateUpdated) && (data && setCommentDateUpdated(data['updated_at']));
        !(commentDateDeleted) && (data && setCommentDateDeleted(data['deleted_at']));
        !(commentAuthor) && (data && setCommentAuthor(data['user']['username']));
    }, [])

    return (
        <Card type='regular' color='white' border='none' className='my-3 p-2' css={{ height: 'auto', }}>
            <Row className=''>
                <Column
                className='d-flex flex-column align-items-start justify-content-center'
                xs={ 12 }
                sm={ 6 }>
                {
                    data['display_photo']['image_path'] && 
                    <Image 
                    src={ new URL(data['display_photo']['image_path'], 'http://localhost:8000/storage/display_photos/') } 
                    style={{ objectFit: 'cover', width: '70px', height: '70px', maxHeight: '100%', }}/>
                }
                    { commentAuthor }
                </Column>
                <Column
                className='d-flex flex-column align-items-end justify-content-center'
                xs={ 12 }
                sm={ 6 }>
                    <FontAwesomeIcon icon={ faPaw } size='1x' style={{ color: '#ff9f1c' }}/>
                </Column>
                <Column
                className=''
                xs={ 12 }>
                    <p className='my-'>{ commentBody }</p>
                </Column>
                <Column
                className='d-flex flex-column align-items-end justify-content-center'
                xs={ 12 }>
                {
                    new Intl.DateTimeFormat('en-US', {
                        timeZone: 'Asia/Manila',
                        dateStyle: 'full',
                        timeStyle: 'medium',
                        hourCycle: 'h12',
                    }).format(new Date(commentDatePosted))
                }
                </Column>
            </Row>
        </Card>
    )
};

export default Comment;