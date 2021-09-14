import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
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
