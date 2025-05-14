import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, expect, it } from 'vitest';
import NotFound from '../../../Pages/NotFound/NotFound';
import { CookiesProvider } from 'react-cookie';
import i18n from '../../../i18n';

const theme = createTheme();

describe('NotFound Component', async () => {
  const renderNotFound = () =>
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <NotFound />
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>,
    );

  it('renders the NotFound component with links and text', async () => {
    renderNotFound();

    expect(screen.getByText(i18n.t('notFound'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('return'))).toBeInTheDocument();
  });
});
