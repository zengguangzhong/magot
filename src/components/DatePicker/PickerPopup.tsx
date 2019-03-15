import React from 'react';
import Popup, { PopupProps } from '../Popup';
import { NestedComponent, getComponentClasses } from '../component';

type ickerPopupPProps = Pick<PopupProps, 'overlay'> & NestedComponent;

function PickerPopup(props: ickerPopupPProps) {
  return (
    <Popup
      className={getComponentClasses('date-picker')}
      placement="bottomLeft"
      trigger="click"
      space={2}
      removeWhenClose={true}
      overlay={props.overlay}>
      {props.children}
    </Popup>
  );
}

export default PickerPopup;
