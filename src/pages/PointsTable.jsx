import * as React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useData } from '../context/DataContext';

export default function PointsTable() {
  const { teams, matches } = useData();

  // Calculate team statistics
  const teamStats = teams.map((team) => {
    const teamMatches = matches.filter(
      (match) => 
        (match.team1?.id === team.id || match.team1Id === team.id) || 
        (match.team2?.id === team.id || match.team2Id === team.id)
    );

    const completedMatches = teamMatches.filter((match) => match.status === 'completed');
    const matchesPlayed = completedMatches.length;
    const wins = completedMatches.filter((match) => match.winner === team.id).length;
    const losses = matchesPlayed - wins;
    const points = wins * 2;

    // Get last 5 matches
    const last5 = completedMatches
      .slice(-5)
      .reverse()
      .map((match) => ({
        isWin: match.winner === team.id,
        matchId: match.id,
      }));

    return {
      ...team,
      matchesPlayed,
      wins,
      losses,
      points,
      last5,
      nrr: '+0.000', // Placeholder for Net Run Rate
    };
  });

  // Sort by points (descending), then by wins
  const sortedTeams = teamStats.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.wins - a.wins;
  });

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 4 }, py: 3 }}>
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          background: 'linear-gradient(180deg,#ffffff,#f7fbff)',
          overflow: 'hidden',
        }}
        elevation={4}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <EmojiEventsIcon sx={{ fontSize: 32, color: '#ffd700' }} />
          <Typography variant="h5" fontWeight={900} sx={{ color: '#1976d2' }}>
            Points Table
          </Typography>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: '#1976d2',
                  '& th': {
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: 2,
                  },
                }}
              >
                <TableCell sx={{ width: 60 }}>#</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="center" sx={{ width: { xs: 50, sm: 70 } }}>
                  M
                </TableCell>
                <TableCell align="center" sx={{ width: { xs: 50, sm: 70 } }}>
                  W
                </TableCell>
                <TableCell align="center" sx={{ width: { xs: 50, sm: 70 } }}>
                  L
                </TableCell>
                <TableCell align="center" sx={{ width: { xs: 70, sm: 90 } }}>
                  NRR
                </TableCell>
                <TableCell align="center" sx={{ width: { xs: 60, sm: 80 } }}>
                  <strong>Pts</strong>
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 180, display: { xs: 'none', md: 'table-cell' } }}>
                  Last 5
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTeams.map((team, index) => (
                <TableRow
                  key={team.id}
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: 'rgba(25, 118, 210, 0.05)' },
                    '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.1)' },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell>
                    <Chip
                      label={index + 1}
                      size="small"
                      sx={{
                        fontWeight: 900,
                        bgcolor: '#e0e0e0',
                        color: '#666',
                        width: 35,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={team.logo || undefined}
                        sx={{
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          bgcolor: team.logo ? 'transparent' : '#1976d2',
                          fontWeight: 900,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          border: '2px solid #e0e0e0',
                        }}
                      >
                        {!team.logo && team.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}
                      >
                        {team.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {team.matchesPlayed}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {team.wins}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {team.losses}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        color: team.nrr.startsWith('+') ? '#4caf50' : '#f44336',
                      }}
                    >
                      {team.nrr}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={team.points}
                      sx={{
                        fontWeight: 900,
                        bgcolor: '#4caf50',
                        color: '#fff',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        minWidth: { xs: 40, sm: 50 },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      {team.last5.length > 0 ? (
                        team.last5.map((result, idx) =>
                          result.isWin ? (
                            <CheckCircleIcon
                              key={`${result.matchId}-${idx}`}
                              sx={{ fontSize: 24, color: '#4caf50' }}
                            />
                          ) : (
                            <CancelIcon
                              key={`${result.matchId}-${idx}`}
                              sx={{ fontSize: 24, color: '#f44336' }}
                            />
                          )
                        )
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          -
                        </Typography>
                      )}
                      {/* Fill remaining slots with placeholders */}
                      {Array(5 - team.last5.length)
                        .fill(null)
                        .map((_, idx) => (
                          <Box
                            key={`empty-${idx}`}
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              border: '2px dashed #e0e0e0',
                            }}
                          />
                        ))}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {sortedTeams.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="body1" color="text.secondary">
              No matches completed yet. Start declaring match results to see the points table!
            </Typography>
          </Box>
        )}

        {/* Legend */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: 'rgba(25, 118, 210, 0.05)',
            borderRadius: 2,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>
            Legend:
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" fontWeight={600}>
                M - Matches Played
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" fontWeight={600}>
                W - Wins
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" fontWeight={600}>
                L - Losses
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" fontWeight={600}>
                NRR - Net Run Rate
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" fontWeight={600}>
                Pts - Points (2 per win)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon sx={{ fontSize: 18, color: '#4caf50' }} />
              <Typography variant="caption" fontWeight={600}>
                Win
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CancelIcon sx={{ fontSize: 18, color: '#f44336' }} />
              <Typography variant="caption" fontWeight={600}>
                Loss
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
