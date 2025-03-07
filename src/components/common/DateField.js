import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomDatePicker = ({ value, onChange, ...rest }) => {
  const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : dayjs());
  const [lastClickTime, setLastClickTime] = useState(0);


  const handleDateChange = (date) => {
    const now = new Date().getTime();
    const diff = now - lastClickTime;

    if (diff < 300) {
      onChange(date);
      setSelectedDate(date)
    }

    setLastClickTime(now);
  };

  return (<><br /><br />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={selectedDate} onChange={handleDateChange} {...rest} />
    </LocalizationProvider></>
  );
};

export default CustomDatePicker;
