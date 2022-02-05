import {
    BrowserRouter as Router, Routes, Route, Navigate as Redirect
} from "react-router-dom";
import Cookies from "js-cookie";
import Authentication from "./util/Authentication";

// Widgets
import { Navbar } from './components/widgets/Navbar/Navbar';
import Footer from './components/widgets/Footer';
import { ModalIdx } from "./components/widgets/Modal";

// Pages
import LandingPage from './components/pages/landing-page';
import Home from './components/pages/home';
import Communities from "./components/pages/communities";
import Stories from "./components/pages/stories";
import Profile from './components/pages/profile';
import Settings from './components/pages/settings';

// Styling
import './css/bootstrap.css';
import './css/style.css';

// Bootstrap bundle
import 'react-bootstrap/dist/react-bootstrap.min.js';



export const App = () => {
    const username = Cookies.get('x_auth_user') && JSON.parse(Cookies.get('x_auth_user'))['username'];
    console.log(Cookies.get('x_auth_secret_tk'))

    return (
        <Router forceRefresh={ true }>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<LandingPage />} />
                <Route exact path='/home' element={<Home />} />
                <Route exact path={'/u/:' + username} element={<Profile />} />
                <Route exact path='/settings' element={<Settings />} />
                <Route exact path='/communities' element={<Communities />} />
                <Route exact path='/stories' element={<Stories />} />
            </Routes>
            <Footer />
        </Router>
    );
}