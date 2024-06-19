import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../__generated__/api';
import { GetProductResult, ProductType } from '../../__generated__/api-generated';
import { Button, Container } from '@mui/material';
import i18n from '../../i18n';

export const Products = (): JSX.Element => {
  const [products, setProducts] = useState<GetProductResult[]>();
  const { productType } = useParams();

  useEffect(() => {
    api.product.getProducts(ProductType.MurderParty).then(result => setProducts(result.data.result));
  }, [productType]);

  return (
    <Container>
      {i18n.t(`${productType}.title`)}
      {products &&
        products.length > 0 &&
        products.map(p => (
          <div key={p.id}>
            <Link to={`/product/${productType}/${p.productCode}`}>
              <Button>Voir la description</Button>
            </Link>
          </div>
        ))}
    </Container>
  );
};

export default Products;
