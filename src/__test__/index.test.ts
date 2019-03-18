import * as components from '..';

describe('magot component files', () => {
  it('should export components correctly', () => {
    expect(Object.keys(components)).toMatchSnapshot();
  });
});
