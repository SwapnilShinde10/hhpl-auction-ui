import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useData } from '../context/DataContext';

export default function TeamDashboard() {
  const navigate = useNavigate();

  const { teams, players } = useData();
  const teamData = teams.find((t) => t.id === 1) || teams[0];
  // show players belonging to this team for demo
  const playingXI = players.filter((p) => p.team === teamData.name);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a2342 0%, #1a3a52 50%, #0f2d42 100%)' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ px: { xs: 2, sm: 4 }, py: 3, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff', mb: 0.5 }}>
              {teamData.tournament}
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              Playing XI Selection
            </Typography>
          </Box>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ color: '#fff', borderColor: '#fff', border: '1px solid #fff' }}
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ background: 'rgba(255,255,255,0.1)' }} />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Left Side - Team Info */}
        <Box sx={{ flex: '0 0 300px' }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
            }}
            elevation={0}
          >
            {/* Team Logo */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'linear-gradient(90deg, #ffa500, #ff6b00)',
                  fontSize: 48,
                  fontWeight: 900,
                  boxShadow: '0 8px 24px rgba(255, 165, 0, 0.3)',
                }}
              >
                MW
              </Avatar>
            </Box>

            {/* Team Name */}
            <Typography variant="h6" sx={{ fontWeight: 800, textAlign: 'center', mb: 1, fontSize: 20 }}>
              {teamData.name}
            </Typography>

            <Divider sx={{ background: 'rgba(255,255,255,0.2)', my: 2 }} />

            {/* Remaining Points */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="rgba(255,255,255,0.7)">
                Remaining Points
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #4CAF50, #45a049)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mt: 0.5,
                }}
              >
                ₹{(teamData.remainingBudget || 0).toLocaleString('en-IN')}
              </Typography>
            </Box>

            {/* Squad Size */}
            <Box sx={{ mt: 3, p: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <Typography variant="caption" color="rgba(255,255,255,0.7)">
                Squad Size
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>
                {playingXI.length} Players
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Right Side - Playing XI */}
        <Box sx={{ flex: 1 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            elevation={0}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#fff',
                mb: 3,
                textAlign: 'center',
                fontSize: 18,
                letterSpacing: 1.5,
              }}
            >
              PLAYING XI
            </Typography>

            {/* Player Grid */}
            {/* Render players in explicit rows of 4 */}
            {Array.from({ length: Math.ceil(playingXI.length / 4) }).map((_, rowIndex) => {
              const start = rowIndex * 4;
              const rowPlayers = playingXI.slice(start, start + 4);
              return (
                <Grid container spacing={2} justifyContent="center" key={`row-${rowIndex}`} sx={{ mb: 1 }}>
                  {rowPlayers.map((player) => (
                    <Grid item xs={12} sm={6} md={3} key={player.id}>
                      <Card
                        sx={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          minHeight: 160,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          '&:hover': {
                            border: '1px solid rgba(255,255,255,0.4)',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                          },
                        }}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 2 }}>
                          <Avatar
                            sx={{
                              width: 70,
                              height: 70,
                              mx: 'auto',
                              mb: 1,
                              bgcolor: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                              fontSize: 24,
                              fontWeight: 700,
                              border: '2px solid rgba(255,255,255,0.3)',
                            }}
                          >
                            {player.name.split(' ')[0][0]}
                          </Avatar>

                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: '#fff',
                              fontSize: 13,
                              mb: 1,
                              wordBreak: 'break-word',
                            }}
                          >
                            {player.name}
                          </Typography>

                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{
                                background: 'linear-gradient(90deg, #ffa500, #ff6b00)',
                                color: '#fff',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontWeight: 700,
                                display: 'inline-block',
                              }}
                            >
                              {player.role}
                            </Typography>

                            {/* Role-specific icons */}
                            {player.role?.includes('All') || player.role?.includes('All-Rounder') ? (
                              <>
                                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                  <SportsCricketIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                  <SportsBaseballIcon fontSize="small" />
                                </IconButton>
                              </>
                            ) : player.role?.includes('Wicket') || player.role?.includes('Wicket-Keeper') ? (
                              <>
                                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                  <SportsCricketIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                  <HowToRegIcon fontSize="small" />
                                </IconButton>
                              </>
                            ) : player.role?.includes('Batsman') ? (
                              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <SportsCricketIcon fontSize="small" />
                              </IconButton>
                            ) : player.role?.includes('Bowler') ? (
                              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <SportsBaseballIcon fontSize="small" />
                              </IconButton>
                            ) : (
                              <>
                                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                  <SportsCricketIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                  <SportsBaseballIcon fontSize="small" />
                                </IconButton>
                              </>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              );
            })}
          </Paper>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 4, color: 'rgba(255,255,255,0.5)' }}>
        <Typography variant="body2">Harshail Hornbill Cricket League © 2026</Typography>
      </Box>
    </Box>
  );
}
