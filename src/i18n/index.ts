import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from './fr/common.json';
import account from './fr/account.json';
import authenticate from './fr/authenticate.json';
import product from './fr/product.json';
import countries from './fr/countries.json';
import order from './fr/order.json';
import moment from 'moment';

const resources = {
  fr: {
    common,
    account,
    authenticate,
    product,
    countries,
    order,
  },
};

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      defaultNS: 'common',
      interpolation: {
        format: function (value, format) {
          if (format === 'uppercase') return value.toUpperCase();
          if (value instanceof Date) return moment(value).format(format);
          return value;
        },
        // React already does escaping
        escapeValue: false,
      },
      lng: 'fr', // 'en' | 'es'
      resources: resources,
      react: {
        bindI18n: 'languageChanged loaded',
        bindI18nStore: 'added removed',
        nsMode: 'default',
      },
    },
    err => {
      if (err) console.error(err);
    },
  );

export default i18next;
