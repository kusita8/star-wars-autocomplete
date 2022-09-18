// component.tsx
exports.component = (name) => `
import { FC } from 'react';
import './${name}.css'

interface ${name}Props {}

export const ${name}: FC<${name}Props> = () => {
  return <div className="${name}">Hello 👋, I am ${name} component.</div>;
};
`;

// styles.css
exports.styles = (name) => `
  .${name} {}
`;

// component.test.tsx
exports.test = (name) => `
import { render } from "@testing-library/react";
import { ${name} } from '../${name}';

describe('${name}', () => {  
  test('it should match the snapshot', () => {
    const { asFragment } = render(<${name} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
`;
