export default {
  filename: 'README.mdx',
  code: `---
name: \${name}
route: /components/\${name}
menu: Components
---

import { Playground, PropsTable } from 'docz';
import \${name} from './\${name}';

# \${name}

## Usage

## props

<PropsTable of={\${name}} />
`,
};
