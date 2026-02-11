import * as React from 'react';
import {
  Dialog,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
} from '@mui/material';
import { useData } from '../context/DataContext';
import Confetti from 'react-confetti';
import { sellPlayer, markPlayerAvailable } from '../services/auctionService';

export default function AuctionPlayerProfile({ open, onClose, player }) {
  const { teams, fetchPlayers, fetchTeams } = useData();
  const [status, setStatus] = React.useState('Available');
  const [price, setPrice] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState('');
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showSoldStamp, setShowSoldStamp] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (player) {
      setStatus(player.status === 'sold' ? 'Sold' : 'Available');
      setPrice(player.soldPrice ? String(player.soldPrice) : '');
      setSelectedTeam(player.soldTo || '');
      setShowSoldStamp(false);
      setImageError(false);
      setError('');
      setLoading(false);
    }
  }, [player]);

  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      if (status === 'Sold') {
        // Validation
        if (!price || Number(price) <= 0) {
          setError('Please enter a valid price');
          setLoading(false);
          return;
        }

        if (!selectedTeam) {
          setError('Please select a team');
          setLoading(false);
          return;
        }

        // Check team budget
        const team = teams.find(t => t.id === selectedTeam);
        if (!team) {
          setError('Selected team not found');
          setLoading(false);
          return;
        }

        const remainingBudget = team.remainingBudget || team.totalBudget || 10000000;
        const auctionPrice = Number(price);

        if (remainingBudget < auctionPrice) {
          setError(`Insufficient budget! Team has ₹${(remainingBudget / 1000000).toFixed(2)}M remaining, but player costs ₹${(auctionPrice / 1000000).toFixed(2)}M`);
          setLoading(false);
          return;
        }

        // Call API to sell player
        await sellPlayer(player.id, selectedTeam, auctionPrice);

        // Show celebration
        setShowSoldStamp(true);
        setShowConfetti(true);

        // Refresh data
        await Promise.all([fetchPlayers(), fetchTeams()]);

        // Stop confetti and close after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
          setTimeout(() => {
            onClose();
          }, 500);
        }, 5000);
      } else {
        // Mark player as available
        await markPlayerAvailable(player.id);

        // Refresh data
        await Promise.all([fetchPlayers(), fetchTeams()]);
        
        onClose();
      }
    } catch (err) {
      console.error('Error saving player:', err);
      setError(err.message || 'Failed to save player. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!player) return null;

  return (
    <>
      {showConfetti && <Confetti numberOfPieces={500} recycle={false} />}
      
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            p: 0,
          },
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: '4px solid',
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(45deg, #e74c3c, #3498db)',
            borderRadius: 3,
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Left Side - Player Image */}
            <Box
              sx={{
                flex: '0 0 350px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '500px',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Avatar
                  src={imageError ? undefined : player.photo}
                  alt={player.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    fontSize: 80,
                  }}
                  variant="rounded"
                  imgProps={{
                    onError: () => setImageError(true),
                  }}
                >
                  {(!player.photo || imageError) && player.name?.charAt(0).toUpperCase()}
                </Avatar>

                {/* SOLD Stamp Overlay */}
                {showSoldStamp && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(-15deg)',
                      animation: showConfetti ? 'stamp 0.5s ease-out' : 'none',
                      '@keyframes stamp': {
                        '0%': { transform: 'translate(-50%, -50%) rotate(-15deg) scale(0)', opacity: 0 },
                        '50%': { transform: 'translate(-50%, -50%) rotate(-15deg) scale(1.2)', opacity: 1 },
                        '100%': { transform: 'translate(-50%, -50%) rotate(-15deg) scale(1)', opacity: 1 },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        border: '12px solid #4ade80',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(74, 222, 128, 0.3)',
                        backdropFilter: 'blur(5px)',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 60,
                          fontWeight: 900,
                          color: '#4ade80',
                          textShadow: '0 0 20px rgba(74, 222, 128, 0.8)',
                          letterSpacing: 2,
                        }}
                      >
                        SOLD
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Right Side - Player Details */}
            <Box sx={{ flex: 1, color: '#fff' }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>
                  Name:
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                  {player.fullName || player.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>Age:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {player.age || (player.dateOfBirth ? new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear() : 'N/A')}
                  </Typography>
                </Box>

                <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>Position:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{player.role || 'N/A'}</Typography>
                </Box>

                <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>Bat/Bowl:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {player.battingStyle || 'N/A'} / {player.bowlingStyle || 'N/A'}
                  </Typography>
                </Box>

                <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>Address:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{player.address || 'N/A'}</Typography>
                </Box>

                <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>Current Team:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {player.soldTo ? teams.find(t => t.id === player.soldTo)?.name || 'Unknown Team' : 'Not Sold'}
                  </Typography>
                </Box>

                <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>Sold Price:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {player.soldPrice ? `₹${(player.soldPrice / 1000000).toFixed(2)}M` : '₹0'}
                  </Typography>
                </Box>
              </Box>

              {/* Error Message */}
              {error && (
                <Box sx={{ mb: 2, p: 2, bgcolor: 'rgba(239, 68, 68, 0.2)', borderRadius: 1, border: '1px solid #ef4444' }}>
                  <Typography variant="body2" sx={{ color: '#fecaca', fontWeight: 600 }}>
                    {error}
                  </Typography>
                </Box>
              )}

              {/* Status Toggle Buttons */}
              <Box sx={{ mt: 4 }}>
                <ToggleButtonGroup
                  value={status}
                  exclusive
                  onChange={(e, value) => value && setStatus(value)}
                  fullWidth
                  sx={{
                    mb: 2,
                    '& .MuiToggleButton-root': {
                      py: 1.2,
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      border: '2px solid transparent',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <ToggleButton
                    value="Sold"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '&.Mui-selected': {
                        bgcolor: '#1e40af !important',
                        color: '#fff !important',
                        border: '2px solid #60a5fa !important',
                        boxShadow: '0 0 20px rgba(96, 165, 250, 0.4), inset 0 0 15px rgba(96, 165, 250, 0.15)',
                        '&:hover': { bgcolor: '#1e3a8a !important' },
                      },
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    }}
                  >
                    SOLD
                  </ToggleButton>
                  <ToggleButton
                    value="Available"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '&.Mui-selected': {
                        bgcolor: '#ea580c !important',
                        color: '#fff !important',
                        border: '2px solid #fb923c !important',
                        boxShadow: '0 0 20px rgba(251, 146, 60, 0.4), inset 0 0 15px rgba(251, 146, 60, 0.15)',
                        '&:hover': { bgcolor: '#c2410c !important' },
                      },
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    }}
                  >
                    AVAILABLE
                  </ToggleButton>
                </ToggleButtonGroup>

                {status === 'Sold' && (
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Auction Price (₹)"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g., 2500000 for 2.5M"
                      helperText="Enter amount in rupees (e.g., 2500000 = ₹2.5M)"
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          bgcolor: 'rgba(255,255,255,0.05)',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.3)', borderWidth: 2 },
                          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                          '&.Mui-focused fieldset': { borderColor: '#60a5fa' },
                        },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)', fontWeight: 600 },
                        '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.6)' },
                      }}
                    />

                    <FormControl fullWidth>
                      <InputLabel sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Select Team</InputLabel>
                      <Select
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        label="Select Team"
                        sx={{
                          color: '#fff',
                          bgcolor: 'rgba(255,255,255,0.05)',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)', borderWidth: 2 },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#60a5fa' },
                        }}
                      >
                        {teams.map((team) => (
                          <MenuItem key={team.id} value={team.id}>
                            {team.name} - ₹{((team.remainingBudget || team.totalBudget || 0) / 1000000).toFixed(2)}M remaining
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                    sx={{
                      py: 1.2,
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      bgcolor: '#10b981',
                      color: '#fff',
                      border: '2px solid #34d399',
                      boxShadow: '0 3px 15px rgba(16, 185, 129, 0.4)',
                      '&:hover': {
                        bgcolor: '#059669',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.5)',
                      },
                      '&:disabled': {
                        bgcolor: 'rgba(16, 185, 129, 0.3)',
                        color: 'rgba(255,255,255,0.5)',
                      },
                    }}
                  >
                    {loading ? 'SAVING...' : 'SAVE'}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    disabled={loading}
                    sx={{
                      py: 1.2,
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      borderColor: 'rgba(255,255,255,0.5)',
                      borderWidth: 2,
                      color: '#fff',
                      '&:hover': {
                        borderColor: '#fff',
                        borderWidth: 2,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        boxShadow: '0 3px 15px rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    CANCEL
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
