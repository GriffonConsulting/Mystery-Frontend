import React, { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import api from '../../__generated__/api';
import { useCookies } from 'react-cookie';
import { AxiosResponse } from 'axios';
import { Breadcrumbs, Container, Typography, useTheme } from '@mui/material';
import i18n from '../../i18n';
import { Link } from 'react-router-dom';
import { BuildUrl } from '../../Functions/BuildUrl';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';

const Checkout = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const [cookies] = useCookies(['basket']);
  const [basket] = useState<string[]>(cookies.basket);
  const theme = useTheme();

  const fetchClientSecret = useCallback(() => {
    return api.stripe
      .checkout(
        {
          returnUrl: window.location.href + '/Success',
          productsIds: basket,
        },
        { withCredentials: true },
      )
      .then((res: AxiosResponse) => {
        return res.data.result?.clientSecret;
      })
      .catch((error: AxiosResponse) => {
        return error;
      });
  }, []);

  const options = { fetchClientSecret };

  return (
    <Container id="checkout">
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={BuildUrl(EnumAppRoutes.Basket)} style={{ color: theme.palette.primary.main }}>
          {i18n.t('order:basket')}
        </Link>
        <Typography color={theme.palette.primary.main}>{i18n.t('order:checkout')}</Typography>
      </Breadcrumbs>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Container>
  );
};

export default Checkout;
