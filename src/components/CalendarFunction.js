import React, { useState } from 'react';
import { Calendar, DateCell } from 'react-calendar';

const CalendarFunction = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onSelect = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Calendar onChange={onSelect} />
      {selectedDate && <p>선택한 날짜: {selectedDate.toLocaleDateString()}</p>}
    </div>
  );
};

export default CalendarFunction;