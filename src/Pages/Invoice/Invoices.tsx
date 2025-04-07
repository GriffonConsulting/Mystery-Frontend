import * as React from 'react';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import api from '../../__generated__/api';
import { GetInvoicesDto } from '../../__generated__/api-generated';
import { AxiosResponse } from 'axios';

const Invoices = (): JSX.Element => {
  const [invoices, setInvoices] = React.useState<GetInvoicesDto[]>([]);

  useEffect(() => {
    api.invoice
      .getInvoicesByUserId()
      .then((result: AxiosResponse) => setInvoices(result.data.result as GetInvoicesDto[]));
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
