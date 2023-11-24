import React, {useState} from 'react';
import styles from "./calender.module.css";


type CalendarProps = {
    onDateSelect: (date: Date) => void;
    startDate: Date | null;
    endDate: Date | null;
    monthOffset?: number;

};


const Calendar: React.FC<CalendarProps> = ({onDateSelect, startDate, endDate, monthOffset}) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const initialDate = new Date();
    if (monthOffset !== undefined) {
        initialDate.setMonth(initialDate.getMonth() + monthOffset);
    }
    const [viewDate, setViewDate] = useState<Date>(initialDate);
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const days = [];
    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

    for (let i = 1; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`}></div>);
    }

    const isBeforeToday = (date1: Date, date2: Date) => {
        return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) <
            new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    };

    const isSameDay = (date1: Date, date2: Date) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };


    for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), i);
        const isToday = isSameDay(dayDate, currentDate);
        const hasPassed = isBeforeToday(dayDate, currentDate);
        const isInRange = startDate && endDate &&
            dayDate > startDate && dayDate < endDate;
        const isSelectedStart = startDate ? isSameDay(dayDate, startDate) : false;
        const isSelectedEnd = endDate ? isSameDay(dayDate, endDate) : false;


        let className = styles.day;
        if (isToday) {
            className = `${className} ${styles.today}`;
        } else if (hasPassed) {
            className = `${className} ${styles.passed}`;
        } else if (isInRange) {
            className = `${className} ${styles.range}`;
        } else if (isSelectedStart || isSelectedEnd) {
            className = `${className} ${styles.selected}`;
        }

        days.push(
            <div key={i} className={className} onClick={() => handleDayClick(dayDate)}>
                {i}
            </div>
        );
    }


    const goToNextMonth = () => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
        setViewDate(newDate);
    };

    const goToPrevMonth = () => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
        if (newDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) {
            setViewDate(newDate);
        }
    };


    const handleDayClick = (date: Date) => {
        onDateSelect(date);
    };

    const displayMonthName = viewDate.toLocaleDateString('default', {month: 'long', year: 'numeric'}).toUpperCase()

    return (
        <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <button className={styles.button} onClick={goToPrevMonth}>Prev</button>
                {viewDate.toLocaleDateString('default', {month: 'long', year: 'numeric'}).toUpperCase()}
                <button className={styles.button} onClick={goToNextMonth}>Next</button>
            </div>
            <div className={styles.dayNames}>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
            </div>
            <div className={styles.calendarGrid}>
                {days}
            </div>
        </div>
    );
};

export default Calendar;
