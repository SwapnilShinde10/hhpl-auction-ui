import * as React from 'react';
import { Box, Paper, Typography, Button, TextField, IconButton, Tabs, Tab, CircularProgress } from '@mui/material';
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
  const { players = [], teams = [], deletePlayer, loading } = useData();

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

  const filteredPlayers = React.useMemo(() => {
    if (!players || players.length === 0) return [];
    
    return players.filter((player) => {
      if (!searchQuery) return true;
      
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = player.name?.toLowerCase().includes(searchLower);
      const roleMatch = player.role?.toLowerCase().includes(searchLower);
      
      // Check team name if player is sold and teams array exists
      let teamMatch = false;
      if (player.soldTo && teams && teams.length > 0) {
        const team = teams.find(t => t.id === player.soldTo);
        teamMatch = team?.name?.toLowerCase().includes(searchLower);
      }
      
      return nameMatch || roleMatch || teamMatch;
    });
  }, [players, teams, searchQuery]);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'role', headerName: 'Role', width: 130 },
    { 
      field: 'team', 
      headerName: 'Team', 
      flex: 1, 
      minWidth: 150,
      valueGetter: (value, row) => {
        if (!row || !row.soldTo) return 'Not Sold';
        if (!teams || teams.length === 0) return 'Loading...';
        const team = teams.find(t => t.id === row.soldTo);
        return team ? team.name : 'Unknown';
      }
    },
    { 
      field: 'soldPrice', 
      headerName: 'Price', 
      width: 120,
      valueGetter: (value, row) => {
        if (!row || !row.soldPrice) return '₹0';
        return `₹${(row.soldPrice / 1000000).toFixed(2)}M`;
      }
    },
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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
                  {filteredPlayers.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography variant="body1" color="text.secondary">
                        {players.length === 0 ? 'No players registered yet.' : 'No players found matching your search.'}
                      </Typography>
                    </Box>
                  ) : (
                    <DataGrid
                      rows={filteredPlayers}
                      columns={columns}
                      pageSizeOptions={[5, 10, 25]}
                      initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                      }}
                      disableRowSelectionOnClick
                      sx={{
                        '& .MuiDataGrid-cell': {
                          borderColor: 'rgba(224, 224, 224, 1)',
                        },
                      }}
                    />
                  )}
                </Box>
              </>
            )}

            {currentTab === 1 && <RegisteredTeamsList />}

            {currentTab === 2 && <CreateMatches />}

            {currentTab === 3 && <DeclareResults />}
          </>
        )}
      </Paper>

      <AuctionPlayerProfile open={profileOpen} onClose={handleCloseProfile} player={selectedPlayer} />
    </Box>
  );
}
