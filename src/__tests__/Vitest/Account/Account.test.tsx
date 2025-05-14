import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Account from '../../../Pages/Account/Account';
import i18n from '../../../i18n';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { mockNavigate } from '../../../../setupTests';
import { AuthProvider } from '../../../Contexts/AuthContext';

const theme = createTheme();

describe('Account Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderAccountInformations = () =>
    render(
      <AuthProvider>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </AuthProvider>,
    );

  it('renders correctly', () => {
    renderAccountInformations();

    expect(screen.getByText(i18n.t('account:informations'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('account:games'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('account:invoicesTitle'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('account:disconnect'))).toBeInTheDocument();
  });

  it('navigates when clicking on account sections', () => {
    renderAccountInformations();

    fireEvent.click(screen.getByText(i18n.t('account:informations')));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
