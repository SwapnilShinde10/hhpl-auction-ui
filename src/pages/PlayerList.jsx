import * as React from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import PlayerProfile from '../components/PlayerProfile';
import { useData } from '../context/DataContext';

export default function PlayerList() {
  const [search, setSearch] = React.useState('');
  const [teamFilter, setTeamFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);

  const handleViewProfile = (row) => {
    setSelectedPlayer(row);
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
    setSelectedPlayer(null);
  };

  const { players, teams } = useData();
  const rows = players;

  // Get unique teams from players
  const uniqueTeams = [...new Set(players.map(p => p.team).filter(t => t && t !== '-'))];

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = teamFilter === 'All' || row.team === teamFilter;
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    return matchesSearch && matchesTeam && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Harshail Hornbill Player Auction List
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Team</InputLabel>
            <Select
              value={teamFilter}
              label="Filter by Team"
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <MenuItem value="All">All Teams</MenuItem>
              {uniqueTeams.map((team) => (
                <MenuItem key={team} value={team}>{team}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Search player..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredRows.map((player) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={player.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                height: '480px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                {/* Avatar and Name */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                  <Avatar
                    src={player.photo}
                    alt={player.name}
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'rgba(255,255,255,0.3)',
                      fontSize: 32,
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    {!player.photo && player.name.charAt(0)}
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    textAlign="center"
                    sx={{
                      minHeight: '32px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {player.name}
                  </Typography>
                </Box>

                {/* Role and Cricket Icons */}
                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
                  <Chip
                    label={player.role}
                    sx={{
                      bgcolor: '#ff9800',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  />
                  <IconButton size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.2)', p: 0.5 }}>
                    {player.role === 'Batsman' ? (
                      <SportsCricketIcon fontSize="small" />
                    ) : (
                      <SportsBaseballIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>

                {/* Player Details */}
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    flex: 1,
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Typography variant="body2" sx={{ opacity: 0.9, flexShrink: 0 }}>
                      Status:
                    </Typography>
                    <Chip
                      label={player.status}
                      size="small"
                      sx={{
                        bgcolor: player.status === 'Sold' ? '#4caf50' : '#ff9800',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Box mb={1.5}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        lineHeight: 1.4,
                        wordWrap: 'break-word',
                      }}
                    >
                      <Box component="span" sx={{ opacity: 0.9 }}>Sold To: </Box>
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {player.team || '-'}
                      </Box>
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Points:
                    </Typography>
                    <Typography variant="body2" fontWeight={700} fontSize={16}>
                      {player.points}
                    </Typography>
                  </Box>
                </Box>

                {/* View Profile Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleViewProfile(player)}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.25)',
                    color: '#fff',
                    fontWeight: 600,
                    py: 1.2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.35)',
                    },
                  }}
                >
                  VIEW PROFILE
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <PlayerProfile open={profileOpen} onClose={handleCloseProfile} player={selectedPlayer} />
    </Box>
  );
}
