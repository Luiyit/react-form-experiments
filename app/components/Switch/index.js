// https://github.com/Hacker0x01/react-datepicker/
import React from 'react';
import { Switch } from 'antd';

export default function SwitchControl(props) {
  const { value, ...rest } = props.field;

  return <Switch {...rest} checked={value} />;
}
