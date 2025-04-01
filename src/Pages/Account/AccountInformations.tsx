import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Avatar, Typography, TextField, Button, Grid, Breadcrumbs, useTheme } from '@mui/material';
import i18n from '../../i18n';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AxiosResponse } from 'axios';
import api from '../../__generated__/api';
import { GetUserDto } from '../../__generated__/api-generated';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AccountInformations = (): JSX.Element => {
  const [user, setUser] = useState<GetUserDto>();
  const theme = useTheme();

  React.useEffect(() => {
    api.user.getUser().then((result: AxiosResponse) => setUser(result.data.result));
  }, []);

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={'/account'} style={{ color: theme.palette.primary.main }}>
          {i18n.t('account:account')}
        </Link>
        <Typography color={theme.palette.primary.main}>{i18n.t('account:informations')}</Typography>
      </Breadcrumbs>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18n.t('account:account')}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={i18n.t('account:email')}
              name="email"
              autoComplete="email"
              autoFocus
              value={user}
              // onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={i18n.t('account:password')}
              type="password"
              id="password"
              autoComplete="current-password"
              // onChange={e => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="firstname"
              label={i18n.t('account:firstname')}
              type="firstname"
              id="firstname"
              autoComplete="current-password"
              value={user?.firstname}
              // onChange={e => setPassword(e.target.value)}
            />

            <Button
              type="button"
              fullWidth
              // disabled={isFetching}
              // onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {i18n.t('modify')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default AccountInformations;
