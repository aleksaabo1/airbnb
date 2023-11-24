import React from "react";
import styles from "./Preview.module.css";
import Location from "../../assets/location.svg"
import Bathroom from "../../assets/bathroom.svg"
import Money from "../../assets/bag-of-money.svg"
import Bed from "../../assets/doubleBed.svg"

interface PreviewProps {
    location: string;
    price: number;
    bedrooms: number;
    baths: number;
    imageUrl: string;
}

const Preview: React.FC<PreviewProps> = ({location, price, bedrooms, baths, imageUrl}) => {

    return (
        <div className={styles.mainComponent} >
            <img className={styles.image} src={imageUrl} alt={"Thumbnail for rental"}/>
            <div className={styles.informationListing}>
                <div className={styles.description}>
                    <img className={styles.previewIcon} src={Location} alt="Location"/>
                    <div className={styles.previewText}>{location}</div>
                </div>
                <div className={styles.description}>
                    <img className={styles.previewIcon} src={Money} alt="Price"/>
                    <div className={styles.previewText}>${price}</div>
                </div>
                <div className={styles.description}>
                    <img className={styles.previewIcon} src={Bed} alt="Bedrooms"/>
                    <div className={styles.previewText}>{bedrooms} Bedrooms</div>
                </div>
                <div className={styles.description}>
                    <img className={styles.previewIcon} src={Bathroom} alt="Baths"/>
                    <div className={styles.previewText}>{baths} Baths</div>
                </div>
            </div>
        </div>
    )
}

export default Preview;

