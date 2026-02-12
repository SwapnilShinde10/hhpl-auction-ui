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
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ownerLogin, storeAuthData } from '../services/authService';

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Hardcoded admin credentials
    const ADMIN_ACCOUNTS = [
      { email: 'webhosting2212@gmail.com', password: 'C@d1ng1997' },
      { email: 'harshailhornbill@gmail.com', password: 'C@d1ng1997' },
      { email: 'admin1997@gmail.com', password: 'C@d1ng1997' }
    ];

    try {
      // Check if credentials match any admin account
      const isAdmin = ADMIN_ACCOUNTS.some(
        admin => admin.email === email && admin.password === password
      );

      if (isAdmin) {
        // Admin login - store admin role and redirect to admin page
        storeAuthData('admin-token-' + Date.now(), 'admin', { email, role: 'admin' });
        setSuccess('Admin login successful!');
        setTimeout(() => {
          window.location.href = '/admin'; // Redirect to admin dashboard
        }, 1000);
      } else {
        // Owner login via API
        const response = await ownerLogin(email, password);
        storeAuthData(response.token, 'owner', response.owner);
        setSuccess('Login successful!');
        setTimeout(() => navigate('/team-dashboard'), 1000);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <PageContainer>
        <Card>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" onClose={() => setSuccess('')}>
                {success}
              </Alert>
            )}

            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                type="email"
                required
                fullWidth
                placeholder="your@email.com"
                disabled={loading}
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
                disabled={loading}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
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
