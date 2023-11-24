import React from "react";
import styles from "./mapComponent.module.css";
import main from "../../MainPage/mainPage.module.css";

interface Props {
    isMobile: boolean
}
const MapComponent: React.FC<Props> = ({isMobile}) => {
    return (
            <div className={`${!isMobile ? styles.mapComponent : styles.mapComponentMobile}`}>
            <div className={main.linebreak}/>
            <h1>Where you´ll stay</h1>
            <div className={styles.mapFrame}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.963861357272!2d151.20333328205697!3d-33.864822214059956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12af9f02b68263%3A0x87912fc3fdec385d!2sAustralia%20Square!5e0!3m2!1sno!2sno!4v1700408001018!5m2!1sno!2sno"
                    width="100%" height="100%" loading="lazy" />
            </div>


        </div>
    )
}

export default MapComponent;
