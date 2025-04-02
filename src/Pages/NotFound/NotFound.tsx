import React from 'react';
import { Container, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import NotFoundSvg from './NotFoundSvg';
import i18n from '../../i18n';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';

export const NotFound = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Container sx={{ mt: 2 }}>
      <Link to={BuildUrl(EnumAppRoutes.HomePage)}>
        <NotFoundSvg />
      </Link>
      <span>{i18n.t('notFound')}</span>
      <br />
      <Link style={{ color: theme.palette.primary.dark }} to={BuildUrl(EnumAppRoutes.HomePage)}>
        <span>{i18n.t('return')}</span>
      </Link>
    </Container>
  );
};

export default NotFound;
