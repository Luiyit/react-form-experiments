// https://github.com/react-component/time-picker
import React from 'react';
import { Switch } from 'antd';
import 'rc-time-picker/assets/index.css';
import { useFormContext } from 'react-hook-form';

export default function SwitchControl(props) {
  const { setValue } = useFormContext();
  const { value, ...rest } = props.field;

  const onChange = isOn => {
    setValue(rest.name, isOn ? props.trueValue : props.falseValue);
  };

  return <Switch checked={props.trueValue === value} onChange={onChange} />;
}
