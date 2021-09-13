import { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';
import React from 'react';
import SignIn from '../components/auth/SignIn';

const signin = ({ providers }) => {
  return (
    <div>
      <SignIn providers={providers} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default signin;
