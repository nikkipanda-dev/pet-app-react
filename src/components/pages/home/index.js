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

    return (
        <Container type='regular'>
            <Container maxFluid='xl' className='mt-5'>
                <Row className='flex-column flex-md-row mt-5'>
                    <Column className='d-none d-md-flex flex-column p-2' md={ 3 }>
                        <Card type='regular' className='p-2'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.</p>
                        </Card>
                        <Card type='regular' className='mt-3 p-2'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.</p>
                        </Card>
                        <Card type='regular' className='mt-3 p-2'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.</p>
                        </Card>
                        <Card type='regular' className='mt-3 p-2'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.</p>
                        </Card>
                        <Card type='regular' className='mt-3 p-2'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.</p>
                        </Card>
                        <Card type='regular' className='mt-3 p-2'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.</p>
                        </Card>
                        <Card type='regular' className='mt-3 p-2'>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus esse et eligendi ratione quasi, dolores dolorem eaque adipisci repudiandae inventore nesciunt ipsam fugiat ad maxime. Aliquid incidunt quisquam aliquam dolorum.</p>
                        </Card>
                    </Column>
                    <Column className='py-2 mt-3' md={ 6 }>
                        <Posts />
                    </Column>
                    <Column className='p-1 d-md-flex flex-column p-2' md={ 3 }>
                        <Card 
                        type='regular' 
                        className='d-flex flex-column justify-content-center align-items-center p-2'
                        color='yellow'
                        css={{ height: 'auto', }}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fugit obcaecati placeat ratione facilis, expedita ea enim aperiam magnam ex voluptate repellendus eius repudiandae similique dicta eveniet quas ut accusamus?</p>
                            <Anchor 
                            type='regular' 
                            to='communities' 
                            text='Read more' 
                            color='yellowBg' 
                            className='p-2'
                            size='tiny'/>
                        </Card>
                        <Card 
                        type='regular' 
                        className='d-flex flex-column justify-content-center align-items-center p-2 mt-3'
                        color='yellow' 
                        css={{ height: 'auto', }}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fugit obcaecati placeat ratione facilis, expedita ea enim aperiam magnam ex voluptate repellendus eius repudiandae similique dicta eveniet quas ut accusamus?</p>
                            <Anchor 
                            type='regular' 
                            to='communities' 
                            text='Read more' 
                            color='yellowBg' 
                            className='p-2'
                            size='tiny'/>
                        </Card>
                        <Card 
                        type='regular' 
                        className='d-flex flex-column justify-content-center align-items-center p-2 mt-3'
                        color='yellow' 
                        css={{ height: 'auto', }}>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fugit obcaecati placeat ratione facilis, expedita ea enim aperiam magnam ex voluptate repellendus eius repudiandae similique dicta eveniet quas ut accusamus?</p>
                            <Anchor 
                            type='regular' 
                            to='communities' 
                            text='Read more' 
                            color='yellowBg' 
                            className='p-2'
                            size='tiny'/>
                        </Card>
                    </Column>
                </Row>
            </Container>
        </Container>
    )
};

export default Home;