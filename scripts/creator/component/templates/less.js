export default {
  filename: '${name}.less',
  code: `@import '../../variable.less';

.@{prefix}-\${type} {
  position: relative;
}
`,
};
