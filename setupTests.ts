import '@testing-library/jest-dom';
import { vi } from 'vitest';
import api from './src/__generated__/api';

export const mockNavigate = vi.fn();
export const mockLocation = vi.fn();

vi.mock('react-router-dom', () => ({
  useParams: (): any => ({ productCode: 'P001' }),
  BrowserRouter: vi.fn().mockImplementation(props => props.children),
  Link: vi.fn().mockImplementation(props => props.children),
  useNavigate: vi.fn().mockReturnValue(mockNavigate),
  useLocation: vi.fn().mockReturnValue(mockLocation),
}));
