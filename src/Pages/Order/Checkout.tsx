import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import api from '../../__generated__/api';

const Checkout = () => {
  //todo conf
  const stripePromise = loadStripe(
    'pk_test_51PQ9oBP2H3oUToPCp2v3xgEGtrQC2X4D7FncAh0J5jpd7pi2PgQ2CTgEQvIMlEHkMGqmEzcTFtacC60qq1oObPCS00n9q79Bxz',
  );

  const fetchClientSecret = useCallback((): Promise<string> => {
    console.log('fetchClientSecret');
    // Create a Checkout Session
    return api.checkout
      .create({})
      .then(res => {
        console.log('res.data', res.data.result?.clientSecret);
        return res.data.result?.clientSecret;
      })
      .catch(error => {
        console.error('error', error);
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
