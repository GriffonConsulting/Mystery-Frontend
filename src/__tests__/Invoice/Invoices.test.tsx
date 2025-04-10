// Invoices.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccountInvoices from '../../Pages/Account/AccountInvoices';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { CookiesProvider } from 'react-cookie';
import i18n from '../../i18n';
import api from '../../__generated__/api';

const mockInvoices = [
  {
    id: '1',
    amount: 12345,
    createdOn: new Date('2024-04-01'),
    receiptUrl: 'https://example.com/invoice1.pdf',
  },
];
describe('Invoices component', () => {
  const theme = createTheme();
  const renderInvoices = () =>
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <AccountInvoices />
          </ThemeProvider>
        </CookiesProvider>
      </BrowserRouter>,
    );

  it('renders breadcrumbs and title', async () => {
    api.invoice.getInvoicesByUserId = vi.fn((): any => Promise.resolve({ data: { result: mockInvoices } }));
    renderInvoices();

    expect(await screen.findByText(i18n.t('account:invoice'))).toBeInTheDocument(); // lien "Facture"
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(i18n.t('account:invoicesTitle'));
  });

  it('displays invoice data in the table', async () => {
    api.invoice.getInvoicesByUserId = vi.fn((): any => Promise.resolve({ data: { result: mockInvoices } }));
    renderInvoices();
    await waitFor(() => {
      expect(screen.getByText('123,45 €')).toBeInTheDocument(); // montant formaté
    });
  });
});
