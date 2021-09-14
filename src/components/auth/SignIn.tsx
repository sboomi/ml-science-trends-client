import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MuiLink from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useReducer } from 'react';
import DisplayAlert from '../MuiComponents/DisplayAlert';
import { signInStyles as useStyles } from './../MuiComponents/classes';
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
  const classes = useStyles();
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
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
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
            color="primary"
            className={classes.submit}
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
        </form>
      </div>

      <div className={classes.paper}>
        <ButtonGroup
          orientation="vertical"
          color="default"
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
      </div>
    </Container>
  );
}
