import React from 'react';
import Empty from './Empty';
import Button from '../Button';
import { Link } from 'react-router-dom';

function EmptyDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Empty />
      </div>
      <div className="demo-box">
        <Empty
          image="https://oss3.rabbitpre.com/spa/img/6237031221cdb5b0eab70443c546cb79.png"
          imageStyle={{ height: 250, marginBottom: 0 }}
          tipsStyle={{
            color: '#fff',
            fontSize: 30,
            position: 'absolute',
            top: 110,
            width: '100%',
          }}
          style={{ backgroundColor: '#383838' }}
        />
      </div>
      <div className="demo-box">
        <Empty imageVisible={false} />
      </div>
      <div className="demo-box">
        <Empty tips="" />
      </div>
      <div className="demo-box">
        <Empty
          tips="您目前没有创建任何游戏"
          tipsStyle={{ color: '#999', fontSize: 24, margin: '15px 0' }}>
          <Button type="primary" icon="plus">
            新建游戏
          </Button>
        </Empty>
      </div>
    </>
  );
}

export default EmptyDemo;
