import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../__generated__/api';
import { GetProductDto } from '../../__generated__/api-generated';
import { Box, Breadcrumbs, Button, Container, Typography, useTheme } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import i18n from '../../i18n';
import { useCookies } from 'react-cookie';
import { AxiosResponse } from 'axios';

export const Product = (): JSX.Element => {
  const theme = useTheme();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [product, setProduct] = useState<GetProductDto>();
  const { productType, productCode } = useParams();
  const [carouselIndex, setCarrouselIndex] = useState<number>(0);
  const [cookies, setCookie] = useCookies(['basket']);
  const frEuro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  useEffect(() => {
    if (productCode) {
      api.product.getProduct(productCode).then((result: AxiosResponse) => setProduct(result.data.result));
    }
  }, [productCode]);

  const addToBasket = () => {
    setIsFetching(true);
    const basket: string[] = cookies.basket ?? [];
    const index = basket.findIndex(id => id === product?.id);
    if (index === -1 && product) {
      basket.push(product?.id);
      setCookie('basket', basket, { sameSite: true, secure: true, path: '/' });
    }
  };

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={`/`} style={{ color: theme.palette.primary.main }}>
          {i18n.t('homepage')}
        </Link>
        <Link to={`/product/${productType}`} style={{ color: theme.palette.primary.main }}>
          {productType}
        </Link>
        <Typography color={theme.palette.primary.main}>{product?.title}</Typography>
      </Breadcrumbs>

      {product && (
        <Box
          display={'flex'}
          gap={2}
          borderRadius={3}
          p={2}
          style={{ backgroundColor: 'white' }}
          sx={theme => ({
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
            [theme.breakpoints.up('md')]: {
              flexDirection: 'row',
            },
          })}>
          <Box>
            <Carousel
              sx={theme => ({
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                },
              })}
              autoPlay={false}
              index={carouselIndex}
              NextIcon={<NavigateNext />}
              PrevIcon={<NavigateBefore />}>
              {product.images?.map((item, i) => (
                <img
                  key={item}
                  style={{ borderRadius: 3 }}
                  width={'100%'}
                  height={'100%'}
                  className="imageCarousel"
                  src={item}
                  alt={`${i18n.t(`${productType}.title`)} ${productType} ${i}`}
                />
              ))}
            </Carousel>
            <Box
              display={'flex'}
              gap={3}
              marginTop={1}
              sx={theme => ({
                [theme.breakpoints.down('md')]: {
                  flexWrap: 'wrap',
                },
              })}>
              {product.images
                ?.slice(0, 3)
                .map((item, i) => (
                  <img
                    key={item}
                    style={{ cursor: 'pointer' }}
                    width={150}
                    height={100}
                    className="imageCarousel"
                    src={item}
                    alt={`${productType} ${productType} ${i}`}
                    onClick={() => setCarrouselIndex(i)}
                  />
                ))}
            </Box>
          </Box>
          <Box>
            <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'}>
              <Typography component="h1" variant="h5" margin={0}>
                {product.title}
              </Typography>
              <div>
                <b>
                  {product.nbPlayerMin} à {product.nbPlayerMax} joueurs
                </b>
              </div>
            </Box>
            <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'}>
              <Typography component="h2" variant="h6" margin={0} color={'grey'}>
                {product.subtitle}
              </Typography>
              <div>{frEuro.format(product.price)}</div>
            </Box>
            {product.description}
            <Box justifyContent={'flex-end'} flexDirection={'row'} display={'flex'}>
              <Link to={`/order/basket`} onClick={addToBasket}>
                <Button disabled={isFetching} variant="contained">
                  {i18n.t('addToBasket')}
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Product;
