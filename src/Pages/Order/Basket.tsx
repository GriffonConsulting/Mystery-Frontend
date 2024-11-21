import React, { useState } from 'react';
import { GetProductResult } from '../../__generated__/api-generated';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { useCookies } from 'react-cookie';
import DeleteIcon from '@mui/icons-material/RemoveShoppingCart';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';

export const Basket = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [basket] = useState<GetProductResult[]>(JSON.parse(localStorage.getItem('basket') ?? ''));

  const removeFromBasket = (productId: string): void => {
    const index = basket.findIndex(product => product.id === productId);
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    console.log(localStorage.getItem('basket'));
  };

  const frEuro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <Container>
      <h1>Panier</h1>
      {basket?.map((product, i) => (
        <Box
          key={i + product.id}
          display={'flex'}
          flexDirection={'row'}
          marginBottom={5}
          borderRadius={3}
          p={2}
          style={{ backgroundColor: 'white' }}>
          <img
            width={300}
            height={200}
            style={{ borderRadius: 3 }}
            className="imageCarousel"
            src={product.images[0]}
            alt={`${i18n.t(`${product.productType}.title`)} ${product.productType} ${i}`}
          />
          <Box ml={3}>
            <Typography component="h5" variant="h5" margin={0}>
              {product.title}
            </Typography>
            <Typography component="h6" variant="h6" margin={0}>
              {product.subtitle}
            </Typography>
            <div>
              <b>
                {product.nbPlayerMin} à {product.nbPlayerMax} joueurs
              </b>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => removeFromBasket(product.id)}>
              <DeleteIcon fontSize="small" /> Supprimer
            </div>
            <div>{frEuro.format(product.price)}</div>
          </Box>
        </Box>
      ))}
      Total {frEuro.format(basket?.reduce((i: number, { price }: GetProductResult) => i + price, 0))}
      <Button variant="contained" onClick={() => navigate('/order/checkout')}>
        Commander
      </Button>
    </Container>
  );
};

export default Basket;
