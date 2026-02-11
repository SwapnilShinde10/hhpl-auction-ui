import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useData } from '../context/DataContext';
import { createMatch } from '../services/matchService';

export default function CreateMatches() {
  const { teams, fetchMatches } = useData();
  const [matchData, setMatchData] = React.useState({
    matchNumber: '',
    group: 'GROUP A',
    team1: '',
    team2: '',
    venue: 'Harshail Cricket Ground',
    location: '',
    date: '',
    time: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // Helper function to generate team code from name
  const getTeamCode = (teamName) => {
    if (!teamName) return '';
    const words = teamName.split(' ');
    if (words.length > 1) {
      return words.map(w => w.charAt(0)).join('').toUpperCase().substring(0, 3);
    }
    return teamName.substring(0, 3).toUpperCase();
  };

  // Default colors for teams
  const defaultColors = [
    '#1976d2', '#d32f2f', '#388e3c', '#7b1fa2', 
    '#f57c00', '#0288d1', '#c2185b', '#5d4037'
  ];

  // Format date for display (e.g., "FEB 20, 2026")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).toUpperCase();
  };

  // Format time for display (e.g., "01:30 PM")
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  const handleChange = (field) => (event) => {
    setMatchData({ ...matchData, [field]: event.target.value });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Validation
      if (matchData.team1 === matchData.team2) {
        setErrorMessage('Please select two different teams!');
        setLoading(false);
        return;
      }

      if (!matchData.team1 || !matchData.team2) {
        setErrorMessage('Please select both teams!');
        setLoading(false);
        return;
      }

      // Get team details
      const team1 = teams.find((t) => t.id === matchData.team1);
      const team2 = teams.find((t) => t.id === matchData.team2);

      // Create match object
      const newMatch = {
        matchNumber: matchData.matchNumber,
        group: matchData.group,
        team1: {
          id: team1.id,
          name: team1.name,
          code: getTeamCode(team1.name),
          color: defaultColors[teams.indexOf(team1) % defaultColors.length],
          logo: team1.logo
        },
        team2: {
          id: team2.id,
          name: team2.name,
          code: getTeamCode(team2.name),
          color: defaultColors[teams.indexOf(team2) % defaultColors.length],
          logo: team2.logo
        },
        venue: matchData.venue,
        location: matchData.location,
        date: formatDate(matchData.date),
        time: formatTime(matchData.time),
        status: 'scheduled'
      };

      // Call API to create match
      await createMatch(newMatch);
      
      // Refresh matches list
      await fetchMatches();

      setSuccessMessage(`Match ${matchData.matchNumber} scheduled successfully!`);
      
      // Reset form
      setTimeout(() => {
        setMatchData({
          matchNumber: '',
          group: 'GROUP A',
          team1: '',
          team2: '',
          venue: 'Harshail Cricket Ground',
          location: '',
          date: '',
          time: '',
        });
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error creating match:', error);
      setErrorMessage(error.message || 'Failed to create match. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const availableTeam1Options = teams.filter((team) => team.id !== matchData.team2);
  const availableTeam2Options = teams.filter((team) => team.id !== matchData.team1);

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: '#1976d2' }}>
        Schedule New Match
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Match Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Match Number"
              placeholder="MATCH 1"
              value={matchData.matchNumber}
              onChange={handleChange('matchNumber')}
            />
          </Grid>

          {/* Group */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Group</InputLabel>
              <Select value={matchData.group} onChange={handleChange('group')} label="Group">
                <MenuItem value="GROUP A">GROUP A</MenuItem>
                <MenuItem value="GROUP B">GROUP B</MenuItem>
                <MenuItem value="GROUP C">GROUP C</MenuItem>
                <MenuItem value="GROUP D">GROUP D</MenuItem>
                <MenuItem value="SEMI FINAL">SEMI FINAL</MenuItem>
                <MenuItem value="FINAL">FINAL</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Team 1 */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Team 1</InputLabel>
              <Select value={matchData.team1} onChange={handleChange('team1')} label="Team 1">
                <MenuItem value="">
                  <em>Select Team 1</em>
                </MenuItem>
                {availableTeam1Options.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Team 2 */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Team 2</InputLabel>
              <Select value={matchData.team2} onChange={handleChange('team2')} label="Team 2">
                <MenuItem value="">
                  <em>Select Team 2</em>
                </MenuItem>
                {availableTeam2Options.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Venue */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Venue"
              placeholder="Harshail Cricket Ground"
              value={matchData.venue}
              onChange={handleChange('venue')}
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Location"
              placeholder="Mumbai"
              value={matchData.location}
              onChange={handleChange('location')}
            />
          </Grid>

          {/* Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Date"
              type="date"
              value={matchData.date}
              onChange={handleChange('date')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Time"
              type="time"
              value={matchData.time}
              onChange={handleChange('time')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
              sx={{
                py: 1.5,
                background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                fontWeight: 700,
                fontSize: '1rem',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1565c0, #1976d2)',
                },
              }}
            >
              {loading ? 'Scheduling...' : 'Schedule Match'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Match Preview */}
      {matchData.team1 && matchData.team2 && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', mb: 2, textAlign: 'center', fontWeight: 700 }}>
            Match Preview
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              color: '#fff',
            }}
          >
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={teams.find((t) => t.id === matchData.team1)?.logo}
                sx={{
                  width: 60,
                  height: 60,
                  mb: 1,
                  border: '2px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              />
              <Typography variant="h5" fontWeight={900}>
                {teams.find((t) => t.id === matchData.team1)?.name || 'Team 1'}
              </Typography>
              <Typography variant="caption">
                ({getTeamCode(teams.find((t) => t.id === matchData.team1)?.name) || 'T1'})
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={900} sx={{ mx: 3 }}>
              VS
            </Typography>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={teams.find((t) => t.id === matchData.team2)?.logo}
                sx={{
                  width: 60,
                  height: 60,
                  mb: 1,
                  border: '2px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              />
              <Typography variant="h5" fontWeight={900}>
                {teams.find((t) => t.id === matchData.team2)?.name || 'Team 2'}
              </Typography>
              <Typography variant="caption">
                ({getTeamCode(teams.find((t) => t.id === matchData.team2)?.name) || 'T2'})
              </Typography>
            </Box>
          </Box>
          {matchData.date && matchData.time && (
            <Typography sx={{ color: '#fff', mt: 2, textAlign: 'center', fontSize: '0.9rem' }}>
              {matchData.date} • {matchData.time} • {matchData.location}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}
