import React from 'react';
import SignIn from './Pages/Authenticate/SignIn';
import { Typography } from '@mui/material';
import SignUp from './Pages/Authenticate/SignUp';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Griffon Consulting{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function App() {
  return (
    <div>
      <header>
      </header>
      <SignUp />
      <SignIn />
      
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}

export default App;
