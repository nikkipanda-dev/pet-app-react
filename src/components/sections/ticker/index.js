import { useParams } from "react-router-dom";

import Container from "../../core/Container";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Header from "../../core/Header";
import Card from "../../widgets/Card";
import Span from "../../core/Span";
import Paragraph from "../../core/Paragraph";
import Blockquote from "../../core/Blockquote";
import Button from "../../core/Button";

export const Ticker = () => {
    const test = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officiis aut ea tempore, debitis non laborum voluptatibus vel beatae quo officia magnam et totam doloremque, cumque reiciendis quis voluptate a.';

    return (
        <Container type='regular' color='neutral' className='p-3 d-flex flex-column align-items-center'>
            <Header 
            text='ticker' 
            color='tangerine' 
            size='display1' 
            textShadow='cyan' 
            className='mb-3 align-self-start'/>

            <Card 
            type='regular' 
            className='p-2 mb-3 d-flex flex-column' 
            color='white' 
            css={{ height: 'auto', }}>
                <Header 
                text={ <Span type='regular' text='username' className='handle'/> } 
                color='tangerine' 
                size='regular' 
                className='mb-3 align-self-start'/>
                <Paragraph 
                height='expand' 
                letterSpacing='normal'
                size='tiny'>
                    Commented on <Span type='regular' text='username' className='handle' color='cyan'/>'s post
                </Paragraph>
                <Blockquote
                height='expand'
                letterSpacing='normal'
                border='dark'
                size='tiny'
                className='ps-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officiis aut ea tempore, debitis non laborum voluptatibus vel beatae quo officia magnam et totam doloremque, cumque reiciendis quis voluptate a.
                </Blockquote>
                <Button
                type='regular'
                to='loremdfbDBF'
                text='go to post'
                size='tiny'
                color='cyanNoTranslate'/>
            </Card>
            <Card 
            type='regular' 
            className='p-2 mb-3 d-flex flex-column' 
            color='white' 
            css={{ height: 'auto', }}>
                <Header 
                text={ <Span type='regular' text='username' className='handle'/> } 
                color='tangerine' 
                size='regular' 
                className='mb-3 align-self-start'/>
                <Paragraph 
                height='expand' 
                letterSpacing='normal'
                size='tiny'>
                    Posted
                </Paragraph>
                <Blockquote
                height='expand'
                letterSpacing='normal'
                border='dark'
                size='tiny'
                className='ps-3'>
                {
                    test.slice(0, 100) + '...'
                }
                </Blockquote>
                <Button
                type='regular'
                to='loremdfbDBF'
                text='go to post'
                size='tiny'
                color='cyanNoTranslate'/>
            </Card>
            <Card 
            type='regular' 
            className='p-2 mb-3 d-flex flex-column' 
            color='white' 
            css={{ height: 'auto', }}>
                <Header 
                text={ <Span type='regular' text='username' className='handle'/> } 
                color='tangerine' 
                size='regular' 
                className='mb-3 align-self-start'/>
                <Paragraph 
                height='expand' 
                letterSpacing='normal'
                size='tiny'>
                    Commented on <Span type='regular' text='username' className='handle' color='cyan'/>'s post
                </Paragraph>
                <Blockquote
                height='expand'
                letterSpacing='normal'
                border='dark'
                size='tiny'
                className='ps-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officiis aut ea tempore, debitis non laborum voluptatibus vel beatae quo officia magnam et totam doloremque, cumque reiciendis quis voluptate a.
                </Blockquote>
                <Button
                type='regular'
                to='loremdfbDBF'
                text='go to post'
                size='tiny'
                color='cyanNoTranslate'/>
            </Card>
            <Card 
            type='regular' 
            className='p-2 mb-3 d-flex flex-column' 
            color='white' 
            css={{ height: 'auto', }}>
                <Header 
                text={ <Span type='regular' text='username' className='handle'/> } 
                color='tangerine' 
                size='regular' 
                className='mb-3 align-self-start'/>
                <Paragraph 
                height='expand' 
                letterSpacing='normal'
                size='tiny'>
                    Commented on <Span type='regular' text='username' className='handle' color='cyan'/>'s post
                </Paragraph>
                <Blockquote
                height='expand'
                letterSpacing='normal'
                border='dark'
                size='tiny'
                className='ps-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto officiis aut ea tempore, debitis non laborum voluptatibus vel beatae quo officia magnam et totam doloremque, cumque reiciendis quis voluptate a.
                </Blockquote>
                <Button
                type='regular'
                to='loremdfbDBF'
                text='go to post'
                size='tiny'
                color='cyanNoTranslate'/>
            </Card>
        </Container>
    )
}

export default Ticker;