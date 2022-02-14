import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import Container from "../../core/Container";
import Card from "../../widgets/Card";
import Row from "../../core/Row";
import Column from "../../core/Column";
import Anchor from "../../core/Anchor";

export const Settings = () => {
    const username = JSON.parse(Cookies.get('x_auth_user'))['username'];

    const settingsLinks = {
        account: { text: 'Account' },
        profile: { text: 'Profile' },
        privacy: { text: 'Privacy' },
        messaging: { text: 'Messaging' },
        notifications: { text: 'Notifications' },
        beta: { text: 'Beta Tests' },
    }

    return (
        <Container type='regular'>
            <Container maxFluid='xl' className='mt-5'>
                <Row className='mt-5'>
                    <Column 
                    className='d-none d-sm-inline-block p-3' 
                    style={{ minHeight: '25vh', }}
                    sm={ 4 } 
                    md={ 3 }>
                        <Container 
                        type='regular' 
                        className='position-fixed d-flex flex-row flex-wrap flex-sm-nowrap flex-sm-column justify-content-center justify-content-sm-start align-items-center align-items-sm-stretch'
                        css={{ width: 'auto', left: '10%' }}>
                        {
                            settingsLinks && Object.keys(settingsLinks).map((i, val) => {

                                return (
                                    <Anchor 
                                    key={ i }
                                    type='regular'
                                    to={ i }
                                    className='mb-3 mx-2 mx-sm-0'
                                    size='tiny'
                                    color='dark'
                                    fontWeight='thick'
                                    text={ Object.values(settingsLinks)[val]['text'] }/>
                                )
                            })
                        }
                        </Container>
                    </Column>
                    <Column className='ms-auto p-3' sm={ 8 } md={ 9 }>
                        <Container 
                        type='regular'
                        color='neutral' 
                        className='mt-3 d-flex d-sm-none flex-row flex-wrap flex-sm-nowrap flex-sm-column justify-content-center justify-content-sm-start align-items-center align-items-sm-stretch'>
                        {
                            settingsLinks && Object.keys(settingsLinks).map((i, val) => {

                                return (
                                    <Link key={ i } to={ i } className='bg-warning mb-3 mx-2 mx-sm-0'>{ Object.values(settingsLinks)[val]['text'] }</Link>
                                )
                            })
                        }
                        </Container>
                        <Outlet />
                    </Column>
                </Row>
            </Container>
        </Container>
    )
};

export default Settings;