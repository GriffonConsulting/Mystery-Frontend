import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../__generated__/api';
import { GetProductResult, ProductType } from '../../__generated__/api-generated';
import { Box, Breadcrumbs, Button, Container, Paper, Typography, useTheme } from '@mui/material';
import i18n from '../../i18n';
import { useCookies } from 'react-cookie';

export const Products = (): JSX.Element => {
  const theme = useTheme();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [products, setProducts] = useState<GetProductResult[]>();
  let { productType } = useParams();
  if (!productType) productType = ProductType.MurderParty;
  const [cookies, setCookie] = useCookies(['basket']);
  const frEuro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  useEffect(() => {
    api.product.getProducts(productType as ProductType).then(result => setProducts(result.data.result));
  }, [productType]);

  const addToBasket = (product: GetProductResult) => {
    setIsFetching(true);
    const basket: string[] = cookies.basket ?? [];
    const index = basket.findIndex(id => id === product?.id);
    if (index === -1 && product) {
      basket.push(product.id);
      setCookie('basket', basket, { sameSite: true, secure: true, path: '/' });
    }
  };

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={`/`} style={{ color: theme.palette.primary.main }}>
          {i18n.t('homepage')}
        </Link>
        {productType && <Typography color={theme.palette.primary.main}>{productType}</Typography>}
      </Breadcrumbs>
      {productType && i18n.t(`${productType}.title`)}
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
              <Box p={2}>
                {p.images && (
                  <Link to={`/product/${productType}/${p.productCode}`}>
                    <img
                      style={{ borderRadius: 3 }}
                      width={448}
                      height={301}
                      className="imageCarousel"
                      src={p.images[0]}
                      alt={`${i18n.t(`${productType}.title`)} ${productType}`}
                    />
                  </Link>
                )}
              </Box>
              <Box p={2} justifyContent={'space-between'} flexDirection={'column'} display={'flex'}>
                <div>
                  <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'}>
                    <Typography component="h1" variant="h5" margin={0}>
                      {p.title}
                    </Typography>
                    <div>
                      <b>
                        {p.nbPlayerMin} à {p.nbPlayerMax} joueurs
                      </b>
                    </div>
                  </Box>
                  <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'}>
                    <Typography component="h2" variant="h6" margin={0} color={'grey'}>
                      {p.subtitle}
                    </Typography>
                    <div>{frEuro.format(p.price)}</div>
                  </Box>
                  <span style={{ fontSize: 14 }}>{p.description}</span>
                </div>
                <Box justifyContent={'flex-end'} flexDirection={'row'} display={'flex'}>
                  <Link to={`/product/${productType}/${p.productCode}`}>
                    <Button>Voir la description</Button>
                  </Link>
                  <Link to={`/order/basket`}>
                    <Button disabled={isFetching} variant="contained" onClick={() => addToBasket(p)}>
                      {i18n.t('addToBasket')}
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Products;
