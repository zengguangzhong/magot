export default {
  filename: '${name}.tsx',
  code: `import React from 'react';

import './\${name}.less';

import * as component from '../component';

export interface \${name}Props extends component.ComponentBase {}

const defaultProps: Partial<\${name}Props> = {};

function \${name}(props: \${name}Props) {
  console.log(props);
  return <div />;
}

\${name}.defaultProps = defaultProps;

export default \${name};
`,
};
