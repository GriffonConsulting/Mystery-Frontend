import * as React from 'react';
import { Container, Grid, Paper, styled, Typography } from '@mui/material';
import i18n from '../../i18n';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Casino from '@mui/icons-material/Casino';
import Description from '@mui/icons-material/Description';
import NoAccounts from '@mui/icons-material/NoAccounts';
import { useNavigate } from 'react-router-dom';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import { useAuth } from '../../Hooks/useAuth';

const Account = (): JSX.Element => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <Container style={{ marginTop: 32 }}>
      <Grid container spacing={{ xs: 2 }}>
        <AccountGrid>
          <Item onClick={() => navigate(BuildUrl(EnumAppRoutes.AccountInformations))}>
            <AccountCircle style={iconStyle} sx={{ color: 'primary.main' }} />
            <Typography variant="h5">{i18n.t('account:informations')}</Typography>
          </Item>
        </AccountGrid>
        <AccountGrid>
          <Item onClick={() => navigate(BuildUrl(EnumAppRoutes.AccountProducts))}>
            <Casino style={iconStyle} sx={{ color: 'primary.main' }} />
            <Typography variant="h5">{i18n.t('account:games')}</Typography>
          </Item>
        </AccountGrid>
        <AccountGrid>
          <Item onClick={() => navigate(BuildUrl(EnumAppRoutes.AccountInvoices))}>
            <Description style={iconStyle} sx={{ color: 'primary.main' }} />
            <Typography variant="h5">{i18n.t('account:invoicesTitle')}</Typography>
          </Item>
        </AccountGrid>
        <AccountGrid>
          <Item onClick={signOut}>
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
    <Grid size={{ xs: 12, sm: 6 }} height={160} marginTop={2}>
      {props.children}
    </Grid>
  );
};
const iconStyle = {
  width: 60,
  height: 60,
};

export default Account;
