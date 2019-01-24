import React from 'react';

import './Notification.less';

import * as component from '../component';

export interface NotificationProps extends component.BaseComponent {}

const defaultProps: Partial<NotificationProps> = {};

function Notification(props: NotificationProps) {
  const cls = component.getComponentClasses('notification', props);
  return <div className={cls} />;
}

Notification.defaultProps = defaultProps;

export default Notification;
