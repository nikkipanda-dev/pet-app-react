import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosDef, { axiosAuthBearer } from '../../../util/Request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

import Container from '../../core/Container';
import Row from '../../core/Row';
import Column from '../../core/Column';
import Card from '../../widgets/Card';
import Modal from '../../widgets/Modal';
import Form from '../../widgets/Form';
import Label from '../../core/Label';
import Input from '../../core/Input';
import Button from '../../core/Button';
import Image from '../../core/Image';
import Anchor from '../../core/Anchor';
// import { BtnIdx } from '../../core/Button';

const Home = () => {
    //TODO sanitize textarea, submits if empty

    // console.log('user: ', user);

    // // toggle
    // const [show, setShow] = useState(false);
    // const handleShow = () => { setShow(true) };
    // const handleClose = () => { setShow(false) };
    
    // toggle comment
    const [showComment, setShowComment] = useState(false);

    const [posts, setPosts] = useState(null);
    const [body, setBody] = useState('');

    const imageRef = useRef();

    const focusField = evt => {
        evt.current.click();
    }

    const getPosts = async() => {
        await axiosDef.get('http://localhost:8000/api/posts')

        .then (res => {
            const getPostsRes = res.data;

            if (getPostsRes.isSuccess) {
                setPosts({ ...getPostsRes.data });
            } else {
                console.log('err res: ', getPostsRes.data);
            }
        })

        .catch (err => {
            console.log('err: ', err);
        })
    }

    const updatePostID = evt => {
        console.log('evt: ', evt);
    }

    const updatePost = evt => {
        evt.preventDefault();

        console.log('evt');

        const updateForm = new FormData(evt.target);

        axiosDef.post('http://localhost:8000/api/post/update', updateForm)

        .then (res => {
            console.log('res: ', res.data);
        })

        .catch (err => {
            console.log('errrr: ', err);
        })
    }

    const postForm = evt => {
        evt.preventDefault();

        const postForm = new FormData(evt.target);
        postForm.append('id', JSON.parse(Cookies.get('x_auth_user')).id);

        for(var pair of postForm.entries()) {
            console.log(pair[0]+ ', '+ pair[1].length);
         }

        axiosAuthBearer.post('http://localhost:8000/api/post/create', postForm)

        .then(res => {
            const postRes = res.data;

            if (postRes.isSuccess) {
                setBody('');

                // clear file input
                imageRef.current.value = '';

                // refresh posts
                getPosts();
            } else {
                console.log('texttttt: ', postRes.data);
            }
        })

        .catch(err => {
            console.log('err: ', err.response);
        })
    }

    useEffect(() => {
        if (posts === null) {
            getPosts();
        }
    }, []);

    return (
        <Container fluid={ true } containerClass='pt-5'>
            <Container fluid='xl' containerClass='mt-5'>
                <Row rowClass='flex-column flex-md-row'>
                    <Column columnClass='d-none d-md-flex flex-column p-2' md={ 3 }>
                        <Card cardClass='p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </Card>
                        <Card cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </Card>
                        <Card cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </Card>
                        <Card cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </Card>
                        <Card cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </Card>
                        <Card cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </Card>
                        <Card cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </Card>
                    </Column>
                    <Column columnClass='py-2' md={ 6 }>
                        <Container fluid={ true } containerClass='px-0'>
                            <Form 
                            action='#' 
                            method='POST' 
                            encType='multipart' 
                            onSubmit={ postForm } 
                            formStyle={{ width: '100%', }}>
                                <Input
                                fieldType='textarea' 
                                inputClass='form-control' 
                                value={ body } 
                                name='body' 
                                onChange={ setBody } 
                                rows={ 4 }/>
                                <div className='mt-3 d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-sm-center'>
                                    <Label 
                                    text={ <FontAwesomeIcon icon={ faImages } className='fa-2x'/> } 
                                    refTarget={ imageRef } 
                                    labelOnclick={ focusField } 
                                    labelClass='pointer-cursor mt-3 mt-sm-0 align-self-center'/>
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
                                    btnClass='btn btn-purple mt-3 mt-sm-0'/>
                                </div>
                            </Form>
                        </Container>
                        <Container fluid={ true } containerClass='mt-5'>
                            {
                                posts && Object.keys(posts).map(i => {
                                    const postID = Object.values(posts)[i]['id'];
                                    const postBody = Object.values(posts)[i]['body'];
                                    const postCreated = Object.values(posts)[i]['created_at'];

                                    // loop this
                                    const postAuthor = Object.values(posts)[i]['user'];

                                    // loop this
                                    const postImages = Object.values(posts)[i]['post_images'];

                                    return (
                                        <Card key={ 'post' + postID } cardClass='mb-5 border-0'>
                                            <Row rowClass='bg-secondary'>
                                                <Column 
                                                columnClass='bg-purple-100 d-flex flex-column justify-content-center align-items-center py-1 bg-yellow-100' 
                                                sm={ 4 }>
                                                    <Image 
                                                    src='/pup_patrol_logo.png'
                                                    imgStyle={{ objectFit: 'cover', width: '70px', height: '70px' }}/>
                                                    <span className='mt-3'>{ postAuthor['username'] }</span>
                                                </Column>
                                                <Column 
                                                columnClass='bg-warning text-end d-flex flex-column align-items-end' 
                                                sm={ 8 }>
                                                    <span>{ postCreated }</span>
                                                </Column>
                                                <Column 
                                                columnClass='bg-primary' 
                                                sm={ 12 }>
                                                {
                                                    postImages && postImages.map(i => {
                                                        const postImageURL = new URL(i['image_path'], 'http://localhost:8000/storage/posts/');

                                                        return (
                                                            <Image 
                                                            key={ 'post' + postID + 'img' + i['id'] } 
                                                            src={ postImageURL } 
                                                            imgClass='img-fluid img-thumbnail curved-border' 
                                                            imgStyle={{ objectFit: 'cover', width: '100px', height: '100px' }}/>
                                                        )
                                                    })
                                                }
                                                </Column>
                                                <Column 
                                                columnClass='bg-secondary' 
                                                sm={ 12 }>
                                                    <p>{ postBody }</p>
                                                </Column>
                                                <Column columnClass='bg-dark' sm={ 12 }>
                                                    <Anchor 
                                                    type='toggle' 
                                                    text='Comment' 
                                                    isShown={ showComment }
                                                    anchorOnclick= { setShowComment }/>
                                                    <Container containerClass={ showComment ? 'd-block' : 'd-none' }>
                                                        <Form 
                                                        action='#' 
                                                        method='POST' 
                                                        encType='multipart' 
                                                        onSubmit={ postForm } 
                                                        formStyle={{ width: '100%', }}>
                                                            <Input
                                                            inputClass='form-control' 
                                                            fieldType='textarea' 
                                                            value={ body } 
                                                            name='body' 
                                                            onChange={ setBody } 
                                                            rows={ 4 }/>
                                                            <Button 
                                                            type='submit' 
                                                            text='post' 
                                                            btnClass='btn btn-purple mt-3 mt-sm-0'/>
                                                        </Form>
                                                    </Container>
                                                </Column>
                                            </Row>
                                        </Card>
                                    )
                                })
                            }
                        </Container>
                    </Column>
                    <Column columnClass='p-1 p-md-2' md={ 3 }>
                        <Card cardClass='d-flex flex-column justify-content-center align-items-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fugit obcaecati placeat ratione facilis, expedita ea enim aperiam magnam ex voluptate repellendus eius repudiandae similique dicta eveniet quas ut accusamus?
                            <Link to='/communities' className='mt-3'>Read more</Link>
                        </Card>
                        <Container fluid={ true } containerClass='mt-5 d-flex flex-column justify-content-center align-items-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sequi voluptate necessitatibus consequatur quibusdam obcaecati at tenetur quasi accusantium corrupti culpa earum, sint dolorum odit nesciunt ad asperiores nisi porro.
                            <Link to='/stories' className='mt-3'>Read more</Link>
                        </Container>
                    </Column>
                </Row>
            </Container>
        </Container>
    )
};

export default Home;