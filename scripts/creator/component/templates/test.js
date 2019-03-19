export default {
  dir: '__test__',
  filename: '${name}.test.tsx',
  code: `import React from 'react';
import { render } from 'enzyme';
import \${name} from '../\${name}';

describe('\${name}', () => {
  it('should renders dom correctly', () => {
    const wrapper = render(<\${name} />);
    expect(wrapper).toMatchSnapshot();
  });
});
`,
};
