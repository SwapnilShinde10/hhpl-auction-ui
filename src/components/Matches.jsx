import * as React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, Avatar, Chip, CircularProgress } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useData } from '../context/DataContext';

export default function Matches() {
  const { matches, loading } = useData();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)' }}>
        <CircularProgress sx={{ color: '#ffa726' }} />
      </Box>
    );
  }

  const scheduledCount = matches.filter(m => m.status === 'scheduled').length;
  const completedCount = matches.filter(m => m.status === 'completed').length;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 1, sm: 2 },
        '@keyframes bounce': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(-50%)',
          },
          '50%': {
            transform: 'translateY(-10px) translateX(-50%)',
          },
        },
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
            mb: 1,
          }}
        >
          MATCHES
        </Typography>
        {matches.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
            <Chip
              label={`${scheduledCount} Scheduled`}
              sx={{
                bgcolor: 'rgba(255, 152, 0, 0.2)',
                color: '#ffa726',
                fontWeight: 700,
                border: '1px solid #ffa726',
              }}
            />
            <Chip
              label={`${completedCount} Completed`}
              sx={{
                bgcolor: 'rgba(76, 175, 80, 0.2)',
                color: '#4caf50',
                fontWeight: 700,
                border: '1px solid #4caf50',
              }}
            />
          </Box>
        )}
      </Box>

      {/* Matches Grid */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', position: 'relative', zIndex: 2 }}>
        {matches.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
              No matches scheduled yet
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Matches will appear here once they are created
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
            {matches.map((match) => (
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
                    bgcolor: match.status === 'completed' ? '#4caf50' : '#ff9800',
                    color: match.status === 'completed' ? '#fff' : '#000',
                    fontWeight: 900,
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    px: { xs: 1.5, sm: 2 },
                    height: { xs: 28, sm: 32 },
                    borderRadius: 2,
                    boxShadow: match.status === 'completed' 
                      ? '0 4px 12px rgba(76, 175, 80, 0.4)' 
                      : '0 4px 12px rgba(255, 152, 0, 0.4)',
                    zIndex: 10,
                  }}
                />

                {/* Completed Badge */}
                {match.status === 'completed' && (
                  <Chip
                    icon={<EmojiEventsIcon />}
                    label="COMPLETED"
                    sx={{
                      position: 'absolute',
                      top: { xs: -12, sm: -15 },
                      right: 16,
                      bgcolor: '#ffd700',
                      color: '#000',
                      fontWeight: 900,
                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                      height: { xs: 28, sm: 32 },
                      boxShadow: '0 4px 12px rgba(255, 215, 0, 0.5)',
                      zIndex: 10,
                    }}
                  />
                )}

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
                      <Box sx={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                        {/* Winner Trophy for Team 1 */}
                        {match.status === 'completed' && match.winner === match.team1?.id && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -20,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              zIndex: 20,
                            }}
                          >
                            <CelebrationIcon sx={{ fontSize: 40, color: '#ffd700', animation: 'bounce 1s infinite' }} />
                          </Box>
                        )}
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
                            flexDirection: 'column',
                            boxShadow: match.status === 'completed' && match.winner === match.team1?.id
                              ? `0 8px 24px ${match.team1.color}80`
                              : `0 4px 12px ${match.team1.color}40`,
                            border: match.status === 'completed' && match.winner === match.team1?.id
                              ? '3px solid #ffd700'
                              : 'none',
                            position: 'relative',
                          }}
                        >
                          {/* Team Logo */}
                          {match.team1.logo && (
                            <Avatar
                              src={match.team1.logo}
                              sx={{
                                width: { xs: 40, sm: 50, md: 60 },
                                height: { xs: 40, sm: 50, md: 60 },
                                mb: 1,
                                border: '2px solid #fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              }}
                            />
                          )}
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
                          {/* Show Score for Completed Matches */}
                          {match.status === 'completed' && match.team1Score && (
                            <Typography
                              sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                fontWeight: 700,
                                color: '#fff',
                                mt: 0.5,
                                opacity: 0.95,
                              }}
                            >
                              {match.team1Score}
                            </Typography>
                          )}
                          {/* Winner Badge */}
                          {match.status === 'completed' && match.winner === match.team1?.id && (
                            <EmojiEventsIcon 
                              sx={{ 
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                fontSize: { xs: 24, sm: 28, md: 32 },
                                color: '#ffd700',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                              }} 
                            />
                          )}
                        </Box>
                        <Box
                          sx={{
                            bgcolor: match.status === 'completed' && match.winner === match.team1?.id ? '#ffd700' : '#1a237e',
                            borderRadius: { xs: 1, sm: 1.5 },
                            py: { xs: 0.8, sm: 1, md: 1.2 },
                            px: { xs: 0.5, sm: 0.8, md: 1 },
                          }}
                        >
                          <Typography
                            sx={{
                              color: match.status === 'completed' && match.winner === match.team1?.id ? '#000' : '#fff',
                              fontWeight: 700,
                              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                              letterSpacing: 0.5,
                            }}
                          >
                            {match.team1.name}
                            {match.status === 'completed' && match.winner === match.team1?.id && ' 🏆'}
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
                            bgcolor: match.status === 'completed' ? '#4caf50' : '#ff9800',
                            width: { xs: 35, sm: 45, md: 50 },
                            height: { xs: 35, sm: 45, md: 50 },
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: match.status === 'completed'
                              ? '0 4px 12px rgba(76, 175, 80, 0.4)'
                              : '0 4px 12px rgba(255, 152, 0, 0.4)',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                              fontWeight: 900,
                              color: match.status === 'completed' ? '#fff' : '#000',
                            }}
                          >
                            VS
                          </Typography>
                        </Box>
                      </Box>

                      {/* Team 2 */}
                      <Box sx={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                        {/* Winner Trophy for Team 2 */}
                        {match.status === 'completed' && match.winner === match.team2?.id && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -20,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              zIndex: 20,
                            }}
                          >
                            <CelebrationIcon sx={{ fontSize: 40, color: '#ffd700', animation: 'bounce 1s infinite' }} />
                          </Box>
                        )}
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
                            flexDirection: 'column',
                            boxShadow: match.status === 'completed' && match.winner === match.team2?.id
                              ? `0 8px 24px ${match.team2.color}80`
                              : `0 4px 12px ${match.team2.color}40`,
                            border: match.status === 'completed' && match.winner === match.team2?.id
                              ? '3px solid #ffd700'
                              : 'none',
                            position: 'relative',
                          }}
                        >
                          {/* Team Logo */}
                          {match.team2.logo && (
                            <Avatar
                              src={match.team2.logo}
                              sx={{
                                width: { xs: 40, sm: 50, md: 60 },
                                height: { xs: 40, sm: 50, md: 60 },
                                mb: 1,
                                border: '2px solid #fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              }}
                            />
                          )}
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
                          {/* Show Score for Completed Matches */}
                          {match.status === 'completed' && match.team2Score && (
                            <Typography
                              sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                                fontWeight: 700,
                                color: '#fff',
                                mt: 0.5,
                                opacity: 0.95,
                              }}
                            >
                              {match.team2Score}
                            </Typography>
                          )}
                          {/* Winner Badge */}
                          {match.status === 'completed' && match.winner === match.team2?.id && (
                            <EmojiEventsIcon 
                              sx={{ 
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                fontSize: { xs: 24, sm: 28, md: 32 },
                                color: '#ffd700',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                              }} 
                            />
                          )}
                        </Box>
                        <Box
                          sx={{
                            bgcolor: match.status === 'completed' && match.winner === match.team2?.id ? '#ffd700' : '#1a237e',
                            borderRadius: { xs: 1, sm: 1.5 },
                            py: { xs: 0.8, sm: 1, md: 1.2 },
                            px: { xs: 0.5, sm: 0.8, md: 1 },
                          }}
                        >
                          <Typography
                            sx={{
                              color: match.status === 'completed' && match.winner === match.team2?.id ? '#000' : '#fff',
                              fontWeight: 700,
                              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                              letterSpacing: 0.5,
                            }}
                          >
                            {match.team2.name}
                            {match.status === 'completed' && match.winner === match.team2?.id && ' 🏆'}
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
        )}
      </Box>
    </Box>
  );
}
