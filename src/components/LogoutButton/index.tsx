'use client';

import User from '@/services/user';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from '../Navigation';

export const LogoutButton = () => {
  const t = useTranslations('General');
  const router = useRouter();
  const onLogout = () => {
    User.getInstance().logout();
    router.push('/');
  };

  return (
    <p onClick={onLogout} className="flex gap-2">
      <LogoutOutlined />
      {t('logout')}
    </p>
  );
};
