import { render } from "@testing-library/react";
import { List } from '../List';

describe('List', () => {  
  test('it should match the snapshot', () => {
    const { asFragment } = render(<List />);
    expect(asFragment()).toMatchSnapshot();
  });
});