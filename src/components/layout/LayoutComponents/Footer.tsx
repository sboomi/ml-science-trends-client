import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { CopyrightProps } from '../../../typing/types';

function Copyright({ websiteName = 'MLScienceTrends' }: CopyrightProps) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        {websiteName}
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box mt={5}>
      <Copyright />
    </Box>
  );
};

export default Footer;
