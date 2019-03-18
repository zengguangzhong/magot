import * as components from '..';

describe('component files', () => {
  it('should export components correctly', () => {
    expect(Object.keys(components)).toMatchSnapshot();
  });
});
