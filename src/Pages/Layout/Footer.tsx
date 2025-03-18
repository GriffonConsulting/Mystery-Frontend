import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import i18n from '../../i18n';

function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {`Copyright © Griffon Consulting ${new Date().getFullYear()}.`}
    </Typography>
  );
}

export default function Footer(): JSX.Element {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
        }}>
        <div>
          <Link color="text.secondary" href="#">
            {i18n.t('privacyPolicy')}
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            {i18n.t('tos')}
          </Link>
          <Copyright />
        </div>
      </Box>
    </Container>
  );
}
