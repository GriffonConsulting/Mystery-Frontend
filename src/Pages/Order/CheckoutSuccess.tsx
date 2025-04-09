import { Container, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { BuildUrl } from '../../Functions/BuildUrl';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import i18n from '../../i18n';
import { useCookies } from 'react-cookie';

const CheckoutSuccess = () => {
  const theme = useTheme();
  const [, , removeCookies] = useCookies(['basket']);

  removeCookies('basket', { sameSite: true, secure: true, path: '/' });

  return (
    <Container style={{ textAlign: 'center' }}>
      <h1>{i18n.t('order:orderSuccess')}</h1>
      <p>{i18n.t('order:thankYou')}</p>
      <p>{i18n.t('order:seeGames')}</p>
      <Link to={BuildUrl(EnumAppRoutes.AccountGames)} style={{ color: theme.palette.primary.main }}>
        {i18n.t('order:games')}
      </Link>
    </Container>
  );
};

export default CheckoutSuccess;
