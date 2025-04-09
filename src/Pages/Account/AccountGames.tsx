import * as React from 'react';
import Container from '@mui/material/Container';
import { Breadcrumbs, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import i18n from '../../i18n';

const AccountGames = (): JSX.Element => {
  const theme = useTheme();

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
    </Container>
  );
};

export default AccountGames;
