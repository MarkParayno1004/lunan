import { useState } from 'react';
import Calendar from 'react-calendar';
import "../css/CounselorSchedule.css"

export const  CounselorSchedule = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className='react-calendar'>
          <h1 className='text-center'>Schedule</h1>
          <div className='calendar-container'>
            <Calendar onChange={setDate} value={date} />
          </div>
          <p className='text-center'>
            <span className='bold'>Selected Date: {date.toDateString()}</span>{' '}
            
          </p>
        </div>
      );
    
}