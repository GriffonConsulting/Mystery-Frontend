import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './fr/translation.json';
import moment from 'moment';

const resources = {
  fr: {
    translation: translation,
  },
};

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
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
