import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CookiesProvider } from 'react-cookie';
import Contact from '../../../Pages/Contact/Contact';
import i18n from '../../../i18n';
import api from '../../../__generated__/api';
import { AuthProvider } from '../../../Contexts/AuthContext';

const theme = createTheme();

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderContact = () =>
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <Contact />
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>,
    );

  it('renders Contact form correctly', () => {
    renderContact();
    expect(screen.getByLabelText(`${i18n.t('email')} *`)).toBeInTheDocument();
    expect(screen.getByLabelText(`${i18n.t('message')} *`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: i18n.t('submit') })).toBeInTheDocument();
  });

  it('displays error when form is invalid', async () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(`${i18n.t('email')} *`), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('submit') }));
    await waitFor(() => expect(screen.getByText(i18n.t('emailError'))).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(i18n.t('messageError'))).toBeInTheDocument());
  });

  it('calls API', async () => {
    api.contact.contact = vi.fn((): any => Promise.resolve({ data: { result: 'fake-token' } }));
    renderContact();

    fireEvent.change(screen.getByLabelText(`${i18n.t('email')} *`), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(`${i18n.t('message')} *`), {
      target: { value: 'Valid@1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('submit') }));

    await waitFor(() => {
      expect(api.contact.contact).toHaveBeenCalledWith({
        email: 'test@example.com',
        message: 'Valid@1234',
      });
    });
  });

  it('disable the button when fetching', async () => {
    api.authenticate.signUp = vi.fn((): any => Promise.resolve({ data: { result: 'fake-token' } }));
    renderContact();

    fireEvent.change(screen.getByLabelText(`${i18n.t('email')} *`), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(`${i18n.t('message')} *`), {
      target: { value: 'Valid@1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: i18n.t('submit') }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: i18n.t('submit') })).toBeDisabled();
    });
  });
});
