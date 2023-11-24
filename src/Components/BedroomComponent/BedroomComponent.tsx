import React, {useEffect} from "react";
import styles from "./bedroomComponent.module.css";
import BedroomDisplay from "./BedroomDisplay";
import {BASE_URL} from "../../constants";


interface BedroomsPops {
    roomNr: number;
    singleBed: number;
    doubleBed: number;
}
interface BedroomProps {
    id: number;
    bedConfiguration: BedroomsPops[];
}

interface Props {
    id: number;
    isMobile: boolean;
}
const BedroomComponent: React.FC<Props> = ({id, isMobile}) => {
    const [bedrooms, setBedrooms] = React.useState<BedroomProps | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            const id_mod = id % 12
            const response = await fetch(BASE_URL + `/rentals/bedrooms/${id_mod}`);
            const resp = await response.json();
            console.log(bedrooms)
            setBedrooms(resp)
        };
        fetchItems();
    }, [id]);



    return(
        <div className={`${!isMobile ? styles.bedroom : styles.bedroomMobile}`}>
            <h2>Where you'll sleep</h2>
            <div className={styles.bedroomList}  style={!isMobile ? {} : { justifyContent: 'center' }}>
                {bedrooms && bedrooms.bedConfiguration.map((bedroom, index) => {
                    return (
                        <BedroomDisplay
                            key={index}
                            roomNr={bedroom.roomNr}
                            singleBed={bedroom.singleBed}
                            doubleBed={bedroom.doubleBed}
                        />
                    );
                })}
            </div>

        </div>
    )
};

export default BedroomComponent;
