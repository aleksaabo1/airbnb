import React from "react";
import styles from "./reservationComponent.module.css"
import {Link} from "react-router-dom";
interface ReservationProps {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    url: string;
}

const ReservationComponent: React.FC<ReservationProps> = ({ id, name, startDate, endDate, url }) => {
    return (
        <div className={styles.reservation}>
            <h3>Reservation Details</h3>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Start Date:</strong> {startDate}</p>
            <p><strong>End Date:</strong> {endDate}</p>
            <p> <Link to={url} target="_blank" rel="noopener noreferrer">Reservation</Link></p>
        </div>
    );
}

export default ReservationComponent;
