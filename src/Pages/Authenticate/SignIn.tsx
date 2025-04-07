import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import api from '../../__generated__/api';
import i18n from '../../i18n';
import { useCookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormHelperText, useTheme } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { SignInQuery } from '../../__generated__/api-generated';
import { object, string } from 'yup';
import { AxiosErrorData } from '../../__generated__/AxiosErrorData';
import { AccountCircle } from '@mui/icons-material';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';

const SignIn = (): JSX.Element => {
  const [signIn, setSignIn] = useState<SignInQuery>({} as SignInQuery);
  const [errors, setErrors] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [, setCookies] = useCookies(['token']);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const signInSchema = object({
    email: string().required('emailError').email('emailError'),
    password: string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, 'passwordError')
      .required('passwordError'),
  });

  const handleSubmit = async () => {
    setErrors([]);
    if (!(await signInSchema.isValid(signIn))) {
      await signInSchema.validate(signIn, { abortEarly: false }).catch(error => setErrors(error.errors));
      return;
    }
    setIsFetching(true);

    api.authenticate
      .signIn(signIn)
      .then((result: AxiosResponse) => {
        setCookies('token', result.data.result, { sameSite: true, secure: true, path: '/' });
        navigate(location?.state?.from ? location?.state?.from : BuildUrl(EnumAppRoutes.Account));
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
          marginTop: 2,
        }}>
        <AccountCircle style={{ fontSize: 60 }} sx={{ color: 'primary.main' }} />
        <Typography component="h1" variant="h5">
          {i18n.t('authenticate:signIn')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18n.t('authenticate:email')}
            name="email"
            autoComplete="email"
            autoFocus
            error={errors.some(e => e == 'emailError')}
            helperText={errors.some(e => e == 'emailError') && i18n.t('authenticate:emailError')}
            onChange={event => {
              setErrors(errors.filter(err => !err.includes('email')));
              setSignIn(params => ({
                ...params,
                email: event.target.value,
              }));
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={i18n.t('authenticate:password')}
            type="password"
            id="password"
            autoComplete="current-password"
            error={
              errors.some(e => e == 'passwordError') ||
              errors.some(e => e == 'passwordValidationError') ||
              errors.some(e => e == 'userNotFound')
            }
            helperText={errors.some(e => e == 'passwordError') && i18n.t('authenticate:passwordError')}
            onChange={event => {
              setErrors(errors.filter(err => !err.includes('password')));
              setSignIn(params => ({
                ...params,
                password: event.target.value,
              }));
            }}
          />
          {errors.some(e => e == 'passwordValidationError') && (
            <FormHelperText error>{i18n.t('authenticate:passwordValidationError')}</FormHelperText>
          )}
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
            {i18n.t('signIn')}
          </Button>
          <Grid container>
            <Grid size="grow">
              <Link
                to={`/authenticate/forgotpassword?email=${signIn.email}`}
                style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:forgotPassword')}
              </Link>
            </Grid>
            <Grid>
              <Link to={BuildUrl(EnumAppRoutes.SignUp)} style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:signUp')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
