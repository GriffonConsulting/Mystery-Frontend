import React from 'react';
import { Container, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import NotFoundSvg from './NotFoundSvg';

export const NotFound = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Container sx={{ mt: 2 }}>
      <Link to="/">
        <NotFoundSvg />
      </Link>
      Page non trouvée
      <br />
      <Link style={{ color: theme.palette.primary.dark }} to="/">
        Retourner à la page d&apos;accueil
      </Link>
    </Container>
  );
};

export default NotFound;
