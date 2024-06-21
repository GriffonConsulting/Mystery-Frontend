import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../__generated__/api';
import { GetProductResult } from '../../__generated__/api-generated';
import { Box, Breadcrumbs, Button, Container, Paper, Typography, useTheme } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import i18n from '../../i18n';
import { useCookies } from 'react-cookie';

export const Product = (): JSX.Element => {
  const theme = useTheme();
  const [product, setProduct] = useState<GetProductResult>();
  const { productType, productCode } = useParams();
  const [carouselIndex, setCarrouselIndex] = useState<number>(0);
  const [cookies, setCookies] = useCookies(['basket']);

  useEffect(() => {
    if (productCode) {
      api.product.getProduct(productCode).then(result => setProduct(result.data.result));
    }
  }, [productCode]);

  const addToBasket = () => {
    const basket = cookies.basket ?? [];
    basket.push(productCode);
    setCookies('basket', basket);
  };

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        <Link to={`/`} style={{ color: theme.palette.primary.main }}>
          {i18n.t('homepage')}
        </Link>
        <Link to={`/product/${productType}`} style={{ color: theme.palette.primary.main }}>
          {productType}
        </Link>
        <Typography color={theme.palette.primary.main}>{product?.title}</Typography>
      </Breadcrumbs>

      {product && (
        <Box display={'flex'} gap={2}>
          <Box>
            <Carousel
              sx={{ width: 500, height: 333 }}
              autoPlay={false}
              index={carouselIndex}
              NextIcon={<NavigateNext />}
              PrevIcon={<NavigateBefore />}>
              {product.images?.map((item, i) => (
                <Paper>
                  <img
                    width={500}
                    height={333}
                    className="imageCarousel"
                    src={item}
                    alt={`${i18n.t(`${productType}.title`)} ${productType} ${i}`}
                  />
                </Paper>
              ))}
            </Carousel>
            <Box display={'flex'} gap={3} marginTop={1}>
              {product.images?.slice(1, 3).map((item, i) => (
                <Paper sx={{ width: 150, height: 100 }}>
                  <img
                    style={{ cursor: 'pointer' }}
                    width={150}
                    height={100}
                    className="imageCarousel"
                    src={item}
                    alt={`${productType} ${productType} ${i}`}
                    onClick={() => setCarrouselIndex(i)}
                  />
                </Paper>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography component="h1" variant="h5">
              {product.title}
            </Typography>
            <Link to={`/order/basket`} onClick={addToBasket}>
              <Button variant="contained">{i18n.t('addToBasket')}</Button>
            </Link>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Product;
