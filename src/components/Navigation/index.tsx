import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from 'next-intl/navigation';
import { forIn } from 'lodash';
import routing from '@/config/routing';

export const locales = ['vi', 'en'] as const;
export const localePrefix = 'always'; // Default

export const pathnames: { [key: string]: string } = {} satisfies Pathnames<
  typeof locales
>;

forIn(routing, (value) => {
  const path = value.path;
  pathnames[path] = path;
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames,
  });
