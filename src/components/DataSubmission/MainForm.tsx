import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useState } from 'react';

const MainForm = () => {
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();

    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data
    console.log('The message to send is', msg);

    // Reset fields
    setMsg('');

    router.push('/results');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h6" gutterBottom>
        Your request
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="data"
            name="data"
            label="Your request"
            fullWidth
            autoComplete="data-test"
            variant="standard"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={(e) => handleSubmit(e)}
          sx={{ mt: 3, ml: 1 }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default MainForm;
