import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AccountInformations from '../../Pages/Account/AccountInformations';
import api from '../../__generated__/api';
import { BrowserRouter } from 'react-router-dom';
import i18n from '../../i18n';
import { createTheme, ThemeProvider } from '@mui/material';
import { CookiesProvider } from 'react-cookie';

const theme = createTheme();
vi.mock('../../__generated__/api');

describe('AccountInformations Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderAccountInformations = () =>
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <AccountInformations />
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>,
    );

  it('renders correctly', async () => {
    api.user.getUser = vi.fn((): any => Promise.resolve({ data: { result: { email: 'test@example.com' } } }));
    renderAccountInformations();

    await waitFor(() => {
      expect(screen.getByLabelText(`${i18n.t('account:email')} *`)).toHaveValue('test@example.com');
    });
  });

  it('updates user information successfully', async () => {
    api.user.updateUser = vi.fn((): any => Promise.resolve({ data: {} }));
    api.user.getUser = vi.fn((): any => Promise.resolve({ data: { result: { email: 'test@example.com' } } }));
    renderAccountInformations();

    await waitFor(() => {
      expect(screen.getByLabelText(`${i18n.t('account:email')} *`)).toHaveValue('test@example.com');
    });

    fireEvent.change(screen.getByLabelText(`${i18n.t('account:email')} *`), { target: { value: 'new@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('update') }));

    await waitFor(() => {
      expect(api.user.updateUser).toHaveBeenCalledWith(expect.objectContaining({ newEmail: 'new@example.com' }));
      expect(screen.getByText(`${i18n.t('account:updateSuccess')}`)).toBeInTheDocument();
    });
  });

  it('displays validation errors', async () => {
    api.user.getUser = vi.fn((): any => Promise.resolve({ data: { result: { email: 'test@example.com' } } }));
    renderAccountInformations();

    await waitFor(() => {
      expect(screen.getByLabelText(`${i18n.t('account:email')} *`)).toHaveValue('test@example.com');
    });

    fireEvent.change(screen.getByLabelText(`${i18n.t('account:email')} *`), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('update') }));

    await waitFor(() => {
      expect(screen.getByText(i18n.t('account:emailError'))).toBeInTheDocument();
    });
  });
});
