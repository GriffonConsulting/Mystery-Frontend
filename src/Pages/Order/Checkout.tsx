import React, { useCallback, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import api from '../../__generated__/api';
import { useCookies } from 'react-cookie';
import { AxiosResponse } from 'axios';

const Checkout = () => {
  //todo conf
  const stripePromise = loadStripe(
    'pk_test_51PQ9oBP2H3oUToPCp2v3xgEGtrQC2X4D7FncAh0J5jpd7pi2PgQ2CTgEQvIMlEHkMGqmEzcTFtacC60qq1oObPCS00n9q79Bxz',
  );
  const [cookies] = useCookies(['basket']);
  const [basket] = useState<string[]>(cookies.basket);

  const fetchClientSecret = useCallback(() => {
    return api.stripe
      .checkout({
        returnUrl: window.location.href + '/Success',
        productsIds: basket,
      })
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
