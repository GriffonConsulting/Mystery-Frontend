import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Products = (): JSX.Element => {
  const { productId } = useParams();

  useEffect(() => {
    console.log(productId);
  }, [productId]);

  return <></>;
};

export default Products;
