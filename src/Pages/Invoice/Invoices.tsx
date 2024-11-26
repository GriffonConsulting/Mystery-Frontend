import * as React from 'react';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import api from '../../__generated__/api';
import { GetInvoicesResult } from '../../__generated__/api-generated';

const Invoices = (): JSX.Element => {
  const [invoices, setInvoices] = React.useState<GetInvoicesResult[]>([]);

  useEffect(() => {
    api.invoice.getInvoices().then(result => setInvoices(result.data.result as GetInvoicesResult[]));
  }, []);

  return (
    <Container maxWidth="xs">
      {invoices.map((invoice, i) => (
        <div key={i}>{invoice.amount}</div>
      ))}
    </Container>
  );
};

export default Invoices;
