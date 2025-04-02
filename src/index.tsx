import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Helmet } from 'react-helmet';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Helmet>
      <title>{i18n.t('appTitle')}</title>
      <meta name="description" content={i18n.t('appDescription')} />
    </Helmet>
    <App />
  </React.StrictMode>,
);
