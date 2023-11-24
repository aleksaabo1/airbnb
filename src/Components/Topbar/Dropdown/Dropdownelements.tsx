// Dropdown.tsx
import React, {ReactNode} from 'react';
import styles from "../mobileTopbar.module.css"


type DropdownProps = {
    dropdownData: string[] | ReactNode[];
};
const Dropdown: React.FC<DropdownProps> = ({ dropdownData }) => {
    return (
        <ul className={styles.listElements}>
            {dropdownData.map((item, index) => (
                <li className={styles.listElement} key={index}>{item}</li>
            ))}
        </ul>

    );
};

export default Dropdown;
