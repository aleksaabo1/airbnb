import React, {useState} from "react";
import styles from "./calenderBooking.module.css";
import main from "../../MainPage/mainPage.module.css"
import Calender from "./Calender";
import {BASE_URL} from "../../constants";

interface Props {
    isMobile: boolean
}

interface bookingData {
    name: string;
    startDate: string;
    endDate: string;
    url: string;
}


const CalenderBooking: React.FC<Props> = ({isMobile}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

    const handleDateSelect = (selectedDate: Date) => {
        // Logic to update startDate and endDate based on user selection
        if (!startDate || (endDate && selectedDate < startDate)) {
            setStartDate(selectedDate);
            setEndDate(null);
        } else if (!endDate) {
            if (selectedDate >= startDate) {
                setEndDate(selectedDate);
            } else {
                setStartDate(selectedDate);
            }
        } else {
            setStartDate(selectedDate);
            setEndDate(null);
        }
    };

    const sendNotification = async (bookingData: bookingData) => {
        try {
            const notifyResponse = await fetch(BASE_URL + '/api/notify/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            if (notifyResponse.ok) {
                console.log('Notification sent successfully');
            } else {
                console.error('Failed to send notification');
            }
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    const handleBooking = async () => {
        setBookingSuccess(false); // Reset the success state

        if (startDate && endDate) {
            const bookingData = {
                name: "User's Name", // Replace with actual user data
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                url: window.location.href
            };

            try {
                const response = await fetch(BASE_URL + '/booking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                });

                if (response.ok) {
                    const result = await response.json();
                    await sendNotification(bookingData);
                } else {
                    console.error('Booking failed');
                }
            } catch (error) {
                console.error('Error making booking:', error);
            }
        } else {
            console.error('Please select both start and end dates.');
        }
    };

    return (
        <div className={`${!isMobile ? styles.calenderDisplay : styles.calenderDisplayMobile}`}>
            <div className={main.linebreak}/>
            <h2>Calender</h2>
            <div className={`${!isMobile ? '' : styles.calenderPickerMobile} ${styles.calenderPicker}`}>
                <Calender onDateSelect={handleDateSelect} startDate={startDate} endDate={endDate}/>
                {!isMobile &&
                    <Calender onDateSelect={handleDateSelect} startDate={startDate} endDate={endDate} monthOffset={1}/>
                }
            </div>
            {startDate && endDate && ( // Conditional rendering of the button
                <button className={styles.bookingBtn} onClick={handleBooking}>Book Dates</button>
            )}
        </div>
    )
};

export default CalenderBooking;
