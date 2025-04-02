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
import { AxiosError } from 'axios';
import { AxiosErrorData } from '../../__generated__/AxiosErrorData';
import { LockReset } from '@mui/icons-material';
import { BuildUrl } from '../../Functions/BuildUrl';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';

const ForgotPassword = (): JSX.Element => {
  const params = new URLSearchParams(window.location.search);
  const emailParam = params.get('email');
  const [email, setEmail] = useState<string>(emailParam ?? '');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isEmailSend, setIsEmailSend] = useState<boolean>(false);
  const theme = useTheme();

  const handleSubmit = async () => {
    setIsFetching(true);

    api.authenticate
      .forgotPassword({ email } as ForgotPasswordCommand)
      .then(() => {
        setIsEmailSend(true);
      })
      .catch((axiosError: AxiosError) => {
        const errors = axiosError?.response?.data as AxiosErrorData;
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
          <LockReset />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('authenticate:forgotPasswordTitle')}
        </Typography>
        {isEmailSend && (
          <Typography component="p" variant="body1">
            {i18n.t('authenticate:sendEmail')}
          </Typography>
        )}
        {!isEmailSend && (
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
              <FormHelperText error>{i18n.t('authenticate:userNotFound')}</FormHelperText>
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
                <Link to={BuildUrl(EnumAppRoutes.SignUp)} style={{ color: theme.palette.primary.main }}>
                  {i18n.t('authenticate:signUp')}
                </Link>
              </Grid>
              <Grid item>
                <Link to={BuildUrl(EnumAppRoutes.SignIn)} style={{ color: theme.palette.primary.main }}>
                  {i18n.t('authenticate:signIn')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
