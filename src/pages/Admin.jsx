import * as React from 'react';
import { Box, Paper, Typography, Button, AppBar, Toolbar, Chip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { logout, getUserData } from '../services/authService';
import RegisteredPlayers from './RegisteredPlayers';

export default function Admin() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = React.useState('');

  React.useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem('userRole');
    const userData = getUserData();
    
    if (userRole !== 'admin') {
      // Redirect to login if not admin
      navigate('/');
      return;
    }
    
    setAdminEmail(userData?.email || 'Admin');
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f3f8ff,#ffffff)' }}>
      {/* Admin Header */}
      <AppBar 
        position="sticky" 
        elevation={2}
        sx={{ 
          background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              component="img"
              src="/Logo/Logo.jpeg"
              alt="HHPL Logo"
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                objectFit: 'contain',
                borderRadius: 2,
              }}
            />
            <Box>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 900, 
                    color: '#fff',
                    fontSize: { xs: '1.2rem', sm: '1.5rem' }
                  }}
                >
                  Admin Dashboard
                </Typography>
                <Chip 
                  icon={<AdminPanelSettingsIcon />}
                  label="ADMIN" 
                  size="small"
                  sx={{ 
                    bgcolor: '#4caf50', 
                    color: '#fff',
                    fontWeight: 700
                  }} 
                />
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                {adminEmail}
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
              },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 2, sm: 3 }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <RegisteredPlayers />
    </Box>
  );
}

