import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../../components/Loader';

describe('Loader Component', () => {
  it('renders a CircularProgress component', () => {
    render(<Loader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
