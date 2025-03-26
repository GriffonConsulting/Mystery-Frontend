import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import api from '../../__generated__/api';
import i18n from '../../i18n';
import { Link } from 'react-router-dom';
import { FormHelperText, useTheme } from '@mui/material';
import { ForgotPasswordCommand } from '../../__generated__/api-generated';
import { AxiosError, AxiosResponse } from 'axios';
import DynamicIcon from '../../components/DynamicIcon';
import { AxiosErrorData } from '../../__generated__/AxiosErrorData';

const ForgotPassword = (): JSX.Element => {
  const params = new URLSearchParams(window.location.search);
  const emailParam = params.get('email');
  console.log(emailParam);
  const [email, setEmail] = useState<string>(emailParam ?? '');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const theme = useTheme();

  const handleSubmit = async () => {
    setIsFetching(true);

    api.authenticate
      .forgotPassword({ email } as ForgotPasswordCommand)
      .then((result: AxiosResponse) => {})
      .catch((error: AxiosError) => {
        const errors = error?.response?.data as AxiosErrorData;
        console.log(errors);
        if (errors) {
          setErrors([errors.message]);
        }
        setIsFetching(false);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <DynamicIcon icon="LockResetIcon" />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('authenticate:forgotPasswordTitle')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18n.t('authenticate:email')}
            name="email"
            value={email}
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
            error={errors.some(e => e == 'userNotFound')}
          />
          {errors.some(e => e == 'userNotFound') && (
            <FormHelperText error>{i18n.t('account:userNotFound')}</FormHelperText>
          )}
          <Button
            type="button"
            fullWidth
            disabled={isFetching}
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {i18n.t('authenticate:send')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/authenticate/signUp" style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:signUp')}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/authenticate/signIn" style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
