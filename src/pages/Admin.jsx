import * as React from 'react';
import { Box, Tabs, Tab, Paper, Typography, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useData } from '../context/DataContext';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageIcon from '@mui/icons-material/Image';
import PlayerProfile from '../components/PlayerProfile';
import { fixBrokenPlayerPhotos } from '../utils/fixPlayerPhotos';

export default function Admin() {
  const { players, deletePlayer, teams, deductPoints } = useData();
  const [tab, setTab] = React.useState(0);
  const [deductValues, setDeductValues] = React.useState({});
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [toDelete, setToDelete] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [fixing, setFixing] = React.useState(false);
  const [fixResult, setFixResult] = React.useState(null);

  const handleViewProfile = (player) => {
    setSelectedPlayer(player);
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
    setSelectedPlayer(null);
  };

  const handleDelete = (id) => {
    setToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    deletePlayer(toDelete);
    setConfirmOpen(false);
    setToDelete(null);
  };

  const handleDeduct = (teamId) => {
    const raw = deductValues[teamId];
    const value = Number(raw);
    if (!raw || Number.isNaN(value) || value <= 0) return;
    deductPoints(teamId, value);
    setDeductValues((s) => ({ ...s, [teamId]: '' }));
  };

  const handleFixPhotos = async () => {
    setFixing(true);
    setFixResult(null);
    try {
      const results = await fixBrokenPlayerPhotos();
      setFixResult({ success: true, results });
      window.location.reload(); // Reload to fetch updated data
    } catch (error) {
      setFixResult({ success: false, error: error.message });
    } finally {
      setFixing(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'role', headerName: 'Role', width: 140 },
    { field: 'team', headerName: 'Team', width: 180 },
    { field: 'points', headerName: 'Points', width: 110 },
    {
      field: 'actions', headerName: 'Actions', width: 150, sortable: false, renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="primary" onClick={() => handleViewProfile(params.row)} title="View Profile">
            <VisibilityIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)} title="Delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Players" />
          <Tab label="Teams" />
        </Tabs>
      </Paper>

      {tab === 0 && (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">All Players</Typography>
            <Button
              variant="outlined"
              startIcon={fixing ? <CircularProgress size={20} /> : <ImageIcon />}
              onClick={handleFixPhotos}
              disabled={fixing}
            >
              Fix Broken Photos
            </Button>
          </Box>
          
          {fixResult && (
            <Alert severity={fixResult.success ? 'success' : 'error'} sx={{ mb: 2 }} onClose={() => setFixResult(null)}>
              {fixResult.success 
                ? `Successfully updated ${fixResult.results.length} player(s)` 
                : `Error: ${fixResult.error}`}
            </Alert>
          )}
          
          <div style={{ height: 480, width: '100%' }}>
            <DataGrid rows={players} columns={columns} pageSizeOptions={[5, 10]} disableRowSelectionOnClick />
          </div>
        </Paper>
      )}

      {tab === 1 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Teams</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {teams.map((team) => (
              <Paper key={team.id} sx={{ p: 2, width: 260 }}>
                <Typography variant="h6">{team.name}</Typography>
                <Typography variant="body2" color="text.secondary">Remaining Points: ₹{(team.remainingBudget || 0).toLocaleString('en-IN')}</Typography>
                <Typography variant="body2" color="text.secondary">Squad: {team.players?.length || 0}</Typography>

                <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    label="Deduct (points)"
                    value={deductValues[team.id] ?? ''}
                    onChange={(e) => setDeductValues((s) => ({ ...s, [team.id]: e.target.value }))}
                  />
                  <Button variant="contained" onClick={() => handleDeduct(team.id)}>Deduct</Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this player?</DialogContent>

      <PlayerProfile open={profileOpen} onClose={handleCloseProfile} player={selectedPlayer} />
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
