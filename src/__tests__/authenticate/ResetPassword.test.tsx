import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ResetPassword from '../../Pages/Authenticate/ResetPassword'; // Assurez-vous que le chemin est correct
import { ThemeProvider } from '@emotion/react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material';
import i18n from '../../i18n';
import api from '../../__generated__/api';

const theme = createTheme();
vi.mock('../../__generated__/api');

describe('ResetPassword Component', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, 'Test Page', '/?email=test@example.com&token=testtoken');
  });

  const renderResetPassword = () =>
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <ResetPassword />
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>,
    );

  it('renders the ResetPassword component', () => {
    renderResetPassword();
    expect(screen.getByText(i18n.t('authenticate:resetPasswordTitle'))).toBeInTheDocument();
  });

  it('validates password format before submitting', async () => {
    renderResetPassword();

    const passwordInput = screen.getByLabelText(`${i18n.t('authenticate:newPassword')} *`);
    const submitButton = screen.getByRole('button', { name: i18n.t('authenticate:send') });

    fireEvent.change(passwordInput, { target: { value: 'weakpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(i18n.t('authenticate:passwordError'))).toBeInTheDocument();
    });
  });

  it('submits the form successfully when password is valid', async () => {
    renderResetPassword();
    api.authenticate.resetPassword = vi.fn((): any =>
      Promise.reject({ response: { data: { message: 'InvalidToken' } } }),
    );

    const passwordInput = screen.getByLabelText(`${i18n.t('authenticate:newPassword')} *`);
    const submitButton = screen.getByRole('button', { name: i18n.t('authenticate:send') });

    fireEvent.change(passwordInput, { target: { value: 'Valid1@password' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.authenticate.resetPassword).toHaveBeenCalled();
    });
  });

  it('displays an error when API returns an error', async () => {
    renderResetPassword();
    api.authenticate.resetPassword = vi.fn((): any =>
      Promise.reject({ response: { data: { message: 'InvalidToken' } } }),
    );

    const passwordInput = screen.getByLabelText(`${i18n.t('authenticate:newPassword')} *`);
    const submitButton = screen.getByRole('button', { name: i18n.t('authenticate:send') });

    fireEvent.change(passwordInput, { target: { value: 'Valid1@password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(i18n.t('authenticate:invalidToken'))).toBeInTheDocument();
    });
  });
});
