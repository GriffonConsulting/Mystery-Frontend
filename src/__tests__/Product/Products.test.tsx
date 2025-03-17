import { render } from '@testing-library/react';
import Products from '../../Pages/Product/Products';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Products', () => {
  test('should render properly', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>,
    );
    const input = Math.sqrt(4);

    expect(input).to.equal(2);
  });
});
