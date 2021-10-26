import { useSession } from 'next-auth/react';
import AccessDenied from '../components/auth/AccessDenied';
import MainForm from '../components/DataSubmission/MainForm';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  return (
    <div>
      <h1>Check out our latest articles !</h1>
      <MainForm />
    </div>
  );
}
