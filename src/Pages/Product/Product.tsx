import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../__generated__/api';
import { GetProductResult } from '../../__generated__/api-generated';
import { Box, Breadcrumbs, Container, Link, Paper, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

export const Product = (): JSX.Element => {
  const [product, setProduct] = useState<GetProductResult>();
  const { productType, productCode } = useParams();
  const [carouselIndex, setCarrouselIndex] = useState<number>(0);
  console.log(productCode);
  useEffect(() => {
    if (productCode) {
      api.product.getProduct(productCode).then(result => setProduct(result.data.result));
    }
  }, [productCode]);

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={`/`}>
          HOMEPAGE
        </Link>
        <Link underline="hover" color="inherit" href={`/products/${productType}`}>
          {productType}
        </Link>
        <Typography color="text.primary">{product?.title}</Typography>
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
                    alt={`${productType} ${productType} ${i}`}
                  />
                </Paper>
              ))}
            </Carousel>
            <Box display={'flex'} gap={3} marginTop={1}>
              {product.images?.slice(0, 3).map((item, i) => (
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
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Product;
