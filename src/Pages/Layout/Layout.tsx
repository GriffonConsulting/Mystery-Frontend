import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';
import * as React from 'react';
import AppAppBar from './AppAppBar';
import Footer from './Footer';

export interface LandingPageProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}

const LandingPage = (props: LandingPageProps): JSX.Element => {
  const defaultTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)', paddingTop: 80 }}>
        <AppAppBar />
        <main>{props.children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
