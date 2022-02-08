import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Container from "../../core/Container";
import Card from "../Card";
import Row from "../../core/Row";
import Column from "../../core/Column";

export const Comment = ({ data }) => {
    console.log(data)
    const [isLoading, setIsLoading] = useState(true);
    const [commentBody, setCommentBody] = useState(null);
    const [commentDate, setCommentDate] = useState(null);
    const [commentAuthor, setCommentAuthor] = useState(null);

    useEffect(() => {
        !(commentBody) && (data && setCommentBody(data['body']));
        !(commentDate) && (data && setCommentDate(data['body']));
        !(commentAuthor) && (data && setCommentAuthor(data['body']));
    }, [])

    return (
        <Card>
            <Row>
                <Column
                columnClass='bg-primary'
                xs={ 12 }
                sm={ 6 }>
                    { commentAuthor }
                </Column>
                <Column
                columnClass='bg-primary'
                xs={ 12 }
                sm={ 6 }>
                    Like
                </Column>
                <Column
                columnClass='bg-primary'
                xs={ 12 }>
                    { commentBody }
                </Column>
                <Column
                columnClass='bg-primary'
                xs={ 12 }>
                    { commentDate }
                </Column>
            </Row>
        </Card>
    )
};

export default Comment;