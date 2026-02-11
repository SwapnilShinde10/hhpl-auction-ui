import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useData } from '../context/DataContext';

export default function DeclareResults() {
  const { matches, updateMatchResult, deleteMatch } = useData();
  const [selectedMatch, setSelectedMatch] = React.useState(null);
  const [resultDialog, setResultDialog] = React.useState(false);
  const [resultData, setResultData] = React.useState({
    winner: '',
    team1Score: '',
    team2Score: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleOpenResultDialog = (match) => {
    setSelectedMatch(match);
    setResultData({
      winner: match.winner || '',
      team1Score: match.team1Score || '',
      team2Score: match.team2Score || '',
    });
    setResultDialog(true);
  };

  const handleCloseResultDialog = () => {
    setResultDialog(false);
    setSelectedMatch(null);
    setResultData({ winner: '', team1Score: '', team2Score: '' });
    setErrorMessage('');
  };

  const handleDeclareResult = async () => {
    if (!resultData.winner) {
      setErrorMessage('Please select a winner!');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await updateMatchResult(
        selectedMatch.id,
        resultData.winner,
        resultData.team1Score,
        resultData.team2Score
      );

      setSuccessMessage(`Result declared for ${selectedMatch.matchNumber}! 🎉`);
      handleCloseResultDialog();

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error declaring result:', error);
      setErrorMessage(error.message || 'Failed to declare result. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMatch = (matchId) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      deleteMatch(matchId);
    }
  };

  const scheduledMatches = matches.filter((m) => m.status === 'scheduled');
  const completedMatches = matches.filter((m) => m.status === 'completed');

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1976d2' }}>
        Match Results Management
      </Typography>

      {successMessage && (
        <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {/* Scheduled Matches */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PendingIcon sx={{ mr: 1, color: '#ff9800' }} />
          <Typography variant="h6" fontWeight={700}>
            Scheduled Matches ({scheduledMatches.length})
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {scheduledMatches.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">No scheduled matches available.</Alert>
            </Grid>
          ) : (
            scheduledMatches.map((match) => (
              <Grid item xs={12} md={6} lg={4} key={match.id}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 2,
                    border: '2px solid #e0e0e0',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip label={match.group} color="warning" size="small" sx={{ fontWeight: 700 }} />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteMatch(match.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="body2" fontWeight={700} color="text.secondary" sx={{ mb: 2 }}>
                      {match.matchNumber}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        mb: 2,
                        py: 2,
                        bgcolor: '#f5f5f5',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body1" fontWeight={700} sx={{ flex: 1, textAlign: 'center' }}>
                        {match.team1?.name || match.team1Name}
                      </Typography>
                      <Typography variant="h6" fontWeight={900} color="primary" sx={{ px: 2 }}>
                        VS
                      </Typography>
                      <Typography variant="body1" fontWeight={700} sx={{ flex: 1, textAlign: 'center' }}>
                        {match.team2?.name || match.team2Name}
                      </Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      📍 {match.venue}, {match.location}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                      📅 {new Date(match.date).toLocaleDateString()} • ⏰ {match.time}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<EmojiEventsIcon />}
                      onClick={() => handleOpenResultDialog(match)}
                      sx={{
                        background: 'linear-gradient(90deg, #4caf50, #66bb6a)',
                        fontWeight: 700,
                      }}
                    >
                      Declare Result
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Completed Matches */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CheckCircleIcon sx={{ mr: 1, color: '#4caf50' }} />
          <Typography variant="h6" fontWeight={700}>
            Completed Matches ({completedMatches.length})
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {completedMatches.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">No completed matches yet.</Alert>
            </Grid>
          ) : (
            completedMatches.map((match) => (
              <Grid item xs={12} md={6} lg={4} key={match.id}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 2,
                    border: '2px solid #4caf50',
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
                  <Chip
                    icon={<EmojiEventsIcon />}
                    label="COMPLETED"
                    color="success"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: 16,
                      fontWeight: 700,
                      zIndex: 10,
                    }}
                  />

                  <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip label={match.group} color="primary" size="small" sx={{ fontWeight: 700 }} />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteMatch(match.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="body2" fontWeight={700} color="text.secondary" sx={{ mb: 2 }}>
                      {match.matchNumber}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 1,
                          px: 2,
                          bgcolor: match.winner === (match.team1?.id || match.team1Id) ? '#e8f5e9' : '#f5f5f5',
                          borderRadius: 1,
                          mb: 1,
                          border: match.winner === (match.team1?.id || match.team1Id) ? '2px solid #4caf50' : '1px solid #e0e0e0',
                        }}
                      >
                        <Typography variant="body1" fontWeight={700}>
                          {match.team1?.name || match.team1Name}
                          {match.winner === (match.team1?.id || match.team1Id) && (
                            <EmojiEventsIcon sx={{ ml: 1, fontSize: 18, color: '#ffd700' }} />
                          )}
                        </Typography>
                        <Typography variant="h6" fontWeight={900}>
                          {match.team1Score || '-'}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 1,
                          px: 2,
                          bgcolor: match.winner === (match.team2?.id || match.team2Id) ? '#e8f5e9' : '#f5f5f5',
                          borderRadius: 1,
                          border: match.winner === (match.team2?.id || match.team2Id) ? '2px solid #4caf50' : '1px solid #e0e0e0',
                        }}
                      >
                        <Typography variant="body1" fontWeight={700}>
                          {match.team2?.name || match.team2Name}
                          {match.winner === (match.team2?.id || match.team2Id) && (
                            <EmojiEventsIcon sx={{ ml: 1, fontSize: 18, color: '#ffd700' }} />
                          )}
                        </Typography>
                        <Typography variant="h6" fontWeight={900}>
                          {match.team2Score || '-'}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      📍 {match.venue}, {match.location}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      📅 {new Date(match.date).toLocaleDateString()} • ⏰ {match.time}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Declare Result Dialog */}
      <Dialog open={resultDialog} onClose={handleCloseResultDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#1976d2', color: '#fff', fontWeight: 700 }}>
          Declare Match Result
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {selectedMatch && (
            <>
              <Typography variant="body1" fontWeight={700} sx={{ mb: 2, textAlign: 'center' }}>
                {selectedMatch.matchNumber} - {selectedMatch.group}
              </Typography>

              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  mb: 3,
                  p: 2,
                  bgcolor: '#f5f5f5',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {selectedMatch.team1?.name || selectedMatch.team1Name}
                </Typography>
                <Typography variant="h6" fontWeight={900} color="primary">
                  VS
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {selectedMatch.team2?.name || selectedMatch.team2Name}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={`${selectedMatch.team1?.name || selectedMatch.team1Name} Score`}
                    placeholder="120/5"
                    value={resultData.team1Score}
                    onChange={(e) => setResultData({ ...resultData, team1Score: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={`${selectedMatch.team2?.name || selectedMatch.team2Name} Score`}
                    placeholder="115/8"
                    value={resultData.team2Score}
                    onChange={(e) => setResultData({ ...resultData, team2Score: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Match Winner</InputLabel>
                    <Select
                      value={resultData.winner}
                      onChange={(e) => setResultData({ ...resultData, winner: e.target.value })}
                      label="Match Winner"
                    >
                      <MenuItem value={selectedMatch.team1?.id || selectedMatch.team1Id}>
                        {selectedMatch.team1?.name || selectedMatch.team1Name}
                      </MenuItem>
                      <MenuItem value={selectedMatch.team2?.id || selectedMatch.team2Id}>
                        {selectedMatch.team2?.name || selectedMatch.team2Name}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseResultDialog} variant="outlined" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeclareResult}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EmojiEventsIcon />}
            sx={{
              background: 'linear-gradient(90deg, #4caf50, #66bb6a)',
              fontWeight: 700,
            }}
          >
            {loading ? 'Declaring...' : 'Declare Winner'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
