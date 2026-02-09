import * as React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, Avatar, Divider } from '@mui/material';

const matchesData = [
  {
    id: 1,
    matchNumber: 'MATCH 1',
    team1: { name: 'BANGLADESH', code: 'BD' },
    team2: { name: 'INDIA', code: 'IN' },
    date: 'FEB 20',
    time: '01:30 PM',
  },
  {
    id: 2,
    matchNumber: 'MATCH 2',
    team1: { name: 'NEW ZEALAND', code: 'NZ' },
    team2: { name: 'INDIA', code: 'IN' },
    date: 'FEB 23',
    time: '01:30 PM',
  },
  {
    id: 3,
    matchNumber: 'MATCH 3',
    team1: { name: 'INDIA', code: 'IN' },
    team2: { name: 'PAKISTAN', code: 'PK' },
    date: 'MAR 01',
    time: '01:30 PM',
  },
];

export default function Matches() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a2342 0%, #1a3a52 50%, #0f2d42 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: 200,
          height: 300,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 200,
          height: 300,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        },
      }}
    >
      {/* Decorative curved elements */}
      <Box
        sx={{
          position: 'absolute',
          left: -50,
          top: '50%',
          width: 300,
          height: 300,
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: -50,
          top: '50%',
          width: 300,
          height: 300,
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            color: '#fff',
            textAlign: 'center',
            mb: 1,
            letterSpacing: 2,
          }}
        >
          UPCOMING MATCHES
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
          }}
        >
          Tournament Schedule
        </Typography>
      </Box>

      {/* Matches Grid */}
      <Box sx={{ px: { xs: 1, sm: 1, md: 1 }, py: 4, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {matchesData.map((match) => (
            <Grid item xs={12} sm={11} md={3.8} key={match.id}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  minHeight: 380,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    border: '1px solid rgba(255,255,255,0.4)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Match Number */}
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'center',
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      mb: 2,
                    }}
                  >
                    {match.matchNumber}
                  </Typography>

                  <Divider sx={{ background: 'rgba(255,255,255,0.1)', mb: 2 }} />

                  {/* Teams vs Section */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      mb: 3,
                      py: 3,
                    }}
                  >
                    {/* Team 1 */}
                    <Box sx={{ textAlign: 'center', flex: '0 1 80px' }}>
                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          mx: 'auto',
                          mb: 1.5,
                          fontSize: 22,
                          fontWeight: 900,
                          color: '#fff',
                          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        {match.team1.code}
                      </Avatar>
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: 12,
                          letterSpacing: 0.5,
                          lineHeight: 1.2,
                          wordBreak: 'break-word',
                        }}
                      >
                        {match.team1.name}
                      </Typography>
                    </Box>

                    {/* VS */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.8)',
                          fontWeight: 900,
                          fontSize: 20,
                          mb: 1,
                        }}
                      >
                        VS
                      </Typography>
                      <Box
                        sx={{
                          width: 2,
                          height: 40,
                          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)',
                          mx: 'auto',
                        }}
                      />
                    </Box>

                    {/* Team 2 */}
                    <Box sx={{ textAlign: 'center', flex: '0 1 80px' }}>
                      <Avatar
                        sx={{
                          width: 70,
                          height: 70,
                          mx: 'auto',
                          mb: 1.5,
                          fontSize: 22,
                          fontWeight: 900,
                          color: '#fff',
                          background: 'linear-gradient(135deg, #ff9800, #ff6b00)',
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        {match.team2.code}
                      </Avatar>
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: 12,
                          letterSpacing: 0.5,
                          lineHeight: 1.2,
                          wordBreak: 'break-word',
                        }}
                      >
                        {match.team2.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ background: 'rgba(255,255,255,0.1)', mb: 2 }} />

                  {/* Date and Time */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: 1,
                      }}
                    >
                      {match.date} - {match.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 4, color: 'rgba(255,255,255,0.4)', position: 'relative', zIndex: 1 }}>
        <Typography variant="body2">Harshail Hornbill Cricket League © 2026</Typography>
      </Box>
    </Box>
  );
}
