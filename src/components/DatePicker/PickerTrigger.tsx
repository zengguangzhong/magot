import React from 'react';
import Input, { InputProps } from '../Input';
import { getComponentClasses } from '../component';

interface PickerTriggerProps extends InputProps {
  width?: number;
  onUpdate?: (value: string | null, completed?: boolean) => void;
}

function PickerTrigger(props: PickerTriggerProps) {
  const { width, onUpdate, ...formProps } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate && onUpdate(e.target.value, false);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onUpdate && onUpdate(e.target.value, true);
    props.onBlur && props.onBlur(e);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.click();
    onUpdate && onUpdate(input.value, true);
    props.onPressEnter && props.onPressEnter(e);
  };

  const handleClear = () => {
    onUpdate && onUpdate(null, true);
    props.onClear && props.onClear();
  };

  return (
    <Input
      {...formProps}
      icon="calendar"
      className={getComponentClasses('date-picker', {
        className: props.className,
      })}
      style={{ ...props.style, width }}
      onChange={!props.readOnly ? handleInputChange : undefined}
      onBlur={!props.readOnly ? handleInputBlur : undefined}
      onPressEnter={!props.readOnly ? handlePressEnter : undefined}
      onClear={handleClear}
    />
  );
}

export default PickerTrigger;
