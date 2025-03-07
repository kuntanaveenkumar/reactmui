import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckboxGroup = ({ options, name, labels, checkedValues, onChange }) => {
  return (
    <FormGroup>
      {options.map((option, index) => (
        
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              name={`${name}[${index}]`}
              value={option.value}
              checked={checkedValues.includes(option.value)}
              onChange={(event) => onChange(event, option.value)}
              style={{color:"#000"}}
            />
          }
          label={labels[index]}
          style={{color:"#000"}}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxGroup;
