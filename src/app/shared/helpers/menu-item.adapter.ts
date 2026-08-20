import { Title } from '@angular/platform-browser';
import reactiveRoutes from '../../reactive/reactive.routes';
import { MenuItem } from '../interfaces/menu-item.interfaces';
import { authRoutes } from '../../auth/auth.routes';
import { countryRoutes } from '../../country/country.routes';

export const reactiveMenu: MenuItem[] = reactiveRoutes?.[0]?.children
  ? reactiveRoutes[0].children
      .filter((item) => item?.path && item?.path !== '**')
      .map((item) => ({
        title: String(item?.title) ?? '',
        route: `reactive/${item?.path}`,
      }))
  : [];

export const authMenu: MenuItem[] = authRoutes?.[0]?.children
  ? authRoutes[0].children
      .filter((item) => item?.path && item?.path !== '**')
      .map((item) => ({
        title: String(item?.title) ?? '',
        route: `auth/${item?.path}`,
      }))
  : [];

export const countryMenu: MenuItem[] = countryRoutes
  ? countryRoutes
      .filter((item) => item?.path !== '**')
      .map((item) => ({
        title: String(item?.title) ?? '',
        route: `country/${item?.path}`,
      }))
  : [];
