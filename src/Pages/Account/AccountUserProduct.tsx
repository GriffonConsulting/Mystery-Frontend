import * as React from 'react';
import Container from '@mui/material/Container';
import { useTheme } from '@emotion/react';
import { AxiosResponse } from 'axios';
import api from '../../__generated__/api';
import { GetUserProductDto } from '../../__generated__/api-generated';
import { useParams } from 'react-router-dom';

const AccountUserProduct = (): JSX.Element => {
  const theme = useTheme();
  const [product, setProduct] = React.useState<GetUserProductDto>();
  const { userProductId } = useParams();
  console.log(product);
  React.useEffect(() => {
    if (userProductId)
      api.user
        .getUserProduct(userProductId, { withCredentials: true })
        .then((result: AxiosResponse) => setProduct(result.data.result));
  }, []);

  return <Container style={{ marginTop: 32 }}></Container>;
};

export default AccountUserProduct;
