import * as React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AuctionPlayerProfile from '../components/AuctionPlayerProfile';
import { useData } from '../context/DataContext';

export default function RegisteredPlayers() {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const { players } = useData();

  const handleViewProfile = (player) => {
    setSelectedPlayer(player);
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
    setSelectedPlayer(null);
  };

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
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(180deg,#ffffff,#f7fbff)' }} elevation={4}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>
          All Registered Players
        </Typography>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={players}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>

      <AuctionPlayerProfile open={profileOpen} onClose={handleCloseProfile} player={selectedPlayer} />
    </Box>
  );
}
