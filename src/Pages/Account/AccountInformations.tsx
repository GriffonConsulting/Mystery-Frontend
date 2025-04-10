import * as React from 'react';
import Container from '@mui/material/Container';
import {
  Box,
  Typography,
  TextField,
  Button,
  Breadcrumbs,
  useTheme,
  MenuItem,
  FormHelperText,
  Alert,
  Snackbar,
} from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../../__generated__/api';
import { GetUserDto, UpdateUserCommand } from '../../__generated__/api-generated';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AccountCircle } from '@mui/icons-material';
import { object, string } from 'yup';
import { BuildUrl } from '../../Functions/BuildUrl';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';
import { AxiosErrorData } from '../../__generated__/AxiosErrorData';

const AccountInformations = (): JSX.Element => {
  const [user, setUser] = useState<UpdateUserCommand>({} as UpdateUserCommand);
  const { i18n } = useTranslation();
  const [errors, setErrors] = useState<string[]>([]);
  const countriesObject = i18n.services.resourceStore.data[i18n.language].countries;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const countriesArray = Object.entries(countriesObject).map(([value, label]) => ({
    value,
    label,
  }));
  const theme = useTheme();

  const updateUserSchema = object({
    newEmail: string().required('emailError').email('emailError'),
    password: string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, {
      message: 'passwordError',
      excludeEmptyString: true,
    }),
  });

  React.useEffect(() => {
    api.user.getUser({ withCredentials: true }).then((result: AxiosResponse) => {
      const user = result.data.result as GetUserDto;

      setUser({
        newEmail: user.email,
        password: '',
        firstname: user.firstname ?? '',
        lastname: user.lastname ?? '',
        address: user.address ?? '',
        complementaryAddress: user.complementaryAddress ?? '',
        postalCode: user.postalCode ?? '',
        city: user.city ?? '',
        country: user.country ?? 'FR',
        marketingEmail: user.marketingEmail,
      } as UpdateUserCommand);
    });
  }, []);

  const handleSubmit = async () => {
    setErrors([]);
    if (!(await updateUserSchema.isValid(user))) {
      await updateUserSchema.validate(user, { abortEarly: false }).catch(error => setErrors(error.errors));
      return;
    }
    setIsFetching(true);

    api.user
      .updateUser(user, { withCredentials: true })
      .then((result: AxiosResponse) => {
        setIsUpdateSuccess(true);
      })
      .catch((axiosError: AxiosError) => {
        const errors = axiosError?.response?.data as AxiosErrorData;
        if (errors) {
          setErrors([errors.message]);
        }
      })
      .finally(() => setIsFetching(false));
  };

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={BuildUrl(EnumAppRoutes.Account)} style={{ color: theme.palette.primary.main }}>
          {i18n.t('account:account')}
        </Link>
        <Typography color={theme.palette.primary.main}>{i18n.t('account:informations')}</Typography>
      </Breadcrumbs>
      {user.newEmail && (
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <AccountCircle style={{ fontSize: 60 }} sx={{ color: 'primary.main' }} />
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
                value={user?.newEmail}
                error={errors.some(e => e == 'emailError')}
                helperText={errors.some(e => e == 'emailError') && i18n.t('account:emailError')}
                onChange={event => {
                  setErrors(errors.filter(err => !err.includes('emailError')));
                  setUser(params => ({
                    ...params,
                    newEmail: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label={i18n.t('account:newPassword')}
                type="password"
                id="password"
                value={user?.password}
                error={errors.some(e => e == 'passwordError') || errors.some(e => e == 'passwordValidationError')}
                helperText={errors.some(e => e == 'passwordError') && i18n.t('authenticate:passwordError')}
                onChange={event => {
                  setErrors(errors.filter(err => !err.includes('password')));
                  setUser(params => ({
                    ...params,
                    password: event.target.value,
                  }));
                }}
              />
              {errors.some(e => e == 'passwordValidationError') && (
                <FormHelperText error>{i18n.t('authenticate:passwordValidationError')}</FormHelperText>
              )}
              <TextField
                margin="normal"
                fullWidth
                name="firstname"
                label={i18n.t('account:firstname')}
                id="firstname"
                value={user?.firstname}
                slotProps={{ htmlInput: { maxLength: 35 } }}
                onChange={event => {
                  setUser(params => ({
                    ...params,
                    firstname: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="lastname"
                label={i18n.t('account:lastname')}
                id="lastname"
                value={user?.lastname}
                slotProps={{ htmlInput: { maxLength: 35 } }}
                onChange={event => {
                  setUser(params => ({
                    ...params,
                    lastname: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="address"
                label={i18n.t('account:address')}
                id="address"
                value={user?.address}
                slotProps={{ htmlInput: { maxLength: 255 } }}
                onChange={event => {
                  setUser(params => ({
                    ...params,
                    address: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="complementaryAddress"
                label={i18n.t('account:complementaryAddress')}
                id="complementaryAddress"
                value={user?.complementaryAddress}
                slotProps={{ htmlInput: { maxLength: 255 } }}
                onChange={event => {
                  setUser(params => ({
                    ...params,
                    complementaryAddress: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="postalCode"
                label={i18n.t('account:postalCode')}
                id="postalCode"
                value={user?.postalCode}
                slotProps={{ htmlInput: { maxLength: 12 } }}
                onChange={event => {
                  setUser(params => ({
                    ...params,
                    postalCode: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="city"
                label={i18n.t('account:city')}
                id="city"
                value={user?.city}
                slotProps={{ htmlInput: { maxLength: 255 } }}
                onChange={event => {
                  setUser(params => ({
                    ...params,
                    city: event.target.value,
                  }));
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="country"
                select
                label={i18n.t('account:country')}
                id="country"
                value={user?.country}
                onChange={event => {
                  setUser(params => ({
                    ...params,
                    country: event.target.value,
                  }));
                }}>
                {countriesArray.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="button"
                fullWidth
                disabled={isFetching}
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                {i18n.t('update')}
              </Button>
            </Box>
          </Box>
        </Container>
      )}
      <Snackbar open={isUpdateSuccess} autoHideDuration={3000} onClose={() => setIsUpdateSuccess(false)}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {i18n.t('account:updateSuccess')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AccountInformations;
