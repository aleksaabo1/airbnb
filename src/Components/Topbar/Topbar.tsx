import React from "react";
import styles from "./topbar.module.css";
import Logo from "../../assets/airbnb.svg";
import UserDropdown from "./Dropdown/UserDropdown";
import {Link} from "react-router-dom";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import {subscribeUserToPush} from "../../index";
export default function Topbar() {


    return (
        <div className={styles.topbar}>

            <Link to={"/"}>
                <img className={styles.logo} src={Logo} alt="logo" />
            </Link>
                <div className={styles.links}>
                    <ul className={styles.listElements}>

                    <li className={styles.listElement}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className={styles.listElement}>
                        <a href="/">Explore</a>
                    </li>
                    <li className={styles.listElement}>
                        <a href="#contact">Contact</a>
                    </li>
                    </ul>
                </div>
            <UserDropdown />
        </div>
    )
}
