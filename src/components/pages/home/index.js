import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosDef, { axiosAuthBearer } from '../../../util/Request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import ReactPaginate from 'react-paginate';

import Posts from '../../sections/posts';
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
import Span from '../../core/Span';
// import { BtnIdx } from '../../core/Button';

const Home = () => {
    //TODO sanitize textarea, submits if empty
    console.log('user', JSON.parse(Cookies.get('x_auth_user')))

    // // toggle
    // const [show, setShow] = useState(false);
    // const handleShow = () => { setShow(true) };
    // const handleClose = () => { setShow(false) };

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState(null);
    const [body, setBody] = useState('');

    const imageRef = useRef();

    const focusField = evt => {
        evt.current.click();
    }

    // const postForm = evt => {
    //     evt.preventDefault();

    //     const postForm = new FormData(evt.target);
    //     postForm.append('id', JSON.parse(Cookies.get('x_auth_user')).id);

    //     for(var pair of postForm.entries()) {
    //         console.log(pair[0]+ ', '+ pair[1].length);
    //      }

    //     axiosAuthBearer.post('http://localhost:8000/api/post/create', postForm)

    //     .then(res => {
    //         const postRes = res.data;

    //         if (postRes.isSuccess) {
    //             setBody('');

    //             // clear file input
    //             imageRef.current.value = '';

    //             // refresh posts
    //             getPosts();
    //         } else {
    //             console.log('texttttt: ', postRes.data);
    //         }
    //     })

    //     .catch(err => {
    //         console.log('err: ', err.response);
    //     })
    // }

    const getComments = async(postId, length, limit) => {
        // console.log('length: ', length)
        // console.log('getcomments limit ', limit);
        let getCommentsData = {};

        await axiosDef.get('http://localhost:8000/api/post/' + postId + '/comments/get', {
            params: {
                'limit': limit,
                'length': length,
            }
        })

        .then (res => {
            getCommentsData['comments'] = res.data;
        })

        .catch (err => {
            console.log('get comm err' , err)
        })

        return getCommentsData;
    }
    
    // useEffect(() => {
    //     if (posts === null) {
    //         getPosts();
    //     }
    // }, []);

    // useEffect(() => {
    //     posts && handleChunkComments()
    //     console.log(posts)
    // }, [posts])

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
                            {/* <Form 
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
                            </Form> */}
                        </Container>
                        <Container fluid={ true } containerClass='mt-5'>
                            <Posts />
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