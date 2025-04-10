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
import ContactSupport from '@mui/icons-material/ContactSupport';
import { object, string } from 'yup';
import { ContactCommand } from '../../__generated__/api-generated';

const Contact = (): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactCommand>({} as ContactCommand);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isMessageSend, setIsMessageSend] = useState<boolean>(false);

  const contactSchema = object({
    email: string().required('emailError').email('emailError'),
    message: string().required('messageError'),
  });

  const handleSubmit = async () => {
    setErrors([]);
    if (!(await contactSchema.isValid(contact))) {
      await contactSchema.validate(contact, { abortEarly: false }).catch(error => setErrors(error.errors));
      return;
    }
    setIsFetching(true);
    api.contact
      .contact(contact)
      .then(() => setIsMessageSend(true))
      .catch(() => setIsFetching(false));
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
          <ContactSupport />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('contact')}
        </Typography>

        {!isMessageSend && (
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
              onChange={event => {
                setErrors(errors.filter(err => !err.includes('email')));
                setContact(params => ({
                  ...params,
                  email: event.target.value,
                }));
              }}
              error={errors.some(e => e == 'emailError')}
              helperText={errors.some(e => e == 'emailError') && i18n.t('emailError')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="message"
              label={i18n.t('message')}
              type="message"
              id="message"
              multiline={true}
              rows={10}
              onChange={event => {
                setErrors(errors.filter(err => !err.includes('message')));
                setContact(params => ({
                  ...params,
                  message: event.target.value,
                }));
              }}
              error={errors.some(e => e == 'messageError')}
              helperText={errors.some(e => e == 'messageError') && i18n.t('messageError')}
            />
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isFetching}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {i18n.t('submit')}
            </Button>
          </Box>
        )}
        {isMessageSend && <Box mt={3}>{i18n.t('messageSend')}</Box>}
      </Box>
    </Container>
  );
};

export default Contact;
