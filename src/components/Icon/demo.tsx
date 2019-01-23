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
      <div className="demo-box">
        {icons.map(icon => {
          return (
            <Icon
              key={icon}
              name={icon}
              size={32}
              style={{
                color: '#bfbfbf',
                marginRight: 30,
                marginBottom: 30,
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default IconDemo;
