import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../__generated__/api';
import { GetProductResult } from '../../__generated__/api-generated';
import { Container } from '@mui/material';
import i18n from '../../i18n';

export const Product = (): JSX.Element => {
  const [product, setProduct] = useState<GetProductResult>();
  const { productCode } = useParams();

  useEffect(() => {
    if (productCode) {
      api.product.getProduct(productCode).then(result => setProduct(result.data.result));
    }
  }, [productCode]);

  return <Container>{product && <div>{product.productCode}</div>}</Container>;
};

export default Product;
