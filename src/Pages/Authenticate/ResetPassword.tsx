import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import api from '../../__generated__/api';
import i18n from '../../i18n';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
import { ResetPasswordCommand } from '../../__generated__/api-generated';
import { AxiosError, AxiosResponse } from 'axios';
import { AxiosErrorData } from '../../__generated__/AxiosErrorData';
import { Visibility, VisibilityOff, LockReset } from '@mui/icons-material';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';

const resetPasswordSchema = object({
  password: string()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, 'passwordError')
    .required('passwordError'),
});

const ResetPassword = (): JSX.Element => {
  const params = new URLSearchParams(window.location.search);
  const [resetPasswordCommand, setResetPasswordCommand] = useState<ResetPasswordCommand>({
    email: params.get('email') ?? '',
    token: params.get('token') ?? '',
    password: '',
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrors([]);
    if (!(await resetPasswordSchema.isValid(resetPasswordCommand))) {
      await resetPasswordSchema
        .validate(resetPasswordCommand, { abortEarly: false })
        .catch(error => setErrors(error.errors));
      return;
    }
    setIsFetching(true);

    api.authenticate
      .resetPassword(resetPasswordCommand)
      .then(() => {
        navigate('/authenticate/signin');
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
          {i18n.t('authenticate:resetPasswordTitle')}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            name="password"
            label={i18n.t('authenticate:newPassword')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            onChange={event =>
              setResetPasswordCommand(params => ({
                ...params,
                password: event.target.value,
              }))
            }
            error={errors.some(e => e == 'passwordError')}
            helperText={errors.some(e => e == 'passwordError') && i18n.t('authenticate:passwordError')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.some(e => e == 'InvalidToken') && (
            <FormHelperText error>{i18n.t('authenticate:invalidToken')}</FormHelperText>
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
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
