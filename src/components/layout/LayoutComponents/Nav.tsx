import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from './../../MuiComponents/Link';

const Nav = () => {
  const { data: session } = useSession();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            MLTrends
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              Home
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/about"
              sx={{ my: 1, mx: 1.5 }}
            >
              About
            </Link>
          </nav>
          {!session && (
            <>
              <Link href="/signup" passHref>
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Sign up
                </Button>
              </Link>
              <Button
                onClick={() => signIn()}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Sign in
              </Button>
            </>
          )}
          {session && (
            <>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Signed in as {session.user.email}
              </Typography>
              <Button
                onClick={() => signOut()}
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Sign out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
