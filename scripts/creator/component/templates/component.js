export default {
  filename: '${name}.tsx',
  code: `import React from 'react';

import './\${name}.less';

import * as component from '../component';

export interface \${name}Props extends component.BaseComponent {}

const defaultProps: Partial<\${name}Props> = {};

function \${name}(props: \${name}Props) {
  const cls = component.getComponentClasses('\${type}', props);
  return <div className={cls} />;
}

\${name}.defaultProps = defaultProps;

export default \${name};
`,
};
