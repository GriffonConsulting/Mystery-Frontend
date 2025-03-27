import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import ForgotPassword from '../../Pages/Authenticate/ForgotPassword';
import api from '../../__generated__/api';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../../i18n';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const theme = createTheme();
vi.mock('../../__generated__/api');

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderForgotPassword = () =>
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <ForgotPassword />
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>,
    );

  it('renders the form correctly', () => {
    renderForgotPassword();

    expect(screen.getByLabelText(i18n.t(`${i18n.t('authenticate:email')} *`))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: i18n.t('authenticate:send') })).toBeInTheDocument();
  });

  it('submits the form and displays success message', async () => {
    api.authenticate.forgotPassword = vi.fn((): any => Promise.resolve({ data: {} }));
    renderForgotPassword();

    const emailInput = screen.getByLabelText(i18n.t(`${i18n.t('authenticate:email')} *`));
    const submitButton = screen.getByRole('button', { name: i18n.t('authenticate:send') });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.authenticate.forgotPassword).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(screen.getByText(i18n.t('authenticate:sendEmail'))).toBeInTheDocument();
    });
  });
});
