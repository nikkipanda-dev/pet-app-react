import { useState } from 'react';
import { Link } from 'react-router-dom';

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

    // toggle
    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(true) };
    const handleClose = () => { setShow(false) };

    const [post, setPost] = useState('');

    const postEntry = evt => {
        evt.preventDefault();

        console.log('post');
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
                        <ContainerIdx fluid={ true }>
                            <FormIdx action='#' method='POST' formClass='d-flex flex-column justify-content-center align-items-md-center' encType='multipart' onSubmit={ postEntry }>
                                <InputIdx
                                    inputClass='form-control' 
                                    fieldType='textarea' 
                                    value={ post } 
                                    onChange={ setPost } 
                                    rows={ 4 }
                                />
                                <BtnIdx type='submit' text='post' btnClass='mt-3 btn btn-purple align-self-md-end'/>
                            </FormIdx>
                        </ContainerIdx>
                        <ContainerIdx fluid={ true } containerClass='mt-5 p-3'>
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
            <ModalIdx type='regular' isShown={ show } btnOnhide={ handleClose }/>
        </ContainerIdx>
    )
};

export default Home;