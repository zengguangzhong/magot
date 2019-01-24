import React from 'react';
import Icon from './Icon';
import { Link } from 'react-router-dom';

const icons = __ICONS__ || [];

function IconDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-list">
        {icons.map(icon => {
          return (
            <li
              key={icon}
              className="demo-item"
              style={{ width: 100, textAlign: 'center', color: '#bfbfbf' }}>
              <Icon key={icon} name={icon} size={32} />
              <div
                style={{
                  marginTop: 10,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {icon}
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
}

export default IconDemo;
