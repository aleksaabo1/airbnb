import React, {useEffect, useState} from "react";
import styles from "./toggle.module.css";

interface Props {
    Text: string;
    id_name: string;
    onClick?: () => void;
    checked?: boolean;
}

const Toggle: React.FC<Props> = ({ Text, onClick, id_name, checked }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Retrieve the initial value from localStorage, or default to false
        return JSON.parse(localStorage.getItem('isDarkMode') || 'false');
    });

    useEffect(() => {
        // Save the isDarkMode state to localStorage whenever it changes
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

        if (id_name === "Dark") {
            document.body.classList.toggle('dark-mode', isDarkMode);
        }
    }, [isDarkMode, id_name]);

    const handleToggleChange = () => {
        if (id_name === "Dark") {
            setIsDarkMode(!isDarkMode);
        }
        if (onClick) {
            onClick();
        }
    };

    const isChecked = id_name === "Dark" ? isDarkMode : checked;

    return (
        <div className={styles.container}>
            {Text}{" "}
            <div className={styles.toggleSwitch}>
                <input type="checkbox" className={styles.checkbox}
                       name={"label"} id={id_name}
                       onChange={handleToggleChange}
                       checked={isChecked}
                />
                <label className={styles.label} htmlFor={id_name}>
                    <span className={styles.inner} />
                    <span className={styles.switch} />
                </label>
            </div>
        </div>
    );
};
export default Toggle;
