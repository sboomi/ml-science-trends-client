import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const Nav = () => {
  const [session, loading] = useSession();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {!session && (
          <li>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
            <br />
            Don't have an account yet? <Link href="/signup">Sign up now!</Link>
          </li>
        )}
        {session && (
          <li>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
