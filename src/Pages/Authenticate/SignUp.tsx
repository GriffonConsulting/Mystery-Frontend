import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import api from '../../__generated__/api';
import i18n from '../../i18n';
import { object, string } from 'yup';
import { SignUpCommand } from '../../__generated__/api-generated';

const SignUp = (): JSX.Element => {
  const [signUp, setSignUp] = useState<SignUpCommand>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);

  const signUpSchema = object({
    email: string().required('emailRequired').email(),
    password: string().required('passwordRequired'),
  });

  const handleSubmit = async () => {
    setIsSubmitted(true);
    signUpSchema.validate(signUp, { abortEarly: false }).catch(error => console.log(error.errors));
    if (!signUp?.email || !signUp.password) return;

    setIsFetching(true);
    api.authenticate
      .signUp(signUp)
      .catch(() => setErrors(true))
      .finally(() => setIsFetching(false));
  };
  console.log(signUp);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
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
                label="Email Address"
                name="email"
                autoComplete="email"
                error={isSubmitted && !signUp.email}
                helperText={isSubmitted && !signUp.email && 'errorMessage'}
                onChange={event =>
                  setSignUp(params => ({
                    ...params,
                    email: event.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={event =>
                  setSignUp(params => ({
                    ...params,
                    password: event.target.value,
                  }))
                }
                inputProps={{ pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
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
              <Link href="#" variant="body2">
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
