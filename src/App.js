import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Widgets
import { Navbar } from './components/widgets/Navbar/Navbar';
import Footer from './components/widgets/Footer';

// Pages
import LandingPage from './components/pages/landing-page';
import Home from './components/pages/home';
import Profile from './components/pages/profile';
import Settings from './components/pages/settings';

// Styling
import './css/bootstrap.css';
import './css/style.css';

// Bootstrap bundle
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { useState } from "react";

export const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={ <LandingPage /> } />
                <Route path='/home' element={ <Home /> } />
                <Route path='/profile' element={ <Profile /> } />
                <Route path='/settings' element={ <Settings /> } />
            </Routes>
            <Footer />
        </Router>
    );
}