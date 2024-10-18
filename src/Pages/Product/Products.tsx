import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../__generated__/api';
import { GetProductResult, ProductType } from '../../__generated__/api-generated';
import { Box, Breadcrumbs, Button, Container, Paper, Typography, useTheme } from '@mui/material';
import i18n from '../../i18n';
import { useCookies } from 'react-cookie';

export const Products = (): JSX.Element => {
  const theme = useTheme();
  const [products, setProducts] = useState<GetProductResult[]>();
  const { productType } = useParams();
  const [cookies, setCookies] = useCookies(['basket']);

  useEffect(() => {
    api.product.getProducts(ProductType.MurderParty).then(result => setProducts(result.data.result));
  }, [productType]);

  const addToBasket = (product: GetProductResult) => {
    const basket = cookies.basket ?? [];
    basket.push(product);
    setCookies('basket', basket);
  };

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        <Link to={`/`} style={{ color: theme.palette.primary.main }}>
          {i18n.t('homepage')}
        </Link>
        <Typography color={theme.palette.primary.main}>{productType}</Typography>
      </Breadcrumbs>
      {i18n.t(`${productType}.title`)}
      <Box display={'flex'} flexDirection={'column'} gap={3} marginTop={3}>
        {products &&
          products.length > 0 &&
          products.map(p => (
            <Box
              key={p.id}
              style={{ backgroundColor: 'white' }}
              height={333}
              borderRadius={3}
              display={'flex'}
              flexDirection={'row'}>
              {p.images && (
                <img
                  width={500}
                  height={333}
                  className="imageCarousel"
                  src={p.images[0]}
                  alt={`${i18n.t(`${productType}.title`)} ${productType}`}
                />
              )}
              {p.title}
              <Link to={`/product/${productType}/${p.productCode}`}>
                <Button>Voir la description</Button>
              </Link>
              <Link to={`/order/basket`} onClick={() => addToBasket(p)}>
                <Button variant="contained">{i18n.t('addToBasket')}</Button>
              </Link>
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Products;
