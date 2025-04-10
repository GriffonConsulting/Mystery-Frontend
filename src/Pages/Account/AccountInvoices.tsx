import * as React from 'react';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import api from '../../__generated__/api';
import { GetInvoicesDto } from '../../__generated__/api-generated';
import { AxiosResponse } from 'axios';
import { Breadcrumbs, Typography, useTheme } from '@mui/material';
import i18n from '../../i18n';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const AccountInvoices = (): JSX.Element => {
  const [invoices, setInvoices] = React.useState<GetInvoicesDto[]>([]);
  const theme = useTheme();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    api.invoice
      .getInvoicesByUserId({ withCredentials: true })
      .then((result: AxiosResponse) => setInvoices(result.data.result as GetInvoicesDto[]))
      .finally(() => setIsFetching(false));
  }, []);
  const columns: GridColDef<(typeof invoices)[number]>[] = [
    {
      field: 'amount',
      headerName: i18n.t('account:amount'),
      width: 150,
      valueFormatter: amount => Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount / 100),
    },
    {
      field: 'createdOn',
      headerName: i18n.t('account:date'),
      width: 150,
      valueFormatter: ({ value }) =>
        new Intl.DateTimeFormat('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(value),
    },
    {
      field: 'receiptUrl',
      headerName: i18n.t('account:invoice'),
      width: 150,
      renderCell: params => <a href={`${params.row.receiptUrl}`}>Facture</a>,
    },
  ];

  return (
    <Container style={{ marginTop: 32 }}>
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={BuildUrl(EnumAppRoutes.Account)} style={{ color: theme.palette.primary.main }}>
          {i18n.t('account:account')}
        </Link>
        <Typography color={theme.palette.primary.main}>{i18n.t('account:invoicesTitle')}</Typography>
      </Breadcrumbs>
      <Typography mt={1} mb={1} component="h1" variant="h5">
        {i18n.t('account:invoicesTitle')}
      </Typography>

      <DataGrid rows={invoices} columns={columns} hideFooter loading={isFetching} />
    </Container>
  );
};

export default AccountInvoices;
