import * as React from 'react';
import Container from '@mui/material/Container';
import { useCookies } from 'react-cookie';
import { Button } from '@mui/material';
import i18n from '../../i18n';

const Account = (): JSX.Element => {
  const [, , removeCookies] = useCookies(['token']);

  const disconnect = async () => {
    removeCookies('token', { sameSite: true, secure: true, path: '/' });
  };

  return (
    <Container maxWidth="xs">
      <Button onClick={disconnect}>{i18n.t('disconnect')}</Button>
    </Container>
  );
};

export default Account;
