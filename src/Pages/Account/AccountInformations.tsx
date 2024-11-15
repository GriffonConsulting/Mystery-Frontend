import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AccountInformations = (): JSX.Element => {
  return (
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
          {i18n.t('account')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18n.t('email')}
            name="email"
            autoComplete="email"
            autoFocus
            // onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={i18n.t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
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
  );
};

export default AccountInformations;
