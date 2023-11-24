import React, {Suspense, useState} from "react";
import styles from "./mobileTopbar.module.css";
import Logo from "../../assets/airbnb.svg";
import {Link} from "react-router-dom";

const MobileDropdownItems = React.lazy(() => import("./MobileDropdownItems"));

export default function MobileTopbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);




    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);

    };


    console.log(isMobileMenuOpen);


    return (
        <div className={styles.topbar}>
            <div className={styles.topbarContent}>
                <button onClick={toggleMobileMenu} className={styles.hamburger}>
                    <div className={styles.hamburgerBox}>
                        <div className={styles.hamburgerInner}></div>
                        <div className={styles.hamburgerInner}></div>
                        <div className={styles.hamburgerInner}></div>
                    </div>

                </button>
                <Link to={"/"}>
                    <img className={styles.logo} src={Logo} alt="logo" />
                </Link>
            </div>
            {
               isMobileMenuOpen &&
                <Suspense fallback={<div>Loading...</div>}>
                    <MobileDropdownItems />
                </Suspense>
            }

        </div>
    )
}
