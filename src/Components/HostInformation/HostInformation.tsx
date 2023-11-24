import React from "react";
import styles from "./hostInformation.module.css";
import main from "../../MainPage/mainPage.module.css";

interface Props {
    isMobile: boolean
}
const HostInformation: React.FC<Props> = ({isMobile}) => {
    return (
            <div className={`${!isMobile ? styles.hostInformation : styles.hostInformationMobile}`}>

            <div className={main.linebreak}/>
            <h2>Host Information</h2>
            <div className={styles.hostInformationGrid}>
                <div className={styles.hostInformationGridItem}>
                    <h3>Hosted by</h3>
                    <p>John Doe</p>
                </div>
                <div className={styles.hostInformationGridItem}>
                    <h3>Joined in</h3>
                    <p>May 2020</p>
                </div>
                <div className={styles.hostInformationGridItem}>
                    <h3>Description</h3>
                    <p>I’m a part of the NOVASOL customer service team. Please feel free to contact us and one from the team will be happy to assist you in all matters and fulfill you wishes.NOVASOL offer more than 44,000 hand-picked vacation homes, across 29 European countries. We simply aim to provide: Quality self-catering vacation homes, all handpicked and inspected by us, with complete reliability meaning you can trust that we will provide you with the best accommodation for you stay.Looking forward to welcome you in of our 44,000 vacation homes!</p>
                </div>


                <div className={styles.hostInformationGridItem}>
                    <h3>Response rate</h3>
                    <p>100%</p>
                </div>
                <div className={styles.hostInformationGridItem}>
                    <h3>Response time</h3>
                    <p>within an hour</p>
                </div>

                <div className={styles.hostInformationGridItem}>
                    <h3>Language</h3>
                    <p> Dansk, English, Deutsch, Norsk, Svenska</p>
                </div>
                <div className={styles.hostInformationGridItem}>
                   <button className={styles.contactHost}>Contact host</button>
                </div>


            </div>
        </div>
    )
}

export default HostInformation;
