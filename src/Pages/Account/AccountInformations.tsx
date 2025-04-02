import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Avatar, Typography, TextField, Button, Grid, Breadcrumbs, useTheme, MenuItem } from '@mui/material';
import { AxiosResponse } from 'axios';
import api from '../../__generated__/api';
import { GetUserDto, UpdateUserCommand } from '../../__generated__/api-generated';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AccountCircle } from '@mui/icons-material';
import { object, string } from 'yup';
import { BuildUrl } from '../../Functions/BuildUrl';
import { EnumAppRoutes } from '../../Enum/EnumAppRoutes';

const AccountInformations = (): JSX.Element => {
  const [user, setUser] = useState<UpdateUserCommand>();
  const { i18n } = useTranslation();
  const [errors, setErrors] = useState<string[]>([]);
  const countriesObject = i18n.services.resourceStore.data[i18n.language].countries;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const countriesArray = Object.entries(countriesObject).map(([value, label]) => ({
    value,
    label,
  }));
  const theme = useTheme();
  console.log(errors);

  const updateUserSchema = object({
    newEmail: string().required('emailError').email('emailError'),
    password: string().matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, {
      message: 'passwordError',
      excludeEmptyString: true,
    }),
    firstname: string().max(35, 'firstnameError'),
    lastname: string().max(35, 'lastnameError'),
    address: string().max(255, 'addressError'),
    complementaryAddress: string().max(255, 'complementaryAddressError'),
    postalCode: string().max(12, 'postalCodeError'),
    city: string().max(255, 'cityError'),
    country: string().max(2, 'countryError'),
  });

  React.useEffect(() => {
    api.user.getUser().then((result: AxiosResponse) => {
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
  };

  return (
    <Container>
      <Breadcrumbs separator="-" aria-label="breadcrumb" style={{ marginTop: 16 }}>
        <Link to={BuildUrl(EnumAppRoutes.Account)} style={{ color: theme.palette.primary.main }}>
          {i18n.t('account:account')}
        </Link>
        <Typography color={theme.palette.primary.main}>{i18n.t('account:informations')}</Typography>
      </Breadcrumbs>
      {user && (
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
                // onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="firstname"
                label={i18n.t('account:firstname')}
                id="firstname"
                value={user?.firstname}
                // onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="lastname"
                label={i18n.t('account:lastname')}
                id="lastname"
                value={user?.lastname}
                // onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="address"
                label={i18n.t('account:address')}
                id="address"
                value={user?.address}
                // onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="complementaryAddress"
                label={i18n.t('account:complementaryAddress')}
                id="complementaryAddress"
                value={user?.complementaryAddress}
                // onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="postalCode"
                label={i18n.t('account:postalCode')}
                id="postalCode"
                value={user?.postalCode}
                // onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="city"
                label={i18n.t('account:city')}
                id="city"
                value={user?.city}
                // onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="country"
                select
                label={i18n.t('account:country')}
                id="country"
                value={user?.country}
                // onChange={e => setPassword(e.target.value)}
              >
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
    </Container>
  );
};

export default AccountInformations;
