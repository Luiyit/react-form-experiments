// https://github.com/react-component/time-picker
import React from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

export default function TimePickerControl(props) {
  const { value, ...rest } = props.field;
  return (
    <TimePicker
      {...rest}
      value={moment(value)}
      showSecond={false}
      use12Hours
      allowEmpty={false}
    />
  );
}
