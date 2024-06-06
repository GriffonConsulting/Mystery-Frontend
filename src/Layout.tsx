import { ThemeProvider } from '@emotion/react';
import { Box, PaletteMode, createTheme } from '@mui/material';
import * as React from 'react';
import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';

export interface LandingPageProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}

const LandingPage = (props: LandingPageProps) => {
  const defaultTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)', paddingTop: 80 }}>
        <AppAppBar />
        <Box>
          <>
            {props.children}
            <Footer />
          </>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
