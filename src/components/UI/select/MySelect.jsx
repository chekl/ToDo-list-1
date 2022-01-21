import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select 
            value={value}
            onChange={event => onChange(event.target.value)}
        >

          <option disabled value="">Filter</option>
          {options.map(option =>
            <option key={option.value}value={option.value}>
                {defaultValue} {option.name}
            </option>)}
        </select>
    )
};

export default MySelect;