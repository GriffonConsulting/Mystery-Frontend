import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Checkbox, FormControlLabel, FormHelperText, IconButton, InputAdornment, useTheme } from '@mui/material';
import { useState } from 'react';
import api from '../../__generated__/api';
import i18n from '../../i18n';
import { object, string } from 'yup';
import { SignUpCommand } from '../../__generated__/api-generated';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState<SignUpCommand>({ marketingEmail: false });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const signUpSchema = object({
    email: string().required('emailError').email('emailError'),
    password: string()
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, 'passwordError')
      .required('passwordError'),
  });

  const handleSubmit = async () => {
    setErrors([]);
    if (!(await signUpSchema.isValid(signUp))) {
      await signUpSchema.validate(signUp, { abortEarly: false }).catch(error => setErrors(error.errors));
      return;
    }
    setIsFetching(true);
    api.authenticate
      .signUp(signUp)
      .then(() => navigate('/authenticate/signin'))
      .catch(error => {
        console.error(error.response.data.message.split(';'));
        if (error.response.data) {
          setErrors(error.response.data.message.split(';'));
        }
      })
      .finally(() => setIsFetching(false));
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('signUp')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label={i18n.t('email')}
                name="email"
                autoComplete="email"
                error={errors.some(e => e == 'emailError' || e == 'DuplicateEmail')}
                helperText={errors.some(e => e == 'emailError') && i18n.t('emailError')}
                onChange={event => {
                  setErrors(errors.filter(err => !err.includes('email')));
                  setSignUp(params => ({
                    ...params,
                    email: event.target.value,
                  }));
                }}
              />
              {errors.some(e => e == 'DuplicateEmail') && (
                <FormHelperText error={true}>{i18n.t('DuplicateEmail')}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label={i18n.t('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                onChange={event =>
                  setSignUp(params => ({
                    ...params,
                    password: event.target.value,
                  }))
                }
                error={errors.some(e => e == 'passwordError')}
                helperText={errors.some(e => e == 'passwordError') && i18n.t('passwordError')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={() =>
                    setSignUp(params => ({
                      ...params,
                      marketingEmail: !signUp.marketingEmail,
                    }))
                  }
                />
              }
              label={<Typography sx={{ fontSize: 14 }}>{i18n.t('marketingEmail')}</Typography>}
            />
          </Grid>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isFetching}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            {i18n.t('signUp')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/authenticate/signin" style={{ color: theme.palette.primary.main }}>
                {i18n.t('signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
