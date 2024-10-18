import React, { useState } from 'react';
import { GetProductResult } from '../../__generated__/api-generated';
import { Container, useTheme } from '@mui/material';
import { useCookies } from 'react-cookie';
import DeleteIcon from '@mui/icons-material/RemoveShoppingCart';

export const Basket = (): JSX.Element => {
  const theme = useTheme();
  const [cookies, setCookies] = useCookies(['basket']);
  const [basket] = useState<GetProductResult[]>(cookies.basket);

  const removeFromBasket = (productId: string): void => {
    const index = basket.findIndex(product => product.id === productId);
    basket.splice(index, 1);
    setCookies('basket', basket);
  };

  const frEuro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <Container>
      Ma commande
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Produit</th>
            <th scope="col">Prix</th>
          </tr>
        </thead>
        <tbody>
          {basket?.map((product, i) => (
            <tr key={i + product.id}>
              <th style={{ cursor: 'pointer' }} scope="row" onClick={() => removeFromBasket(product.id)}>
                <DeleteIcon />
              </th>
              <td>{product.description}</td>
              <td>{frEuro.format(product.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      Total {frEuro.format(cookies.basket?.reduce((i: number, { price }: GetProductResult) => i + price, 0))}
    </Container>
  );
};

export default Basket;
