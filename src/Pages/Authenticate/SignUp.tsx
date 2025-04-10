import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Checkbox, FormControlLabel, FormHelperText, IconButton, InputAdornment, useTheme } from '@mui/material';
import { useState } from 'react';
import i18n from '../../i18n';
import { object, string } from 'yup';
import { SignUpCommand } from '../../__generated__/api-generated';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';

import { AxiosError } from 'axios';
import { AxiosErrorData } from '../../__generated__/AxiosErrorData';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { BuildUrl } from '../../Functions/BuildUrl';
import { useAuth } from '../../Hooks/useAuth';

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const [signUpCommand, setSignUpCommand] = useState<SignUpCommand>({
    email: '',
    marketingEmail: false,
  } as SignUpCommand);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const { signUp } = useAuth();

  const signUpSchema = object({
    email: string().required('emailError').email('emailError'),
    password: string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, 'passwordError')
      .required('passwordError'),
  });

  const handleSubmit = async () => {
    setErrors([]);
    if (!(await signUpSchema.isValid(signUp))) {
      await signUpSchema.validate(signUp, { abortEarly: false }).catch(error => setErrors(error.errors));
      return;
    }
    setIsFetching(true);
    signUp(signUpCommand)
      .then(() => {
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
          {i18n.t('authenticate:signUp')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                id="email"
                label={i18n.t('authenticate:email')}
                name="email"
                autoComplete="email"
                error={errors.some(e => e == 'emailError' || e == 'userDuplicate')}
                helperText={errors.some(e => e == 'emailError') && i18n.t('authenticate:emailError')}
                onChange={event => {
                  setErrors(errors.filter(err => !err.includes('email') && !err.includes('user')));
                  setSignUpCommand(params => ({
                    ...params,
                    email: event.target.value,
                  }));
                }}
              />
              {errors.some(e => e == 'userDuplicate') && (
                <FormHelperText error>{i18n.t('authenticate:userDuplicate')}</FormHelperText>
              )}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                fullWidth
                name="password"
                label={i18n.t('authenticate:password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                onChange={event =>
                  setSignUpCommand(params => ({
                    ...params,
                    password: event.target.value,
                  }))
                }
                error={errors.some(e => e == 'passwordError')}
                helperText={errors.some(e => e == 'passwordError') && i18n.t('authenticate:passwordError')}
                slotProps={{
                  htmlInput: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={() =>
                    setSignUpCommand(params => ({
                      ...params,
                      marketingEmail: !signUpCommand.marketingEmail,
                    }))
                  }
                />
              }
              label={<Typography sx={{ fontSize: 14 }}>{i18n.t('authenticate:marketingEmail')}</Typography>}
            />
          </Grid>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isFetching}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {i18n.t('authenticate:signUp')}
          </Button>
          <Grid container>
            <Grid size="grow">
              <Link
                to={`/authenticate/forgotpassword?email=${signUpCommand.email}`}
                style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:forgotPassword')}
              </Link>
            </Grid>
            <Grid>
              <Link to={BuildUrl(EnumAppRoutes.SignIn)} rel="nofollow" style={{ color: theme.palette.primary.main }}>
                {i18n.t('authenticate:signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
