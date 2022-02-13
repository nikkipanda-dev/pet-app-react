import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosDef from "../../../../util/Request";
import Cookies from "js-cookie";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

import Container from "../../../core/Container";
import Card from "../../../widgets/Card";
import Row from "../../../core/Row";
import Column from "../../../core/Column";
import Span from "../../../core/Span";
import Button from "../../../core/Button";
import Form from "../../../widgets/Form";
import Input from "../../../core/Input";
import Image from "../../../core/Image";

export const Friends = ({ isDefault, path }) => {
    // console.log('path friends', path);

    const location = useLocation();
    const [friends, setFriends] = useState(null);
    const [pendingFriends, setPendingFriends] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const friendsPathname = isDefault ? location.pathname.slice(3) + '/posts' : location.pathname.slice(3);

    // pagination
    const [pageRequestSize, setPageRequestSize] = useState(0);
    const [pageFriendSize, setPageFriendSize] = useState(0);
    const [chunkedPendingPosts, setChunkedPendingPosts] = useState(null);
    const [chunkedFriendsPosts, setChunkedFriendsPosts] = useState(null);

    // console.log('friendsPathname.slice(0, -8): ', friendsPathname.slice(0, -8));
    // console.log('pending: ', chunkedPendingPosts);
    // console.log('friends: ', chunkedFriendsPosts);

    const getFriends = async() => {
        await axiosDef.get('http://localhost:8000/api/user/' + friendsPathname)

        .then (res => {
            // console.log('fre res: ', res.data);
            const getFriendsRes = res.data;

            if (getFriendsRes.isSuccess) {
                // console.log('get friends success', getFriendsRes.data);
                setFriends(getFriendsRes.data);
                setIsLoading(false);
            } else {
                console.log('get friends err: ', getFriendsRes.data);
            }
        })

        .catch (err => {
            console.log('fre err: ', err);
        })
    }

    const getPendingFriends = async() => {
        await axiosDef.get('http://localhost:8000/api/user/' + JSON.parse(Cookies.get('x_auth_user'))['username'] + '/friends/pending')

        .then (res => {
            // console.log('pending res: ', res.data);
            const getFriendsPendingRes = res.data;

            if (getFriendsPendingRes.isSuccess) {
                console.log('pendinggg requests ehre', getFriendsPendingRes.data)
                setPendingFriends(getFriendsPendingRes.data);
                setIsLoading(false);
            } else {
                console.log('get friends pending: ', getFriendsPendingRes.data);
            }
        })

        .catch (err => {
            console.log('pending err: ', err);
        })
    }

    const acceptRequest = evt => {
        evt.preventDefault();

        console.log('evt ', evt.target);

        const acceptFriendForm = new FormData(evt.target);

        for (let [i, val] of acceptFriendForm.entries()) {
            console.log('i: ', i)
            console.log('val: ', val)
        }

        axiosDef.post('http://localhost:8000/api/user/friend/accept', acceptFriendForm)

        .then (res => {
            console.log('res accept: ', res.data);
            const acceptRequestRes = res.data;
            
            if (acceptRequestRes) {
                console.log('success accept');
                getFriends();
            } else {
                console.log('res err accept ', acceptRequestRes.data)
            }
        })

        .catch (err => {
            console.log('accept err ', err)
        })
    }

    const declineRequest = evt => {
        evt.preventDefault();

        const declineFriendForm = new FormData(evt.target);

        for (let [i, val] of declineFriendForm.entries()) {
            console.log('i: ', i)
            console.log('val: ', val)
        }

        axiosDef.post('http://localhost:8000/api/user/friend/decline', declineFriendForm)

        .then (res => {
            console.log('res decline: ', res.data);
            const declineRequestRes = res.data;
            
            if (declineRequestRes.isSuccess) {
                console.log('success decline');
            } else {
                console.log('res err decline ', declineRequestRes.data)
            }
        })

        .catch (err => {
            console.log('decline err ', err)
        })
    }

    const setRequestsPage = evt => {
        console.log('pending: ', pendingFriends)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        const currentRequestPage = parseInt(evt.selected) + 1;

        const minIndex = (currentRequestPage * 3) - 3;
        const maxIndex = (currentRequestPage * 3);

        setTimeout(() => {
            if (maxIndex > Object.keys(pendingFriends).length && (currentRequestPage === pageRequestSize)) {
                setChunkedPendingPosts(pendingFriends.slice(minIndex));
            } else {
                setChunkedPendingPosts(pendingFriends.slice(minIndex, maxIndex));
            }
        }, 700);
    }

    const setFriendsPage = evt => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        const currentFriendsPage = parseInt(evt.selected) + 1;

        const minIndex = (currentFriendsPage * 10) - 10;
        const maxIndex = (currentFriendsPage * 10);

        setTimeout(() => {
            if (maxIndex > Object.keys(friends).length && (currentFriendsPage === pageFriendSize)) {
                setChunkedFriendsPosts(friends.slice(minIndex));
            } else {
                setChunkedFriendsPosts(friends.slice(minIndex, maxIndex));
            }
        }, 700);
    }

    useEffect(() => {
        if ((friends === null) && isLoading) {
            // console.log('effect get friends')
            getFriends();
        }

        if ((friendsPathname.slice(0, -8) === JSON.parse(Cookies.get('x_auth_user'))['username']) && isLoading) {
            // console.log('pendinggg')
            getPendingFriends();
        }
    }, [])

    useEffect(() => {
        if (friends) {
            setChunkedFriendsPosts(friends.slice(0, 20));
            setPageFriendSize(Math.ceil(Object.keys(friends).length / 10));
        }
    }, [friends])

    useEffect(() => {
        if (pendingFriends) {
            setChunkedPendingPosts(pendingFriends.slice(0, 2));
            setPageRequestSize(Math.ceil(Object.keys(pendingFriends).length / 2));
        }
    }, [pendingFriends])

    return (
        <>
            <Container type='regular' className='mt-3 d-flex flex-column p-3' color='neutral'>
                <Container type='regular' className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
                {
                    // pending requests
                    chunkedPendingPosts && chunkedPendingPosts.map(i => {
                        return (
                            <Card 
                            type='regular'
                            key={ 'pending' + i['id'] } 
                            className='mb-3 me-sm-2'
                            color='white'>
                                <Row 
                                className='m-1 py-3'>
                                    <Column sm={ 5 } className='d-flex flex-column justify-content-center align-items-center'>
                                    {
                                        i['display_photo']['image_path'] ? 
                                        <Image 
                                        src={ new URL(i['display_photo']['image_path'], 'http://localhost:8000/storage/display_photos/') } 
                                        style={{ objectFit: 'cover', width: '100px', height: '100px', maxHeight: '100%', }}/> : 
                                        <FontAwesomeIcon icon={ faUserSecret } size='5x'/>
                                    }
                                    </Column>
                                    <Column className='d-flex flex-column justify-content-around' sm={ 7 }>
                                        <Container type='regular' className='d-flex flex-column'>
                                            <Span 
                                            type='regular' 
                                            text={ i['users'][0]['username'] } 
                                            className='handle'/>
                                            <Span 
                                            type='regular' 
                                            text={ i['users'][0]['first_name'] }/>
                                            <Span 
                                            type='regular' 
                                            text={ i['users'][0]['last_name'] }/>
                                        </Container>
                                        <Container type='regular' className='d-flex flex-column flex-sm-row'>
                                            <Form 
                                            action='#'
                                            method='POST'
                                            encType='multipart'
                                            onSubmit={ acceptRequest }
                                            formClass='d-inline-block'>
                                                <Input
                                                fieldType='regular'
                                                name='member_id'
                                                value={ i['user_id'] }
                                                hidden={ true }/>
                                                <Input
                                                fieldType='regular'
                                                name='id'
                                                value={ JSON.parse(Cookies.get('x_auth_user'))['id'] }
                                                hidden={ true }/>
                                                <Button 
                                                type='submit' 
                                                text='Accept'
                                                color='yellowNoTranslate'
                                                className='mt-3'
                                                size='tiny'/>
                                            </Form>
                                            <Form 
                                            action='#'
                                            method='POST'
                                            encType='multipart'
                                            onSubmit={ declineRequest }
                                            formClass='d-inline-block'>
                                                <Input
                                                fieldType='regular'
                                                name='member_id'
                                                value={ i['user_id'] }
                                                hidden={ true }/>
                                                <Input
                                                fieldType='regular'
                                                name='id'
                                                value={ JSON.parse(Cookies.get('x_auth_user'))['id'] }
                                                hidden={ true }/>
                                                <Button 
                                                type='submit' 
                                                text='Decline'
                                                className='mt-3'
                                                size='tiny'/>
                                            </Form>
                                        </Container>
                                    </Column>
                                </Row>
                            </Card>
                        )
                    })
                }
                {
                    // No pending requests message
                    !(chunkedPendingPosts) &&  
                    <Card cardClass='mb-3 me-sm-2' cardStyle={{ flex: '33.33%', height: '100px' }}>
                        <Row 
                        rowClass='m-1 py-3' 
                        rowClass='' 
                        rowStyle={{ height: '100%' }}>
                            <Column>
                                No pending requests
                            </Column>
                        </Row>
                    </Card>
                }
                </Container>
                {
                    // pending requests pagination
                    chunkedPendingPosts && 
                    <Container type='regular' className='mt-5'>
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
                    pageCount={ pageRequestSize }
                    marginPagesDisplayed={ 2 }
                    pageRangeDisplayed={ 5 }
                    onPageChange={ setRequestsPage }
                    containerClassName="pagination"/>
                    </Container>
                }
            </Container>
            <Container type='regular' className='mt-5 p-3' color='neutral'>
                <Container type='regular' containerClass='d-flex flex-column flex-md-row'>
                {
                    chunkedFriendsPosts && chunkedFriendsPosts.map(i => {
                        return (
                            <Card 
                            key={ 'pending' + i['id'] } 
                            className='mb-3 me-sm-2' 
                            css={{ flex: '33.33%', height: '100px' }}>
                                <Row className='m-1 py-3' style={{ height: '100%' }}>
                                    <Column sm={ 5 }>
                                        User's pic here
                                        { i['id'] }
                                    </Column>
                                    <Column className='d-flex flex-column justify-content-around' sm={ 7 }>
                                        <Container type='regular' className='d-flex flex-column'>
                                            <Span 
                                            type='regular' 
                                            text={ i['users'][0]['username'] } 
                                            className='handle'/>
                                            <Span 
                                            type='regular' 
                                            text={ i['users'][0]['first_name'] }/>
                                            <Span 
                                            type='regular' 
                                            text={ i['users'][0]['last_name'] }/>
                                        </Container>
                                        <Container type='regular d-flex flex-column flex-sm-row'>
                                            Remove || Send message
                                            {/* <Form 
                                            action='#'
                                            method='POST'
                                            encType='multipart'
                                            onSubmit={ acceptRequest }
                                            formClass='d-inline-block'>
                                                <Input
                                                fieldType='regular'
                                                name='member_id'
                                                value={ i['user_id'] }
                                                hidden={ true }/>
                                                <Input
                                                fieldType='regular'
                                                name='id'
                                                value={ JSON.parse(Cookies.get('x_auth_user'))['id'] }
                                                hidden={ true }/>
                                                <Button type='submit' text='Accept'/>
                                            </Form>
                                            <Form 
                                            action='#'
                                            method='POST'
                                            encType='multipart'
                                            onSubmit={ declineRequest }
                                            formClass='d-inline-block'>
                                                <Input
                                                fieldType='regular'
                                                name='member_id'
                                                value={ i['user_id'] }
                                                hidden={ true }/>
                                                <Input
                                                fieldType='regular'
                                                name='id'
                                                value={ JSON.parse(Cookies.get('x_auth_user'))['id'] }
                                                hidden={ true }/>
                                                <Button type='submit' text='Decline'/>
                                            </Form> */}
                                        </Container>
                                    </Column>
                                </Row>
                            </Card>
                        )
                    })
                }
                {
                    // No friends message
                    !(chunkedFriendsPosts) &&  
                    <Card className='mb-3 me-sm-2' css={{ flex: '33.33%', height: '100px' }}>
                        <Row 
                        className='m-1 py-3' 
                        style={{ height: '100%' }}>
                            <Column>
                                No friends :(
                            </Column>
                        </Row>
                    </Card>
                }
                </Container>
                {
                    chunkedFriendsPosts && 
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
                        pageCount={ pageFriendSize }
                        marginPagesDisplayed={ 2 }
                        pageRangeDisplayed={ 5 }
                        onPageChange={ setFriendsPage }
                        containerClassName="pagination"/>
                }
            </Container>
        </>
    )
};

export default Friends;