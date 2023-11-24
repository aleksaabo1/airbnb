import React, {useState} from "react";
import styles from "./calenderBooking.module.css";
import main from "../../MainPage/mainPage.module.css"
import Calender from "./Calender";

interface Props {
    isMobile: boolean
}


const CalenderBooking: React.FC<Props> = ({isMobile}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

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
        </div>
    )
};

export default CalenderBooking;
