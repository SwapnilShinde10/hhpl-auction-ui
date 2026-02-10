import * as React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';

const matchesData = [
  {
    id: 1,
    matchNumber: 'MATCH 1',
    group: 'GROUP A',
    team1: { name: 'Mumbai Warriors', code: 'MW', color: '#1976d2' },
    team2: { name: 'Delhi Kings', code: 'DK', color: '#d32f2f' },
    venue: 'Harshail Cricket Ground',
    location: 'Mumbai',
    date: 'FEB 20, 2026',
    time: '01:30 PM',
  },
  {
    id: 2,
    matchNumber: 'MATCH 2',
    group: 'GROUP B',
    team1: { name: 'Bangalore Strikers', code: 'BS', color: '#388e3c' },
    team2: { name: 'Kolkata Knights', code: 'KK', color: '#7b1fa2' },
    venue: 'Harshail Cricket Ground',
    location: 'Bangalore',
    date: 'FEB 23, 2026',
    time: '01:30 PM',
  },
  {
    id: 3,
    matchNumber: 'MATCH 3',
    group: 'GROUP A',
    team1: { name: 'Chennai Titans', code: 'CT', color: '#f57c00' },
    team2: { name: 'Rajasthan Royals', code: 'RR', color: '#0288d1' },
    venue: 'Harshail Cricket Ground',
    location: 'Chennai',
    date: 'MAR 01, 2026',
    time: '01:30 PM',
  },
];

export default function Matches() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 1, sm: 2 },
      }}
    >
      {/* Decorative diagonal stripes background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255, 165, 0, 0.03) 35px,
            rgba(255, 165, 0, 0.03) 70px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4, md: 6 }, position: 'relative', zIndex: 1, px: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: '#fff',
            letterSpacing: 1,
            mb: 1,
            textShadow: '0 0 20px rgba(255,255,255,0.3)',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          HARSHAIL CRICKET LEAGUE 2026
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#ffa726',
            fontWeight: 600,
            letterSpacing: 2,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          UPCOMING MATCHES
        </Typography>
      </Box>

      {/* Matches Grid */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', position: 'relative', zIndex: 2 }}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {matchesData.map((match) => (
            <Grid item xs={12} sm={6} lg={4} key={match.id}>
              <Card
                sx={{
                  position: 'relative',
                  borderRadius: { xs: 3, sm: 4 },
                  overflow: 'visible',
                  background: '#fff',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
                  },
                }}
              >
                {/* Group Badge */}
                <Chip
                  label={match.group}
                  sx={{
                    position: 'absolute',
                    top: { xs: -12, sm: -15 },
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: '#ff9800',
                    color: '#000',
                    fontWeight: 900,
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    px: { xs: 1.5, sm: 2 },
                    height: { xs: 28, sm: 32 },
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
                    zIndex: 10,
                  }}
                />

                <CardContent sx={{ p: 0 }}>
                  {/* Match Title */}
                  <Box
                    sx={{
                      bgcolor: '#f5f5f5',
                      py: { xs: 2, sm: 3 },
                      pt: { xs: 3, sm: 4 },
                      textAlign: 'center',
                      borderBottom: '3px solid #e0e0e0',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        color: '#1a237e',
                        letterSpacing: 1,
                        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                      }}
                    >
                      HARSHAIL CRICKET LEAGUE
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontWeight: 600,
                        mt: 0.5,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      }}
                    >
                      {match.matchNumber}
                    </Typography>
                  </Box>

                  {/* Teams Section */}
                  <Box sx={{ px: { xs: 1.5, sm: 2, md: 3 }, py: { xs: 2, sm: 3, md: 4 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: { xs: 0.5, sm: 1, md: 2 },
                      }}
                    >
                      {/* Team 1 */}
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Box
                          sx={{
                            bgcolor: match.team1.color,
                            borderRadius: { xs: 1.5, sm: 2 },
                            p: { xs: 1.5, sm: 2, md: 3 },
                            mb: { xs: 1, sm: 1.5 },
                            minHeight: { xs: 70, sm: 85, md: 100 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 4px 12px ${match.team1.color}40`,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                              fontWeight: 900,
                              color: '#fff',
                              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            }}
                          >
                            {match.team1.code}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: '#1a237e',
                            borderRadius: { xs: 1, sm: 1.5 },
                            py: { xs: 0.8, sm: 1, md: 1.2 },
                            px: { xs: 0.5, sm: 0.8, md: 1 },
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                              letterSpacing: 0.5,
                            }}
                          >
                            {match.team1.name}
                          </Typography>
                        </Box>
                      </Box>

                      {/* VS Badge */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: '#ff9800',
                            width: { xs: 35, sm: 45, md: 50 },
                            height: { xs: 35, sm: 45, md: 50 },
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                              fontWeight: 900,
                              color: '#000',
                            }}
                          >
                            VS
                          </Typography>
                        </Box>
                      </Box>

                      {/* Team 2 */}
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Box
                          sx={{
                            bgcolor: match.team2.color,
                            borderRadius: { xs: 1.5, sm: 2 },
                            p: { xs: 1.5, sm: 2, md: 3 },
                            mb: { xs: 1, sm: 1.5 },
                            minHeight: { xs: 70, sm: 85, md: 100 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 4px 12px ${match.team2.color}40`,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                              fontWeight: 900,
                              color: '#fff',
                              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            }}
                          >
                            {match.team2.code}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            bgcolor: '#1a237e',
                            borderRadius: { xs: 1, sm: 1.5 },
                            py: { xs: 0.8, sm: 1, md: 1.2 },
                            px: { xs: 0.5, sm: 0.8, md: 1 },
                          }}
                        >
                          <Typography
                            sx={{
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                              letterSpacing: 0.5,
                            }}
                          >
                            {match.team2.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Venue and Time */}
                  <Box
                    sx={{
                      background: 'linear-gradient(90deg, #e91e63 0%, #d81b60 100%)',
                      py: { xs: 1.5, sm: 2 },
                      px: { xs: 1.5, sm: 2, md: 3 },
                      textAlign: 'center',
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
                        mb: 0.3,
                      }}
                    >
                      {match.venue}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                        fontWeight: 600,
                      }}
                    >
                      {match.location} • {match.date} • {match.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
