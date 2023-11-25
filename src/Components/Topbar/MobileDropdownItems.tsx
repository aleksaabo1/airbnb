import React, {Suspense, useEffect, useState} from "react";
import styles from "./mobileTopbar.module.css";
import {Link} from "react-router-dom";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import Toggle from "../Toggle/Toggle";
import Dropdown from "./Dropdown/Dropdownelements";



const MobileDropdownItems = () => {
    const [dropdownData, setDropdownData] = useState<string[] >(['My Profile', 'Favorites', 'My bag']);


    const [dropdownDataLinks, setDropdownDataLinks] = useState<React.ReactNode[]>([
        <Link to={"/"}>Home</Link>,
        <Link to="/">Explore</Link>,
        <Link to="/bookings">Bookings</Link>,
        <Toggle Text={"Dark Mode"} id_name={"Dark"} />,
        <SubscribeButton publicKey="BFy7ElYdavR1v6_bDhsuanTW6RB7uapIXdrNBWCQXPbGLFgDeV59kOr8FEZR_p378h-KgpDU1GmQMRn94wPn9ZI" />,
    ]);






    return (
        <div className={styles.mobile}>
            <Suspense fallback={<div>Loading...</div>}>
                <Dropdown dropdownData={dropdownDataLinks} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <Dropdown dropdownData={dropdownData} />
            </Suspense>
        </div>
    )
}
export default MobileDropdownItems;
