import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider } from 'react-cookie';
import SignUp from '../../Pages/Authenticate/SignUp';
import i18n from '../../i18n';
import api from '../../__generated__/api';
import { mockNavigate } from '../../../setupTests';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import { AuthProvider } from '../../Contexts/AuthContext';

const theme = createTheme();

describe('SignUp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSignUp = () =>
    render(
      <AuthProvider>
        <BrowserRouter>
          <CookiesProvider>
            <ThemeProvider theme={theme}>
              <SignUp />
            </ThemeProvider>
          </CookiesProvider>
        </BrowserRouter>
      </AuthProvider>,
    );

  it('renders SignUp form correctly', () => {
    renderSignUp();
    expect(screen.getByLabelText(`${i18n.t('authenticate:email')} *`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${i18n.t('authenticate:password')} *`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: i18n.t('authenticate:signUp') })).toBeInTheDocument();
  });

  it('displays error when email is invalid', async () => {
    renderSignUp();
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:email')} *`), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signUp') }));
    await waitFor(() => expect(screen.getByText(i18n.t('authenticate:emailError'))).toBeInTheDocument());
  });

  it('displays error when password does not meet requirements', async () => {
    renderSignUp();
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:password')} *`), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signUp') }));
    await waitFor(() => expect(screen.getByText(i18n.t('authenticate:passwordError'))).toBeInTheDocument());
  });

  it('calls API and navigates on successful signup', async () => {
    api.authenticate.signUp = vi.fn((): any => Promise.resolve({ data: { result: 'fake-token' } }));
    renderSignUp();

    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:email')} *`), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:password')} *`), {
      target: { value: 'Valid@1234' },
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signUp') }));

    await waitFor(() => {
      expect(api.authenticate.signUp).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          password: 'Valid@1234',
          marketingEmail: true,
        },
        { withCredentials: true },
      );
      expect(mockNavigate).toHaveBeenCalledWith(BuildUrl(EnumAppRoutes.HomePage));
    });
  });

  it('disable the button when fetching', async () => {
    api.authenticate.signUp = vi.fn((): any => Promise.resolve({ data: { result: 'fake-token' } }));
    renderSignUp();

    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:email')} *`), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:password')} *`), {
      target: { value: 'Valid@1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signUp') }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: i18n.t('authenticate:signUp') })).toBeDisabled();
    });
  });
});
