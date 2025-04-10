import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider } from 'react-cookie';
import SignIn from '../../Pages/Authenticate/SignIn';
import i18n from '../../i18n';
import api from '../../__generated__/api';
import { mockNavigate } from '../../../setupTests';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import { AuthProvider } from '../../Contexts/AuthContext';

const theme = createTheme();

describe('SignIn Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSignIn = () =>
    render(
      <AuthProvider>
        <BrowserRouter>
          <CookiesProvider>
            <ThemeProvider theme={theme}>
              <SignIn />
            </ThemeProvider>
          </CookiesProvider>
        </BrowserRouter>
      </AuthProvider>,
    );

  it('renders SignIn form correctly', () => {
    renderSignIn();
    expect(screen.getByLabelText(`${i18n.t('authenticate:email')} *`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${i18n.t('authenticate:password')} *`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: i18n.t('authenticate:signIn') })).toBeInTheDocument();
  });

  it('displays error when email is invalid', async () => {
    renderSignIn();
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:email')} *`), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signIn') }));
    await waitFor(() => expect(screen.getByText(i18n.t('authenticate:emailError'))).toBeInTheDocument());
  });

  it('displays error when password does not meet requirements', async () => {
    renderSignIn();
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:password')} *`), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signIn') }));
    await waitFor(() => expect(screen.getByText(i18n.t('authenticate:passwordError'))).toBeInTheDocument());
  });

  it('calls API and navigates on successful signIn', async () => {
    api.authenticate.signIn = vi.fn((): any => Promise.resolve({ data: { result: 'fake-token' } }));
    renderSignIn();

    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:email')} *`), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:password')} *`), {
      target: { value: 'Valid@1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signIn') }));

    await waitFor(() => {
      expect(api.authenticate.signIn).toHaveBeenCalledWith(
        {
          email: 'test@example.com',
          password: 'Valid@1234',
        },
        { withCredentials: true },
      );
      expect(mockNavigate).toHaveBeenCalledWith(BuildUrl(EnumAppRoutes.Account));
    });
  });

  it('disable the button when fetching', async () => {
    api.authenticate.signIn = vi.fn((): any => Promise.resolve({ data: { result: 'fake-token' } }));
    renderSignIn();

    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:email')} *`), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(`${i18n.t('authenticate:password')} *`), {
      target: { value: 'Valid@1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('authenticate:signIn') }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: i18n.t('authenticate:signIn') })).toBeDisabled();
    });
  });
});
