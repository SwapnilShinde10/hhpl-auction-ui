import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useData } from '../context/DataContext';

export default function Teams() {
  const { teams, loading } = useData();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Default colors for teams if not provided
  const defaultColors = [
    'linear-gradient(90deg, #ffa500, #ff6b00)',
    'linear-gradient(90deg, #1e88e5, #42a5f5)',
    'linear-gradient(90deg, #d32f2f, #f44336)',
    'linear-gradient(90deg, #7b1fa2, #ba68c8)',
    'linear-gradient(90deg, #f57c00, #ff9800)',
    'linear-gradient(90deg, #c41c3b, #e91670)',
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(180deg,#ffffff,#f7fbff)' }} elevation={4}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>
          All Teams
        </Typography>

        <Grid container spacing={3} sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={team.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  height: '400px',
                  width: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                    transform: 'translateY(-8px)',
                    border: '1px solid #1976d2',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Team Logo */}
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        background: team.color,
                        fontSize: 32,
                        fontWeight: 900,
                        color: '#fff',
                        boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
                        border: '3px solid #fff',
                      }}
                    >
                      {team.logo}
                    </Avatar>
                  </Box>

                  {/* Team Name */}
                  <Box
                    sx={{
                      minHeight: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: '#333',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: 1.3,
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      {team.name}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Remaining Points */}
                  <Box sx={{ mb: 2, flex: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Remaining Points
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 900,
                        background: 'linear-gradient(90deg, #4CAF50, #45a049)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mt: 0.5,
                      }}
                    >
                      ₹{(team.remainingPoints / 1000000).toFixed(2)}M
                    </Typography>
                  </Box>

                  {/* Squad Size */}
                  <Box sx={{ p: 1.5, background: '#e3f2fd', borderRadius: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Squad Size
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: '#1976d2' }}>
                      {team.squadSize} Players
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
