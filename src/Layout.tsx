import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';
import * as React from 'react';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';

export interface LandingPageProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}


const LandingPage = (props: LandingPageProps) => {
  const defaultTheme = createTheme();
  
  return (    
    <ThemeProvider theme={defaultTheme}>
      <AppAppBar  />
       <Box>
        
        <>{props.children}</>
        <Footer />
      </Box> 
    </ThemeProvider>
  );
}

export default LandingPage;