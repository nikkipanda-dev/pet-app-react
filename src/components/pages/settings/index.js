import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import Container from "../../core/Container";
import Row from "../../core/Row";
import Column from "../../core/Column";

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
        <Container fluid={ true } containerClass='pt-5'>
            <Container fluid='xl' containerClass='mt-5'>
                <Row rowClass='m-1'>
                    <Column 
                    columnClass='bg-purple-100 d-none d-sm-inline-block p-3' 
                    columnStyle={{ minHeight: '25vh', }}
                    sm={ 4 } 
                    md={ 3 }>
                        <Container 
                        type='regular' 
                        containerClass='position-fixed d-flex flex-row flex-wrap flex-sm-nowrap flex-sm-column justify-content-center justify-content-sm-start align-items-center align-items-sm-stretch'>
                        {
                            settingsLinks && Object.keys(settingsLinks).map((i, val) => {

                                return (
                                    <Link key={ i } to={ i } className='bg-warning mb-3 mx-2 mx-sm-0'>{ Object.values(settingsLinks)[val]['text'] }</Link>
                                )
                            })
                        }
                        </Container>
                    </Column>
                    <Column columnClass='ms-auto p-3 bg-primary' sm={ 8 } md={ 9 }>
                        <Container type='regular' containerClass='d-flex d-sm-none flex-row flex-wrap flex-sm-nowrap flex-sm-column justify-content-center justify-content-sm-start align-items-center align-items-sm-stretch'>
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