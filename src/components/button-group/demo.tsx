import React from 'react';
import Button from '../button';
import { Link } from 'react-router-dom';

function ButtonGroupDemo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
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
        <Button.Group size="small">
          <Button>L</Button>
          <Button>M</Button>
          <Button>R</Button>
        </Button.Group>
        <Button.Group>
          <Button>L</Button>
          <Button>M</Button>
          <Button>R</Button>
        </Button.Group>
        <Button.Group size="large">
          <Button>L</Button>
          <Button>M</Button>
          <Button>R</Button>
        </Button.Group>
      </div>
      <div className="demo-box">
        <Button.Group disabled={true}>
          <Button>L</Button>
          <Button>M</Button>
          <Button>R</Button>
        </Button.Group>
        <Button.Group disabled={true}>
          <Button type="warning" icon="alipay" square={true} />
          <Button type="warning" icon="wxpay" square={true} />
        </Button.Group>
      </div>
    </>
  );
}

export default ButtonGroupDemo;
