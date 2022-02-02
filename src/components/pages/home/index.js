import { useState, createRef } from 'react';
import { Link } from 'react-router-dom';
import { axiosAuthBearer } from '../../../util/Request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
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
// import { BtnIdx } from '../../core/Button';

const Home = () => {
    //TODO CRUD entries
    //TODO loop entries

    // console.log('user: ', user);

    // // toggle
    // const [show, setShow] = useState(false);
    // const handleShow = () => { setShow(true) };
    // const handleClose = () => { setShow(false) };
    const [body, setBody] = useState('');
    const [images, setImages] = useState([]);

    console.log('body: ', body);
    console.log('images: ', images);

    const imageRef = createRef();

    const focusField = evt => {
        evt.current.click();
    }

    const test = evt => {
        [ ...evt.target.files ].map(i => {
            console.log('i: ', i);
            setImages([ ...images, i ]);
        })
    }

    const postForm = evt => {
        evt.preventDefault();

        const postForm = new FormData(evt.target);
        postForm.append('id', parseInt(Cookies.get('authID'), 10));

        axiosAuthBearer.post('http://localhost:8000/api/post/create', postForm)

        .then(res => {
            console.log('res: ', res);
            const postRes = res.data;

            if (postRes.isSuccess) {
                setBody('');
            } else {
                console.log('text: ', postRes.data);
            }
        })

        .catch(err => {
            console.log('err: ', err.response);
        })
    }

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
                                        text={ <FontAwesomeIcon icon={faImages} className='fa-2x'/> } 
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
                                        // value={ images } 
                                        accept='image/*' 
                                        onChange={ test } 
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
                        <ContainerIdx fluid={ true } containerClass='bg-purple-100 mt-5 p-3'>
                            <CardIdx cardClass='p-2'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae rerum sunt earum dicta officia temporibus, assumenda, nesciunt esse expedita perspiciatis amet incidunt molestiae? Possimus modi et, aliquid dolorem nostrum magnam?
                            </CardIdx>
                            <CardIdx cardClass='mt-3 p-3'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae rerum sunt earum dicta officia temporibus, assumenda, nesciunt esse expedita perspiciatis amet incidunt molestiae? Possimus modi et, aliquid dolorem nostrum magnam?
                            </CardIdx>
                            <CardIdx cardClass='mt-3 p-3'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae rerum sunt earum dicta officia temporibus, assumenda, nesciunt esse expedita perspiciatis amet incidunt molestiae? Possimus modi et, aliquid dolorem nostrum magnam?
                            </CardIdx>
                            <CardIdx cardClass='mt-3 p-3'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae rerum sunt earum dicta officia temporibus, assumenda, nesciunt esse expedita perspiciatis amet incidunt molestiae? Possimus modi et, aliquid dolorem nostrum magnam?
                            </CardIdx>
                            <CardIdx cardClass='mt-3 p-3'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae rerum sunt earum dicta officia temporibus, assumenda, nesciunt esse expedita perspiciatis amet incidunt molestiae? Possimus modi et, aliquid dolorem nostrum magnam?
                            </CardIdx>
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
            {/* <BtnIdx type='modal' text='Modal' btnOnclick={ handleShow }/> */}
            {/* <ModalIdx type='regular' isShown={ show } btnOnhide={ handleClose }/> */}
        </ContainerIdx>
    )
};

export default Home;