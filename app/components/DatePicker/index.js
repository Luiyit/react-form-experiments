// https://github.com/Hacker0x01/react-datepicker/
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

export default function DatePickerControl(props) {
  const { value, ...rest } = props.field;

  return <DatePicker {...props.rest} value={moment(value)} />;
}
