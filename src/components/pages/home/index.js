import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosDef, { axiosAuthBearer } from '../../../util/Request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

import { ContainerIdx } from '../../core/Container';
import { RowIdx } from '../../core/Row';
import { ColIdx } from '../../core/Column';
import { CardIdx } from '../../widgets/Card';
import { ModalIdx } from '../../widgets/Modal';
import FormIdx from '../../widgets/Form';
import { LabelIdx } from '../../core/Label';
import { InputIdx } from '../../core/Input';
import { BtnIdx } from '../../core/Button';
import { ImgIdx } from '../../core/Image';
import { AnchorIdx } from '../../core/Anchor';
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
        <ContainerIdx fluid={ true } containerClass='pt-5'>
            <ContainerIdx fluid='xl' containerClass='mt-5'>
                <RowIdx rowClass='flex-column flex-md-row'>
                    <ColIdx columnClass='d-none d-md-flex flex-column p-2' md={ 3 }>
                        <CardIdx cardClass='p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </CardIdx>
                        <CardIdx cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </CardIdx>
                        <CardIdx cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </CardIdx>
                        <CardIdx cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </CardIdx>
                        <CardIdx cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </CardIdx>
                        <CardIdx cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </CardIdx>
                        <CardIdx cardClass='mt-3 p-2 fine-print'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.
                        </CardIdx>
                    </ColIdx>
                    <ColIdx columnClass='py-2' md={ 6 }>
                        <ContainerIdx fluid={ true } containerClass='px-0'>
                            <FormIdx 
                                action='#' 
                                method='POST' 
                                encType='multipart' 
                                onSubmit={ postForm } 
                                formStyle={{ width: '100%', }}
                            >
                                <InputIdx
                                    inputClass='form-control' 
                                    fieldType='textarea' 
                                    value={ body } 
                                    name='body' 
                                    onChange={ setBody } 
                                    rows={ 4 }
                                />
                                <div className='mt-3 d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-sm-center'>
                                    <LabelIdx 
                                        text={ <FontAwesomeIcon icon={ faImages } className='fa-2x'/> } 
                                        refTarget={ imageRef } 
                                        labelOnclick={ focusField } 
                                        labelClass='pointer-cursor mt-3 mt-sm-0 align-self-center'
                                    />
                                    <InputIdx 
                                        fieldType='file' 
                                        type='file' 
                                        refTarget={ imageRef } 
                                        name='images[]' 
                                        inputClass='bg-purple-200' 
                                        accept='image/*' 
                                        multiple={ true } 
                                        hidden={ true }
                                    />
                                    <BtnIdx 
                                        type='submit' 
                                        text='post' 
                                        btnClass='btn btn-purple mt-3 mt-sm-0'
                                    />
                                </div>
                            </FormIdx>
                        </ContainerIdx>
                        <ContainerIdx fluid={ true } containerClass='mt-5'>
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
                                        <CardIdx key={ 'post' + postID } cardClass='mb-5 border-0'>
                                            <RowIdx rowClass='bg-secondary'>
                                                <ColIdx 
                                                    columnClass='bg-purple-100 d-flex flex-column justify-content-center align-items-center py-1 bg-yellow-100' 
                                                    sm={ 4 }
                                                >
                                                    <ImgIdx 
                                                        src='/pup_patrol_logo.png'
                                                        imgStyle={{ objectFit: 'cover', width: '70px', height: '70px' }}
                                                    />
                                                    <span className='mt-3'>{ postAuthor['username'] }</span>
                                                </ColIdx>
                                                <ColIdx 
                                                    columnClass='bg-warning text-end d-flex flex-column align-items-end' 
                                                    sm={ 8 }
                                                >
                                                    <span>{ postCreated }</span>
                                                </ColIdx>
                                                <ColIdx 
                                                    columnClass='bg-primary' 
                                                    sm={ 12 }
                                                >
                                                    {
                                                        postImages && postImages.map(i => {
                                                            const postImageURL = new URL(i['image_path'], 'http://localhost:8000/storage/posts/');

                                                            return (
                                                                <ImgIdx 
                                                                    key={ 'post' + postID + 'img' + i['id'] } 
                                                                    src={ postImageURL } 
                                                                    imgClass='img-fluid img-thumbnail curved-border' 
                                                                    imgStyle={{ objectFit: 'cover', width: '100px', height: '100px' }}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </ColIdx>
                                                <ColIdx 
                                                    columnClass='bg-secondary' 
                                                    sm={ 12 }
                                                >
                                                    <p>{ postBody }</p>
                                                </ColIdx>
                                                <ColIdx columnClass='bg-dark' sm={ 12 }>
                                                    <AnchorIdx 
                                                        type='toggle' 
                                                        text='Comment' 
                                                        isShown={ showComment }
                                                        anchorOnclick= { setShowComment }
                                                    />
                                                    <ContainerIdx containerClass={ showComment ? 'd-block' : 'd-none' }>
                                                        <FormIdx 
                                                            action='#' 
                                                            method='POST' 
                                                            encType='multipart' 
                                                            onSubmit={ postForm } 
                                                            formStyle={{ width: '100%', }}
                                                        >
                                                            <InputIdx
                                                                inputClass='form-control' 
                                                                fieldType='textarea' 
                                                                value={ body } 
                                                                name='body' 
                                                                onChange={ setBody } 
                                                                rows={ 4 }
                                                            />
                                                            <BtnIdx 
                                                                type='submit' 
                                                                text='post' 
                                                                btnClass='btn btn-purple mt-3 mt-sm-0'
                                                            />
                                                        </FormIdx>
                                                    </ContainerIdx>
                                                </ColIdx>
                                            </RowIdx>
                                        </CardIdx>
                                    )
                                })
                            }
                        </ContainerIdx>
                    </ColIdx>
                    <ColIdx columnClass='p-1 p-md-2' md={ 3 }>
                        <CardIdx cardClass='d-flex flex-column justify-content-center align-items-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fugit obcaecati placeat ratione facilis, expedita ea enim aperiam magnam ex voluptate repellendus eius repudiandae similique dicta eveniet quas ut accusamus?
                            <Link to='/communities' className='mt-3'>Read more</Link>
                        </CardIdx>
                        <ContainerIdx fluid={ true } containerClass='mt-5 d-flex flex-column justify-content-center align-items-center'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sequi voluptate necessitatibus consequatur quibusdam obcaecati at tenetur quasi accusantium corrupti culpa earum, sint dolorum odit nesciunt ad asperiores nisi porro.
                            <Link to='/stories' className='mt-3'>Read more</Link>
                        </ContainerIdx>
                    </ColIdx>
                </RowIdx>
            </ContainerIdx>
        </ContainerIdx>
    )
};

export default Home;