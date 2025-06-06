import React, { useEffect, useState } from 'react';
import { GetProductDto } from '../../__generated__/api-generated';
import { Box, Button, Container, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import i18n from '../../i18n';
import { useNavigate } from 'react-router-dom';
import api from '../../__generated__/api';
import { AxiosResponse } from 'axios';
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCart';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';

export const Basket = (): JSX.Element => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['basket']);
  const basket: string[] = cookies.basket;
  const [products, setProducts] = useState<GetProductDto[]>([]);

  const removeFromBasket = (productId: string): void => {
    const index = basket.findIndex(id => id === productId);
    basket.splice(index, 1);
    setCookie('basket', basket, { sameSite: true, secure: true, path: '/' });
  };

  useEffect(() => {
    if (basket.length > 0) {
      api.product
        .getProductsByIds(basket)
        .then((result: AxiosResponse) => setProducts(result.data.result as GetProductDto[]));
    } else {
      navigate(BuildUrl(EnumAppRoutes.HomePage));
    }
  }, [basket]);

  const frEuro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <Container>
      <Typography mt={1} mb={1} component="h1" variant="h4">
        {i18n.t('order:basket')}
      </Typography>
      {products.length !== 0 && (
        <Box display={'flex'} flexDirection={'row'} gap={5}>
          <div>
            {products?.map((product, i) => (
              <Box
                key={i + product.id}
                display={'flex'}
                flexDirection={'row'}
                marginBottom={2}
                borderRadius={3}
                p={2}
                style={{ backgroundColor: 'white' }}>
                <img
                  width={150}
                  height={100}
                  style={{ borderRadius: 3 }}
                  className="imageCarousel"
                  src={product.images[0]}
                  alt={`${i18n.t(product.productType)} ${product.productType} ${i}`}
                />
                <Box ml={3} width={'100%'}>
                  <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <div>
                      <Typography component="h5" variant="h6" margin={0}>
                        {product.title}
                      </Typography>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromBasket(product.id)}
                      style={{ all: 'unset', cursor: 'pointer', fontSize: '16px' }}>
                      <RemoveShoppingCart /> {i18n.t('order:delete')}
                    </button>
                  </Box>
                  <Typography component="h6" variant="subtitle1" margin={0} color={'gray'}>
                    {product.subtitle}
                  </Typography>
                  <div>
                    <b>
                      {i18n.t('order:nbPlayers', {
                        nbPlayerMin: product.nbPlayerMin,
                        nbPlayerMax: product.nbPlayerMax,
                      })}
                    </b>
                  </div>
                  <div>{frEuro.format(product.price)}</div>
                </Box>
              </Box>
            ))}
          </div>
          <Box height={'fit-content'} p={4} borderRadius={3} style={{ backgroundColor: 'white' }} minWidth={300}>
            <div style={{ marginBottom: 16 }}>
              <b>
                {i18n.t('order:total')}{' '}
                {frEuro.format(products?.reduce((i: number, { price }: GetProductDto) => i + price, 0) ?? 0)}
              </b>
            </div>
            <Button variant="contained" fullWidth={true} onClick={() => navigate(BuildUrl(EnumAppRoutes.Checkout))}>
              {i18n.t('order:order')}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Basket;
