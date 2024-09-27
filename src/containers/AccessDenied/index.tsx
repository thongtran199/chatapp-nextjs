'use client';

import { Button } from '@/components/Button';
import User from '@/services/user';
import { MehOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AccessDenied() {
  const handleRedirect = () => {
    User.getInstance().logout();
  };

  const t = useTranslations('AccessDeniedPage');

  return (
    <div className="h-screen w-screen bg-[#55A5EF] flex flex-col justify-center items-center">
      <div className="absolute left-9 top-4 flex gap-2">
        <Image src="/images/logo.svg" width={60} height={22} alt="kms-logo" />
      </div>

      <MehOutlined className="text-[200px] !text-white" />
      <p className="text-xl font-bold text-white text-center mt-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {t('title')}
      </p>
      <Button
        onClick={handleRedirect}
        className="bg-[#FF9F00] mt-[50px] rounded-sm text-white border-0"
      >
        {t('buttonLabel')}
      </Button>
    </div>
  );
}
