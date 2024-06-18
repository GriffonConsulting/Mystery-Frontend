import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import * as React from 'react';
import Header from './Header';
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
        <Header />
        <main>{props.children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
