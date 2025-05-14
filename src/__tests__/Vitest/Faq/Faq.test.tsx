import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { GetFaqDto } from '../../../__generated__/api-generated';
import { ThemeProvider } from '@emotion/react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material';
import Faq from '../../../Pages/Faq/Faq';
import i18n from '../../../i18n';
import api from '../../../__generated__/api';

const mockFaq: GetFaqDto[] = [
  { question: 'What is your name?', answer: 'My name is toto.' },
  { question: 'What do you do?', answer: 'Testing' },
];

const theme = createTheme();

describe('Faq Component', () => {
  api.faq.getFaq = vi.fn((): any => Promise.resolve({ data: { result: mockFaq } }));
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderFaq = () =>
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <Faq />
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>,
    );

  it('renders the FAQ title', async () => {
    renderFaq();
    expect(screen.getByText(i18n.t('faqTitle'))).toBeInTheDocument();
  });

  it('loads and displays FAQs from API', async () => {
    renderFaq();
    await waitFor(() => {
      expect(screen.getByText('What is your name?')).toBeInTheDocument();
      expect(screen.getByText('What do you do?')).toBeInTheDocument();
    });
  });

  it('toggles accordion panels on click', async () => {
    renderFaq();
    await waitFor(() => screen.getByText('What is your name?'));

    const question = screen.getByText('What is your name?');
    userEvent.click(question);

    await waitFor(() => {
      expect(screen.getByText('My name is toto.')).toBeInTheDocument();
    });

    // Optional: test collapsing
    userEvent.click(question);
    await waitFor(() => {
      expect(screen.queryByText('My name is toto.')).not.toBeVisible();
    });
  });
});
