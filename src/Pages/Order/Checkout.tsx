import React, { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import api from '../../__generated__/api';
import { useCookies } from 'react-cookie';
import { AxiosResponse } from 'axios';

const Checkout = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const [cookies] = useCookies(['basket']);
  const [basket] = useState<string[]>(cookies.basket);

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
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Checkout;
