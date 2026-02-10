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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useData } from '../context/DataContext';

export default function CreateMatches() {
  const { teams, addMatch } = useData();
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
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (field) => (event) => {
    setMatchData({ ...matchData, [field]: event.target.value });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (matchData.team1 === matchData.team2) {
      setErrorMessage('Please select two different teams!');
      return;
    }

    if (!matchData.team1 || !matchData.team2) {
      setErrorMessage('Please select both teams!');
      return;
    }

    // Get team names
    const team1 = teams.find((t) => t.id === matchData.team1);
    const team2 = teams.find((t) => t.id === matchData.team2);

    // Add match to context
    addMatch({
      matchNumber: matchData.matchNumber,
      group: matchData.group,
      team1Id: matchData.team1,
      team1Name: team1.name,
      team2Id: matchData.team2,
      team2Name: team2.name,
      venue: matchData.venue,
      location: matchData.location,
      date: matchData.date,
      time: matchData.time,
    });

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
              startIcon={<AddIcon />}
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
              Schedule Match
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
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={900}>
                {teams.find((t) => t.id === matchData.team1)?.name || 'Team 1'}
              </Typography>
              <Typography variant="caption">
                ({teams.find((t) => t.id === matchData.team1)?.logo || 'T1'})
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight={900} sx={{ mx: 3 }}>
              VS
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={900}>
                {teams.find((t) => t.id === matchData.team2)?.name || 'Team 2'}
              </Typography>
              <Typography variant="caption">
                ({teams.find((t) => t.id === matchData.team2)?.logo || 'T2'})
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
