import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2.5),
  borderRadius: 16,
  background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
  boxShadow:
    '0px 10px 25px rgba(0,0,0,0.08), 0px 4px 10px rgba(0,0,0,0.05)',
  [theme.breakpoints.up('sm')]: {
    width: 480,
  },
}));

const PageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100dvh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  background:
    'radial-gradient(circle at top, #e3f2fd 0%, #ffffff 60%)',
}));

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // hard-coded admin credentials
    const ADMIN_EMAIL = 'admin1997@gmail.com';
    const ADMIN_PASS = 'C@d1ng1997';

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      navigate('/admin');
      return;
    }

    // otherwise treat as owner login
    navigate('/team-dashboard');
  };

  return (
    <>
      <CssBaseline />
      <PageContainer>
        <Card>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Owner Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to manage your team
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                type="email"
                required
                fullWidth
                placeholder="your@email.com"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                name="password"
                type="password"
                required
                fullWidth
                placeholder="••••••••"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
              }}
            >
              Sign In
            </Button>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography align="center" variant="body2">
            Don't have an account?{' '}
            <RouterLink to="/register" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
              Register Team
            </RouterLink>
          </Typography>
        </Card>
      </PageContainer>
    </>
  );
}
