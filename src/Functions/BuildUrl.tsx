import { EnumAppRoutes } from '../Enum/EnumAppRoutes';
import i18n from '../i18n';

export function BuildUrl(pathname: EnumAppRoutes, params?: object) {
  let path = `${i18n.language}/${pathname}`;
  if (params) {
    for (let [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value);
    }
  }
  return path;
}
