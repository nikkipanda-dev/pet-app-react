import {
    BrowserRouter as Router, Routes, Route, Navigate as Redirect
} from "react-router-dom";
import Cookies from "js-cookie";
import { globalStyles } from "./css/stitches.config";

// Widgets
import Navbar from './components/widgets/Navbar';
import Footer from './components/widgets/Footer';

// Pages
import LandingPage from './components/pages/landing-page';
import Home from './components/pages/home';
import Communities from "./components/pages/communities";
import Stories from "./components/pages/stories";
import Profile from './components/pages/profile';
import Posts from "./components/sections/posts";
import Friends from "./components/pages/profile/friends";
import FriendsPost from "./components/pages/profile/friends-post";
import Settings from './components/pages/settings';
import AccountSettings from './components/pages/settings/account';
import PrivacySettings from './components/pages/settings/privacy';
import BetaSettings from './components/pages/settings/beta';
import MessagingSettings from './components/pages/settings/messaging';
import NotificationSettings from './components/pages/settings/notifications';
import ProfileSettings from './components/pages/settings/profile';
import NotFound from "./components/pages/404";

// Styling
import './css/bootstrap.css';
// import './css/style.css';

// Bootstrap bundle
import 'react-bootstrap/dist/react-bootstrap.min.js';

export const App = () => {
    globalStyles();

    const username = Cookies.get('x_auth_user') && JSON.parse(Cookies.get('x_auth_user'))['username'];

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<LandingPage />} />
                <Route exact path='/home' element={<Home />} />
                <Route exact path={'/u/:username'} element={<Profile />}>
                    <Route index element={ <Posts showUserPosts={ true }/> }/>
                    <Route exact path={ 'friends' } element={ <Friends /> }/>
                    <Route exact path={ 'posts' } element={ <Posts /> }/>
                    <Route exact path={ 'posts/friends' } element={ <FriendsPost /> }/>
                </Route>
                <Route exact path={'/u/' + username + '/settings'} element={<Settings />}>
                    <Route index element={ <AccountSettings /> }/>
                    <Route exact path={ 'account' } element={ <AccountSettings /> }/>
                    <Route exact path={ 'profile' } element={ <ProfileSettings /> }/>
                    <Route exact path={ 'privacy' } element={ <PrivacySettings /> }/>
                    <Route exact path={ 'messaging' } element={ <MessagingSettings /> }/>
                    <Route exact path={ 'notifications' } element={ <NotificationSettings /> }/>
                    <Route exact path={ 'beta' } element={ <BetaSettings /> }/>
                </Route>
                <Route exact path='/communities' element={<Communities />} />
                <Route exact path='/stories' element={<Stories />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;