import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useReducer } from 'react';
import DisplayAlert from '../MuiComponents/DisplayAlert';
import ProviderButtons from './ProviderButtons';

const initialState = {
  email: '',
  password: '',
  snackMessage: '',
  snackOpen: false,
  snackCategory: 'info',
};

function reducer(state, action) {
  switch (action.type) {
    case 'changeValue':
      return { ...state, [action.field]: action.value };
    case 'displayMessage':
      return {
        ...state,
        snackMessage: action.value.msg,
        snackOpen: action.value.snackOpen,
        snackCategory: action.value.cat,
      };
    case 'closeAlert':
      return {
        ...state,
        snackMessage: '',
        snackOpen: false,
        snackCategory: 'info',
      };
    case 'resetState':
      return { ...initialState };
    default:
      throw new Error();
  }
}

export default function SignIn({ providers }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(state);

    // use signIn method
    signIn('credentials', {
      redirect: false,
      password: state.password,
      email: state.email,
    });

    // Reset the state
    dispatch({ type: 'resetState' });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <DisplayAlert
          category={state.snackCategory}
          msg={state.snackMessage}
          open={state.snackOpen}
          closeMsg={() => dispatch({ type: 'closeAlert' })}
        />
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => handleSubmit(e)}
          sx={{ mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) =>
              dispatch({
                type: 'changeValue',
                field: 'email',
                value: e.target.value,
              })
            }
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) =>
              dispatch({
                type: 'changeValue',
                field: 'password',
                value: e.target.value,
              })
            }
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink href="#" variant="body2">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <Link href="/signup" passHref>
                <MuiLink variant="body2">
                  Don&apos;t have an account? Sign Up
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained primary button group"
          variant="contained"
        >
          {Object.values(providers)
            .filter((provider) => (provider as any).id !== 'credentials')
            .map((provider) => (
              <ProviderButtons
                id={(provider as any).id}
                name={(provider as any).name}
                key={(provider as any).name}
              />
            ))}
        </ButtonGroup>
      </Box>
    </Container>
  );
}
