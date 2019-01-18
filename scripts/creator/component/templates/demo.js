export default {
  filename: 'demo.tsx',
  code: `import React from 'react';
import \${name} from './\${name}';
import { Link } from 'react-router-dom';

function \${name}Demo() {
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <\${name} />
      </div>
    </>
  );
}

export default \${name}Demo;
`,
};
