import React, { useState } from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "../../css/Div.less"
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
const CustomDate = ({ name, label, value, onChange, touched, error }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const { t } = useTranslation('common');
  const handleDateChange = (date) => {
    onChange(date);
    setSelectedDate(date)
  };
  return (<>    
      <InputLabel id={name} style={{color:"#fff"}}>{t(label).toUpperCase()}</InputLabel>    
      <DatePicker
        selected={selectedDate}
        dateFormat="yyyy/MM/dd HH:mm:ss"
        className="dateInput"
        name={name}
        onChange={(date) => handleDateChange(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
      />
  </>
  );
};

export default CustomDate;
