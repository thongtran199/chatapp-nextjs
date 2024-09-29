import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import User from '@/services/user';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  // const accessToken = User.getInstance().getAccessToken();

  // if (accessToken) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  // }

  redirect('/');
}
