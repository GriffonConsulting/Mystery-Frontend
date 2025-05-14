import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Breadcrumbs, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import i18n from '../../i18n';
import { AxiosResponse } from 'axios';
import api from '../../__generated__/api';
import { GetProductDto } from '../../__generated__/api-generated';
import { useState } from 'react';

const AccountGames = (): JSX.Element => {
  const theme = useTheme();
  const [products, setProducts] = useState<GetProductDto[]>();

  React.useEffect(() => {
    api.user
      .getUserGames({ withCredentials: true })
      .then((result: AxiosResponse) => setProducts(result.data.result.products));
  }, []);

  return (
    <Container style={{ marginTop: 32 }}>
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={BuildUrl(EnumAppRoutes.Account)} style={{ color: theme.palette.primary.main }}>
          {i18n.t('account:account')}
        </Link>
        <Typography color={theme.palette.primary.main}>{i18n.t('account:games')}</Typography>
      </Breadcrumbs>
      <Typography mt={1} mb={1} component="h1" variant="h5">
        {i18n.t('account:games')}
      </Typography>
      <Box display={'flex'} flexDirection={'column'} gap={3} marginTop={3}>
        {products &&
          products.length > 0 &&
          products.map((p, i) => (
            <Box
              data-testid={`product${i}`}
              key={p.id}
              style={{ backgroundColor: 'white' }}
              sx={theme => ({
                [theme.breakpoints.down('md')]: {
                  flexDirection: 'column',
                },
                [theme.breakpoints.up('md')]: {
                  flexDirection: 'row',
                },
              })}
              borderRadius={3}
              display={'flex'}>
              <Box p={2} flex={1} maxWidth={300}>
                {p.images && (
                  <Link to={BuildUrl(EnumAppRoutes.AccountGame, { userProductId: p.id })}>
                    <img
                      width={'100%'}
                      className="imageCarousel"
                      src={p.images[0]}
                      alt={`${i18n.t(p.productType ?? '')} ${p.productType}`}
                    />
                  </Link>
                )}
              </Box>
              <Box p={2} justifyContent={'space-between'} flexDirection={'column'} display={'flex'} flex={1}>
                <div>
                  <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'}>
                    <Typography component="h2" variant="h5" margin={0}>
                      {p.title}
                    </Typography>
                    <div>
                      <b>
                        {i18n.t('product:nbPLayers', {
                          nbPlayerMin: p.nbPlayerMin,
                          nbPlayerMax: p.nbPlayerMax,
                        })}
                      </b>
                    </div>
                  </Box>
                  <Box justifyContent={'space-between'} flexDirection={'row'} display={'flex'}>
                    <Typography component="h3" variant="h6" margin={0} color={'grey'}>
                      {p.subtitle}
                    </Typography>
                  </Box>
                  <span style={{ fontSize: 14 }}>{p.description}</span>
                </div>
              </Box>
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default AccountGames;
