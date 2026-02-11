import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useData } from '../context/DataContext';

export default function PlayerProfile({ open, onClose, player }) {
  const { teams = [] } = useData();
  
  if (!player) return null;

  // Get team name from soldTo ID
  const getTeamName = () => {
    if (!player.soldTo) return 'Not Sold';
    const team = teams.find(t => t.id === player.soldTo);
    return team ? team.name : 'Unknown Team';
  };

  // Get sold price display
  const getSoldPrice = () => {
    if (!player.soldPrice || player.soldPrice === 0) return '₹0';
    return `₹${(player.soldPrice / 1000000).toFixed(2)}M`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={700}>
          Player Profile
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Box sx={{ flex: '0 0 260px', display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={player.photo || undefined}
              sx={{
                width: 260,
                height: 260,
                bgcolor: '#fdebd0',
                fontSize: 56,
                borderRadius: 2,
                boxShadow: '0 12px 30px rgba(16,24,40,0.12)',
                border: '6px solid #fff'
              }}
            >
              {!player.photo && (player.fullName || player.name)?.charAt(0).toUpperCase()}
            </Avatar>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" fontWeight={900}>{player.fullName || player.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {getTeamName()} · {player.status || 'registered'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box sx={{ background: 'linear-gradient(90deg,#1976d2,#42a5f5)', color: '#fff', px: 2, py: 0.6, borderRadius: 1, fontWeight: 700 }}>{player.role}</Box>
              <Box sx={{ background: '#eaf6ff', color: '#0d47a1', px: 2, py: 0.6, borderRadius: 1, fontWeight: 700 }}>{getSoldPrice()}</Box>
            </Box>

            <Divider />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Date of Birth</Typography>
                <Typography fontWeight={700}>{player.dateOfBirth ? new Date(player.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Age</Typography>
                <Typography fontWeight={700}>{player.age || 'N/A'}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Address</Typography>
                <Typography fontWeight={700}>{player.address || 'N/A'}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Contact</Typography>
                <Typography fontWeight={700}>{player.contactNumber || 'N/A'}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">Team</Typography>
                <Typography fontWeight={700}>{getTeamName()}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <Divider />
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" fullWidth sx={{ background: 'linear-gradient(90deg, #1976d2, #42a5f5)' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
