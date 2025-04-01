import * as React from 'react';
import { useCookies } from 'react-cookie';
import { Container, Grid, Paper, styled, Typography } from '@mui/material';
import i18n from '../../i18n';
import { AccountCircle, NoAccounts } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Account = (): JSX.Element => {
  const [, , removeCookies] = useCookies(['token']);
  const navigate = useNavigate();

  const disconnect = async () => {
    removeCookies('token', { sameSite: true, secure: true, path: '/' });
  };

  return (
    <Container style={{ marginTop: 32 }}>
      <Grid container spacing={{ xs: 2 }}>
        <AccountGrid>
          <Item onClick={() => navigate('/account/informations')}>
            <AccountCircle style={iconStyle} sx={{ color: 'primary.main' }} />
            <Typography variant="h5">{i18n.t('account:informations')}</Typography>
          </Item>
        </AccountGrid>
        <AccountGrid>
          <Item onClick={disconnect}>
            <NoAccounts style={iconStyle} sx={{ color: 'primary.main' }} />
            <Typography variant="h5">{i18n.t('account:disconnect')}</Typography>
          </Item>
        </AccountGrid>
      </Grid>
    </Container>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'gainsboro',
  },
}));

const AccountGrid = (props: any): JSX.Element => {
  return (
    <Grid item xs={12} sm={6} height={160} marginTop={2}>
      {props.children}
    </Grid>
  );
};
const iconStyle = {
  width: 60,
  height: 60,
};

export default Account;
