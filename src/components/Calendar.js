import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 설정
import '../styles/Calendar.css';
import PostList from './PostList';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [clickedDate, setClickedDate] = useState(moment()); 


  const handleDateClick = (day) => {
    const clickedMoment = moment(day);
    setClickedDate(clickedMoment);
  };


  const renderHeader = () => (
    <div className="header">
      <button onClick={prevMonth}>&lt;</button>
      <h2>{currentMonth.format('MMMM YYYY')}</h2>
      <button onClick={nextMonth}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const daysOfWeek = moment.weekdaysShort(); // ['일', '월', '화', '수', '목', '금', '토']
    return daysOfWeek.map(day => (
      <div key={day} className="day">
        {day}
      </div>
    ));
  };

  const renderCells = () => {
    const startOfMonth = moment(currentMonth).startOf('month');
    const endOfMonth = moment(currentMonth).endOf('month');
    const startOfWeek = moment(startOfMonth).startOf('week');
    const endOfWeek = moment(endOfMonth).endOf('week');
    const today = moment();

    const calendar = [];
    let day = startOfWeek;

    while (day.isSameOrBefore(endOfWeek)) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(
          <div
            key={day.format('YYYY-MM-DD')}
            className={`cell ${getCellClass(day)}`}
            onClick={() => handleDateClick(day)}
          >
            {day.date()}
          </div>
        );
        day = moment(day).add(1, 'day');
      }
      calendar.push(<div key={week[0].key} className="week">{week}</div>);
    }

    return calendar;
  };

  const getCellClass = (day) => {
    return ` ${day.isSame(currentMonth, 'month') ? '' : 'disabled'} ${
      day.isSame(clickedDate, 'day') ? 'selected-day' : ''
    }${isSelectedWeek(day) ? 'selected-week' : ''}`;
  };

  const isSelectedWeek = (day) => {
    if (!clickedDate) return false;
    const startOfSelectedWeek = moment(clickedDate).startOf('isoWeek');
    const endOfSelectedWeek = moment(clickedDate).endOf('week');
    return day.isBetween(startOfSelectedWeek, endOfSelectedWeek, 'day', '[]');
  };

  const nextMonth = () => {
    setCurrentMonth(moment(currentMonth).add(1, 'month'));
    setClickedDate(null); // 다음 달로 이동할 때 클릭한 날짜 초기화
  };

  const prevMonth = () => {
    setCurrentMonth(moment(currentMonth).subtract(1, 'month'));
    setClickedDate(null); // 이전 달로 이동할 때 클릭한 날짜 초기화
  };
  console.log('clickdate'+clickedDate)

  return (
    <div className="calendar">
      {renderHeader()}
      <div className="days">{renderDays()}</div>
      <div className="cells">{renderCells()}</div>
      <PostList clickedDate={clickedDate} />
    </div>
  );
};

export default Calendar;
