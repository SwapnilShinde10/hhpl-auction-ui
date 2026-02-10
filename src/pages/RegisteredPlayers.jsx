import * as React from 'react';
import { Box, Paper, Typography, Button, TextField, IconButton, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AuctionPlayerProfile from '../components/AuctionPlayerProfile';
import RegisteredTeamsList from '../components/RegisteredTeamsList';
import CreateMatches from '../components/CreateMatches';
import DeclareResults from '../components/DeclareResults';
import { useData } from '../context/DataContext';

export default function RegisteredPlayers() {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentTab, setCurrentTab] = React.useState(0);
  const { players, deletePlayer } = useData();

  const handleViewProfile = (player) => {
    setSelectedPlayer(player);
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
    setSelectedPlayer(null);
  };

  const handleDeletePlayer = (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      deletePlayer(id);
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'team', headerName: 'Team', flex: 1, minWidth: 150 },
    { field: 'points', headerName: 'Points', width: 100 },
    {
      field: 'actions',
      headerName: 'View Profile',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => handleViewProfile(params.row)}
        >
          View
        </Button>
      ),
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
          onClick={() => handleDeletePlayer(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(180deg,#ffffff,#f7fbff)' }} elevation={4}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>
          All Registered Players & Teams
        </Typography>
        
        <Tabs 
          value={currentTab} 
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Players" />
          <Tab label="Teams" />
          <Tab label="Create Matches" />
          <Tab label="Declare Results" />
        </Tabs>

        {currentTab === 0 && (
          <>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name, role, or team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />

            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={filteredPlayers}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </>
        )}

        {currentTab === 1 && <RegisteredTeamsList />}

        {currentTab === 2 && <CreateMatches />}

        {currentTab === 3 && <DeclareResults />}
      </Paper>

      <AuctionPlayerProfile open={profileOpen} onClose={handleCloseProfile} player={selectedPlayer} />
    </Box>
  );
}
