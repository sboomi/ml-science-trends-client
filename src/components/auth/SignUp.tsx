import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React, { useReducer } from 'react';
import DisplayAlert from './../MuiComponents/DisplayAlert';

const initialState = {
  userName: '',
  password: '',
  repeatPassword: '',
  email: '',
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

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log(state);

    // Set validators
    if (state.userName.length > 20) {
      dispatch({
        type: 'displayMessage',
        value: {
          msg: 'username must be under 20 chrs',
          snackOpen: true,
          cat: 'error',
        },
      });
    }

    if (state.password.length < 6) {
      dispatch({
        type: 'displayMessage',
        value: {
          msg: 'password must be above 6 chrs',
          snackOpen: true,
          cat: 'error',
        },
      });
    }

    if (state.password !== state.repeatPassword) {
      dispatch({
        type: 'displayMessage',
        value: {
          msg: "passwords don't match",
          snackOpen: true,
          cat: 'error',
        },
      });
    }

    // Post the name, email and pw to the server
    fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({
        name: state.userName,
        email: state.email,
        password: state.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          dispatch({
            type: 'displayMessage',
            value: {
              msg: JSON.stringify(res.json()),
              snackOpen: true,
              cat: 'error',
            },
          });
        }
        dispatch({
          type: 'displayMessage',
          value: {
            msg: 'Succesfully registered!',
            snackOpen: true,
            cat: 'success',
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: 'displayMessage',
          value: {
            msg: JSON.stringify(err.json()),
            snackOpen: true,
            cat: 'error',
          },
        });
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => handleSubmit(e)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                onChange={(e) =>
                  dispatch({
                    type: 'changeValue',
                    field: 'userName',
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  dispatch({
                    type: 'changeValue',
                    field: 'password',
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                id="repeatPassword"
                onChange={(e) =>
                  dispatch({
                    type: 'changeValue',
                    field: 'repeatPassword',
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive news and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" passHref>
                <MuiLink variant="body2">
                  Already have an account? Sign in
                </MuiLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
