import { BrowserRouter as Router, Routes, Route, Navigate as Redirect } from "react-router-dom";
import Cookies from "js-cookie";

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
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={ Cookies.get('x_auth_secret_tk') ? <Redirect to='/home' /> : <LandingPage /> } />
                <Route path='/home' element={ <Home /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/settings' element={ <Settings /> } />
                <Route path='/communities' element={ <Communities /> } />
                <Route path='/stories' element={ <Stories /> } />
            </Routes>
            <Footer />
        </Router>
    );
}