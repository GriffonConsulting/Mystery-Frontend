import * as React from 'react';
import Container from '@mui/material/Container';
import { useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Account = (): JSX.Element => {
  const [, setCookies, removeCookies] = useCookies(['token']);

  const disconnect = async () => {
    removeCookies('token', { sameSite: true, secure: true, path: '/' });
  };

  return (
    <Container maxWidth="xs">
      <Button onClick={disconnect}>Se déconnecter</Button>
    </Container>
  );
};

export default Account;
