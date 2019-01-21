import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Button from '../Button';
import { useCountdown } from '../../hooks/countdown';

function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  const onChangeLoading = () => setLoading(true);

  const time = useCountdown(5, loading);
  if (time === 0 && loading) setLoading(false);

  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Loading size="small" />
        <Loading />
        <Loading size="large" />
      </div>
      <div className="demo-box">
        <Loading tip="正在加载中..." size="small" />
        <Loading tip="正在加载中..." />
        <Loading tip="正在加载中..." size="large" />
      </div>
      <div className="demo-box">
        <Loading tip="正在加载中..." direction="row" size="small" />
        <Loading tip="正在加载中..." direction="row" />
        <Loading tip="正在加载中..." direction="row" size="large" />
      </div>
      <div className="demo-box">
        <Loading tip="正在加载中..." size="large">
          <p>
            React makes it painless to create interactive UIs. Design simple
            views for each state in your application, and React will efficiently
            update and render just the right components when your data changes.
          </p>
          <Button type="primary" href="https://reactjs.org/" target="_blank">
            Click me for detail.
          </Button>
        </Loading>
      </div>
      <div className="demo-box">
        <Button type="primary" onClick={onChangeLoading}>
          点击加载
        </Button>
        <Loading
          loading={loading}
          global={true}
          size="large"
          tip={`正在加载中(${time}s)...`}
        />
      </div>
    </>
  );
}

export default LoadingDemo;
