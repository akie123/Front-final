import React, { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import './Calendar.css';

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const weeksInMonth = (month) => {
        const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        const lastOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        const firstWeek = startOfWeek(firstOfMonth);
        const lastWeek = startOfWeek(lastOfMonth);
        const numWeeks = Math.ceil((lastWeek - firstWeek) / (7 * 24 * 60 * 60 * 1000)) + 1;
        return numWeeks;
    };

    const onDateClick = (day) => {
        setSelectedDate(day);
        // TODO: Open time slot editor modal
    };

    const renderCalendarCells = () => {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const numWeeks = weeksInMonth(currentDate);
        const cells = [];

        let day = startOfWeek(monthStart);

        for (let week = 0; week < numWeeks; week++) {
            for (let i = 0; i < 7; i++) {
                cells.push(
                    <div
                        key={`${week}-${i}`}
                        className={`cell${selectedDate && selectedDate.toDateString() === day.toDateString() ? ' selected' : ''}`}
                        onClick={() => onDateClick(day)}
                    >
                        <span className="day">{format(day, 'd')}</span>
                        <span className="weekday">{weekdays[i].substring(0, 3)}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
        }

        return cells;
    };

    const prevMonth = () => {
        setCurrentDate(addMonths(currentDate, -1));
    };

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={prevMonth}>Prev</button>
                <span>{format(currentDate, 'MMMM yyyy')}</span>
                <button onClick={nextMonth}>Next</button>
            </div>
            <div className="weekdays">
                {weekdays.map((weekday) => (
                    <div key={weekday} className="weekday">
                        {weekday.substring(0, 3)}
                    </div>
                ))}
            </div>
            <div className="cells">{renderCalendarCells()}</div>
        </div>
    );
}

export default Calendar;
