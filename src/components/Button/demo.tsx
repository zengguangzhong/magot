import React, { useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

function onClick() {
  alert('You clicked the Button');
}

function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Danger</Button>
        <Button type="text">Text</Button>
        <Button type="link">Link</Button>
      </div>
      <div className="demo-box">
        <div className="demo-block">
          <Button size="small">Small</Button>
          <Button type="primary" size="small">
            Small
          </Button>
          <Button type="success" size="small">
            Small
          </Button>
          <Button type="warning" size="small">
            Small
          </Button>
          <Button type="danger" size="small">
            Small
          </Button>
          <Button type="text" size="small">
            Small
          </Button>
          <Button type="link" size="small">
            Small
          </Button>
        </div>
        <div className="demo-block">
          <Button>Normal</Button>
          <Button type="primary">Normal</Button>
          <Button type="success">Normal</Button>
          <Button type="warning">Normal</Button>
          <Button type="danger">Normal</Button>
          <Button type="text">Normal</Button>
          <Button type="link">Normal</Button>
        </div>
        <div className="demo-block">
          <Button size="large">Large</Button>
          <Button type="primary" size="large">
            Large
          </Button>
          <Button type="success" size="large">
            Large
          </Button>
          <Button type="warning" size="large">
            Large
          </Button>
          <Button type="danger" size="large">
            Large
          </Button>
          <Button type="text" size="large">
            Large
          </Button>
          <Button type="link" size="large">
            Large
          </Button>
        </div>
      </div>
      <div className="demo-box">
        <Button>Default</Button>
        <Button disabled={true}>Default(disabled)</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary" disabled={true}>
          Primary(disabled)
        </Button>
        <Button type="success">Success</Button>
        <Button type="success" disabled={true}>
          Success(disabled)
        </Button>
        <Button type="warning">Warning</Button>
        <Button type="warning" disabled={true}>
          Warning(disabled)
        </Button>
        <Button type="danger">Danger</Button>
        <Button type="danger" disabled={true}>
          Danger(disabled)
        </Button>
        <Button type="text">Text</Button>
        <Button type="text" disabled={true}>
          Text(disabled)
        </Button>
        <Button
          type="link"
          href="https://github.com/billjs/magot"
          target="_blank">
          Link
        </Button>
        <Button
          type="link"
          href="https://github.com/billjs/magot"
          target="_blank"
          disabled={true}>
          Link(disabled)
        </Button>
      </div>
      <div className="demo-box">
        <div className="demo-block">
          <Button size="small" icon="download">
            Default
          </Button>
          <Button type="primary" size="small" icon="download">
            Primary
          </Button>
          <Button type="success" size="small" icon="smile">
            Success
          </Button>
          <Button type="warning" size="small" icon="return">
            Warning
          </Button>
          <Button type="danger" size="small" icon="delete">
            Danger
          </Button>
          <Button type="text" size="small" icon="comment">
            Text
          </Button>
          <Button type="link" size="small" icon="message">
            Link
          </Button>
        </div>
        <div className="demo-block">
          <Button icon="download">Default</Button>
          <Button type="primary" icon="download">
            Primary
          </Button>
          <Button type="success" icon="smile">
            Success
          </Button>
          <Button type="warning" icon="return">
            Warning
          </Button>
          <Button type="danger" icon="delete">
            Danger
          </Button>
          <Button type="text" icon="comment">
            Text
          </Button>
          <Button type="link" icon="message">
            Link
          </Button>
        </div>
        <div className="demo-block">
          <Button icon="download" size="large">
            Default
          </Button>
          <Button type="primary" size="large" icon="download">
            Primary
          </Button>
          <Button type="success" size="large" icon="smile">
            Success
          </Button>
          <Button type="warning" size="large" icon="return">
            Warning
          </Button>
          <Button type="danger" size="large" icon="delete">
            Danger
          </Button>
          <Button type="text" size="large" icon="comment">
            Text
          </Button>
          <Button type="link" size="large" icon="message">
            Link
          </Button>
        </div>
        <div className="demo-block">
          <Button disabled={true} icon="download">
            Default
          </Button>
          <Button type="primary" disabled={true} icon="download">
            Primary
          </Button>
          <Button type="success" disabled={true} icon="smile">
            Success
          </Button>
          <Button type="warning" disabled={true} icon="return">
            Warning
          </Button>
          <Button type="danger" disabled={true} icon="delete">
            Danger
          </Button>
          <Button type="text" disabled={true} icon="comment">
            Text
          </Button>
          <Button type="link" disabled={true} icon="message">
            Link
          </Button>
        </div>
        <div className="demo-block">
          <Button iconPosition="right" icon="download">
            Default
          </Button>
          <Button type="primary" iconPosition="right" icon="download">
            Primary
          </Button>
          <Button type="success" iconPosition="right" icon="smile">
            Success
          </Button>
          <Button type="warning" iconPosition="right" icon="return">
            Warning
          </Button>
          <Button type="danger" iconPosition="right" icon="delete">
            Danger
          </Button>
          <Button type="text" iconPosition="right" icon="comment">
            Text
          </Button>
          <Button type="link" iconPosition="right" icon="message">
            Link
          </Button>
        </div>
      </div>
      <div className="demo-box">
        <div className="demo-block">
          <Button icon="download" />
          <Button type="primary" icon="download" iconSize={20} />
          <Button type="success" icon="smile" iconSize={20} />
          <Button type="warning" icon="return" iconSize={20} />
          <Button type="danger" icon="delete" iconSize={20} />
          <Button type="text" icon="comment" iconSize={20} />
          <Button type="link" icon="message" iconSize={20} />
        </div>
        <div className="demo-block">
          <Button icon="scan" circular={true} size="small" />
          <Button icon="scan" circular={true} />
          <Button icon="scan" circular={true} size="large" />
          <Button type="primary" icon="download" circular={true} size="small" />
          <Button type="primary" icon="download" circular={true} />
          <Button type="primary" icon="download" circular={true} size="large" />
          <Button type="danger" icon="delete" circular={true} size="small" />
          <Button type="danger" icon="delete" circular={true} />
          <Button type="danger" icon="delete" circular={true} size="large" />
        </div>
        <div className="demo-block">
          <Button icon="scan" square={true} size="small" />
          <Button icon="scan" square={true} />
          <Button icon="scan" square={true} size="large" />
          <Button type="primary" icon="download" square={true} size="small" />
          <Button type="primary" icon="download" square={true} />
          <Button type="primary" icon="download" square={true} size="large" />
          <Button type="danger" icon="delete" square={true} size="small" />
          <Button type="danger" icon="delete" square={true} />
          <Button type="danger" icon="delete" square={true} size="large" />
        </div>
      </div>
      <div className="demo-box">
        <Button loading={true}>Loading</Button>
        <Button type="primary" loading={true}>
          Loading
        </Button>
        <Button type="text" loading={true}>
          Loading
        </Button>
        <Button loading={true} circular={true} />
        <Button type="primary" loading={true} circular={true} />
        <Button
          type="primary"
          loading={loading}
          disabled={loading}
          // tslint:disable
          onClick={() => setLoading(true)}>
          {loading ? 'Submitting' : 'Submit'}
        </Button>
      </div>
      <div className="demo-box">
        <Button block={true}>Default</Button>
        <Button type="primary" block={true}>
          Primary
        </Button>
        <Button type="success" block={true}>
          Success
        </Button>
        <Button type="warning" block={true}>
          Warning
        </Button>
        <Button type="danger" block={true}>
          Danger
        </Button>
        <Button type="text" block={true}>
          Text
        </Button>
        <Button type="link" block={true}>
          Link
        </Button>
      </div>
      <div className="demo-box">
        <div className="demo-block">
          <Button onClick={onClick}>Click me</Button>
          <Button type="primary" onClick={onClick}>
            Click me
          </Button>
          <Button type="success" onClick={onClick}>
            Click me
          </Button>
          <Button type="warning" onClick={onClick}>
            Click me
          </Button>
          <Button type="danger" onClick={onClick}>
            Click me
          </Button>
          <Button type="text" onClick={onClick}>
            Click me
          </Button>
          <Button type="link" onClick={onClick}>
            Click me
          </Button>
        </div>
        <div className="demo-block">
          <Button href="https://github.com/billjs/magot" target="_blank">
            Link me
          </Button>
          <Button
            type="primary"
            href="https://github.com/billjs/magot"
            target="_blank">
            Link me
          </Button>
          <Button
            type="success"
            href="https://github.com/billjs/magot"
            target="_blank">
            Link me
          </Button>
          <Button
            type="warning"
            href="https://github.com/billjs/magot"
            target="_blank">
            Link me
          </Button>
          <Button
            type="danger"
            href="https://github.com/billjs/magot"
            target="_blank">
            Link me
          </Button>
          <Button
            type="text"
            href="https://github.com/billjs/magot"
            target="_blank">
            Link me
          </Button>
          <Button
            type="link"
            href="https://github.com/billjs/magot"
            target="_blank">
            Link me
          </Button>
        </div>
      </div>
      <div className="demo-box">
        <Button.Group>
          <Button>L</Button>
          <Button>M</Button>
          <Button>R</Button>
        </Button.Group>
        <Button.Group>
          <Button type="primary" icon="arrow-left">
            Go Back
          </Button>
          <Button type="primary" icon="arrow-right" iconPosition="right">
            Go Forward
          </Button>
        </Button.Group>
        <Button.Group>
          <Button type="primary" icon="download" square={true} />
          <Button type="primary" icon="upload" square={true} />
        </Button.Group>
        <Button.Group>
          <Button type="success" icon="smile" square={true} />
          <Button type="success" icon="view" square={true} />
        </Button.Group>
        <Button.Group>
          <Button type="warning" icon="alipay" square={true} />
          <Button type="warning" icon="wxpay" square={true} />
        </Button.Group>
        <Button.Group>
          <Button type="danger" icon="delete" square={true} />
          <Button type="danger" icon="close" square={true} />
        </Button.Group>
      </div>
      <div className="demo-box">
        <Button
          style={{
            color: '#52c41a',
            backgroundColor: '#343a40',
            borderColor: '#343a40',
          }}>
          My Button
        </Button>
        <Button
          style={{
            color: '#fff',
            backgroundColor: '#f5222d',
            borderColor: '#f5222d',
            borderRadius: 0,
          }}>
          My Button
        </Button>
      </div>
    </>
  );
}

export default ButtonDemo;
