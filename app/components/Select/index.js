// https://github.com/Hacker0x01/react-datepicker/
import React from 'react';
import { Select } from 'antd';

export default function SelectControl(props) {
  const { options } = props;

  return (
    <Select {...props.field} style={{ width: '100%' }}>
      {options.map(option => (
        <Select.Option key={option.value} value={option.value}>
          {option.text}
        </Select.Option>
      ))}
    </Select>
  );
}
