// DropdownComponent.tsx
import React, {useState, Suspense, ReactNode, useEffect} from 'react';
import styles from '.././topbar.module.css';
import SubscribeButton from "../../SubscribeButton/SubscribeButton";
import Toggle from "../../Toggle/Toggle";

const LazyDropdown = React.lazy(() => import('./Dropdownelements')); // Adjust the path to your Dropdown component

const DropdownComponent: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        console.log("isDarkMode updated to", isDarkMode);
    }, [isDarkMode]);


    const [dropdownData, setDropdownData] = useState<string[] | ReactNode[]>(['My Profile', 'Favorites', 'My bag',
        <Toggle Text={"Dark Mode"} id_name={"Dark"} checked={isDarkMode}/>,
        <label className="switch">
            <SubscribeButton
                publicKey="BFy7ElYdavR1v6_bDhsuanTW6RB7uapIXdrNBWCQXPbGLFgDeV59kOr8FEZR_p378h-KgpDU1GmQMRn94wPn9ZI"/>
        </label>]);

    const handleButtonClick = (): void => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className={styles.searchUser}>
            <button className={styles.userButton} onClick={handleButtonClick}>AA</button>
            {isDropdownVisible && (
                <div className={styles.drop}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {dropdownData && <LazyDropdown dropdownData={dropdownData}/>}
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default DropdownComponent;
