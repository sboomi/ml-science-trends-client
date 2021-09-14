import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from 'next/link';
import React, { useReducer } from 'react';
import { signUpStyles as useStyles } from './../MuiComponents/classes';
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
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
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
        inscriptionDate: Date.now(),
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
      <div className={classes.paper}>
        <DisplayAlert
          category={state.snackCategory}
          msg={state.snackMessage}
          open={state.snackOpen}
          closeMsg={() => dispatch({ type: 'closeAlert' })}
        />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
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
            color="primary"
            className={classes.submit}
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
        </form>
      </div>
    </Container>
  );
}
