import React from "react";
import styles from "./detailDescription.module.css";
import main from "../../MainPage/mainPage.module.css";

interface Details {
    id: number
    title: string
    guests: number
    bedrooms: number
    beds: number
    baths: number
    description: string
    isMobile: boolean
}

const DetailDescription: React.FC<Details> = ({id, title, guests, bedrooms, beds, baths, description, isMobile}) => {

    return (
        <div className={`${!isMobile ? styles.information : styles.informationMobile}`}>
            <h1>{title}</h1>
            <ul className={styles.listInformation}>
                <li>{guests} Guests</li>
                <li>{bedrooms} Bedrooms</li>
                <li>{beds} Beds</li>
                <li>{baths} Bath</li>
            </ul>
            <div className={main.linebreak} />
            <h2>Description</h2>
            <p>{description}</p>
            <div className={main.linebreak} />

        </div>
    )
}

export default DetailDescription;
