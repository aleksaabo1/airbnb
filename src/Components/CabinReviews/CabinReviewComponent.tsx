import React from "react";
import styles from "./cabinreview.module.css"
import main from "../../MainPage/mainPage.module.css";


interface Props {
    username: string;
    rating: number;
    text: string;
    isMobile: boolean;
}

const CabinReviewComponent: React.FC<Props> = ({username, rating, text, isMobile}) => {
    return (
        <div className={`${!isMobile ? styles.reviewComponent : styles.reviewComponentMobile}`}>
            <div className={styles.reviewHeader}>
                <img className={styles.userImage} alt={"User image"}/>
                <h3>{username}</h3>
                <h3>{rating}</h3>
            </div>
            <p className={styles.reviewText}>
                {text}
            </p>
        </div>
    )
}

export default CabinReviewComponent;
