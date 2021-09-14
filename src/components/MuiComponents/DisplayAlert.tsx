import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
import { DisplayAlertProps } from '../../typing/types';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DisplayAlert = ({ category, msg, open, closeMsg }: DisplayAlertProps) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    closeMsg();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={category}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default DisplayAlert;
