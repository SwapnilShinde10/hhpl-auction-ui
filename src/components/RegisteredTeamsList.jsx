import * as React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useData } from '../context/DataContext';

export default function RegisteredTeamsList() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { teams, players, deleteTeam } = useData();

  const handleDeleteTeam = (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      deleteTeam(id);
    }
  };

  // Calculate player count for each team
  const teamsWithPlayerCount = teams.map((team) => ({
    ...team,
    playerCount: players.filter((player) => player.team === team.name).length,
  }));

  const filteredTeams = teamsWithPlayerCount.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.logo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Team Name', flex: 1, minWidth: 200 },
    { field: 'logo', headerName: 'Logo', width: 100 },
    { field: 'playerCount', headerName: 'Player Count', width: 130 },
    { field: 'squadSize', headerName: 'Squad Size', width: 130 },
    { 
      field: 'remainingPoints', 
      headerName: 'Remaining Points', 
      width: 150,
      valueFormatter: (params) => {
        return new Intl.NumberFormat('en-IN').format(params);
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          size="small"
          onClick={() => handleDeleteTeam(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by team name or logo..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredTeams}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
