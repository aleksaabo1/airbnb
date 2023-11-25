import React, {useEffect, useState} from "react";
import styles from "./reservations.module.css";
import {BASE_URL} from "../constants";
import ReservationComponent from "../Components/reservations/ReservationComponent";
import styleExplore from "./explore.module.css";

interface Booking {
    id: number;
    name: string;
    startDate: string;
    endDate: string;

    url: string;
}

const Reservations = () => {
    const [reservations, setReservations] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(BASE_URL + '/bookings'); // URL to your API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setReservations(data);
                } else {
                    console.error('Failed to fetch reservations');
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };
        fetchReservations();
    }, []);

    return (
        <div className={`${styles.mainPage} ${styles.bookings}`}>
            <h1>Reservations</h1>
            <div className={styles.bookingsGrid}>
                {reservations.map(reservation => (
                    <ReservationComponent id={reservation.id} name={reservation.name}
                                          startDate={reservation.startDate.slice(0, 10)}
                                          endDate={reservation.endDate.slice(0, 10)}
                                          url={reservation.url}/>
                ))}
            </div>
        </div>
    );
};

export default Reservations;
