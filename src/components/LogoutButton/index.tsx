'use client';

import User from '@/services/user';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';

export const LogoutButton = () => {
  const t = useTranslations('General');

  const onLogout = () => {
    User.getInstance().logout();
  };

  return (
    <p onClick={onLogout} className="flex gap-2">
      <LogoutOutlined />
      {t('logout')}
    </p>
  );
};
