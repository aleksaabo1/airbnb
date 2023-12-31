import React, {useEffect, useState} from 'react';
import './App.css';
import Topbar from "./Components/Topbar/Topbar";
import MobileTopbar from "./Components/Topbar/MobileTopbar";

import Explore from "./MainPage/explore";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import DetailRental from "./MainPage/DetailRental";
import Reservations from "./MainPage/Reservations";

function App() {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mobileBreakpoint = 700;
    const isMobile = windowWidth > mobileBreakpoint;


    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Retrieve the initial value from localStorage, or default to false
        return JSON.parse(localStorage.getItem('isDarkMode') || 'false');
    });



    return (
        <div className="App">
            {isMobile ? <Topbar/> : <MobileTopbar/>}
            <Routes>
                <Route path="/" element={<Explore />} />
                <Route path="/item/:id" element={<DetailRental />} />
                <Route path="/bookings" element={<Reservations />} />
            </Routes>

        </div>
    );
}

export default App;
