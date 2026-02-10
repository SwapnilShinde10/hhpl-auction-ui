import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { registerPlayer } from '../services/playerService';
import { uploadPlayerPhoto } from '../services/uploadService';
import { useData } from '../context/DataContext';

export default function PlayerRegistration() {
  const { fetchPlayers } = useData();
  const [playerPhoto, setPlayerPhoto] = React.useState(null);
  const [playerRole, setPlayerRole] = React.useState('Batsman');
  const [playerName, setPlayerName] = React.useState('');
  const [jerseyName, setJerseyName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [battingStyle, setBattingStyle] = React.useState('Right-Hand');
  const [bowlingStyle, setBowlingStyle] = React.useState('');
  const [jerseySize, setJerseySize] = React.useState('M');
  const [contactNumber, setContactNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [flatWing, setFlatWing] = React.useState('A Wing');
  const [flatNumber, setFlatNumber] = React.useState('');
  const [previousTeam, setPreviousTeam] = React.useState('');
  const [basePrice, setBasePrice] = React.useState('5000');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const generateFlats = (flatsPerFloor) => {
    const flats = [];
    for (let floor = 1; floor <= 19; floor++) {
      const numbers = [];
      for (let unit = 1; unit <= flatsPerFloor; unit++) {
        numbers.push(String(floor * 100 + unit));
      }
      flats.push({
        floor,
        numbers,
      });
    }
    return flats;
  };

  const flatOptions = {
    'A Wing': generateFlats(3),
    'B Wing': generateFlats(4),
  };

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const age = calculateAge(dob);
      const address = `${flatWing} ${flatNumber}`;

      // Upload photo first if provided
      let photoURL = '';
      if (playerPhoto) {
        try {
          setSuccess('Uploading photo...');
          photoURL = await uploadPlayerPhoto(playerPhoto);
          console.log('Photo uploaded successfully:', photoURL);
        } catch (uploadError) {
          console.error('Photo upload error:', uploadError);
          setError('Failed to upload photo. Please try again.');
          setLoading(false);
          return;
        }
      }

      const playerData = {
        name: playerName,
        jerseyName: jerseyName,
        dateOfBirth: dob,
        age: age,
        role: playerRole,
        battingStyle: battingStyle,
        bowlingStyle: bowlingStyle || 'N/A',
        jerseySize: jerseySize,
        contactNumber: contactNumber,
        email: email,
        address: address,
        previousTeam: previousTeam || 'None',
        basePrice: parseInt(basePrice),
        ...(photoURL && { photo: photoURL })
      };

      const response = await registerPlayer(playerData);
      console.log('Player registered:', response);
      
      setSuccess('Player registered successfully!');
      
      // Refresh player list
      await fetchPlayers();
      
      // Reset form
      setPlayerName('');
      setJerseyName('');
      setDob('');
      setBattingStyle('Right-Hand');
      setBowlingStyle('');
      setContactNumber('');
      setEmail('');
      setFlatNumber('');
      setPreviousTeam('');
      setBasePrice('5000');
      setPlayerPhoto(null);
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Error registering player:', err);
      setError(err.message || 'Failed to register player. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handlePlayerSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      
      <Box display="flex" justifyContent="center">
        <Avatar src={playerPhoto ? URL.createObjectURL(playerPhoto) : ''} sx={{ width: 96, height: 96, bgcolor: '#e3f2fd', fontSize: 32 }} />
      </Box>

      <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ borderStyle: 'dashed', py: 1.2 }}>
        Upload Photo
        <input hidden type="file" accept="image/*" onChange={(e) => setPlayerPhoto(e.target.files[0])} />
      </Button>

      <FormControl>
        <FormLabel>Player Full Name</FormLabel>
        <TextField value={playerName} onChange={(e) => setPlayerName(e.target.value)} name="fullName" required fullWidth placeholder="Swapnil Shinde" />
      </FormControl>

      <FormControl>
        <FormLabel>Jersey Name</FormLabel>
        <TextField value={jerseyName} onChange={(e) => setJerseyName(e.target.value)} name="jerseyName" required fullWidth placeholder="SHINDE" />
      </FormControl>

      <FormControl fullWidth>
        <TextField 
          label="Date of Birth" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
          name="dob" 
          type="date" 
          required 
          fullWidth
          slotProps={{
            inputBaseComponentProps: {
              type: 'date',
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Role</FormLabel>
        <Select value={playerRole} onChange={(e) => setPlayerRole(e.target.value)} fullWidth>
          <MenuItem value="Batsman">Batsman</MenuItem>
          <MenuItem value="Bowler">Bowler</MenuItem>
          <MenuItem value="All-Rounder">All-Rounder</MenuItem>
          <MenuItem value="Wicket-Keeper">Wicket-Keeper</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Batting Style</FormLabel>
        <Select value={battingStyle} onChange={(e) => setBattingStyle(e.target.value)} fullWidth>
          <MenuItem value="Right-Hand">Right-Hand</MenuItem>
          <MenuItem value="Left-Hand">Left-Hand</MenuItem>
        </Select>
      </FormControl>

      {(playerRole === 'Bowler' || playerRole === 'All-Rounder') && (
        <FormControl>
          <FormLabel>Bowling Style</FormLabel>
          <Select value={bowlingStyle} onChange={(e) => setBowlingStyle(e.target.value)} fullWidth>
            <MenuItem value="">Select Bowling Style</MenuItem>
            <MenuItem value="Right-Arm Fast">Right-Arm Fast</MenuItem>
            <MenuItem value="Left-Arm Fast">Left-Arm Fast</MenuItem>
            <MenuItem value="Right-Arm Medium">Right-Arm Medium</MenuItem>
            <MenuItem value="Left-Arm Medium">Left-Arm Medium</MenuItem>
            <MenuItem value="Right-Arm Off-Spin">Right-Arm Off-Spin</MenuItem>
            <MenuItem value="Right-Arm Leg-Spin">Right-Arm Leg-Spin</MenuItem>
            <MenuItem value="Left-Arm Orthodox">Left-Arm Orthodox</MenuItem>
            <MenuItem value="Left-Arm Chinaman">Left-Arm Chinaman</MenuItem>
          </Select>
        </FormControl>
      )}

      <FormControl>
        <FormLabel>Jersey Size</FormLabel>
        <Select value={jerseySize} onChange={(e) => setJerseySize(e.target.value)} fullWidth>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
          <MenuItem value="XXL">XXL</MenuItem>
          <MenuItem value="XXXL">XXXL</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Contact Number</FormLabel>
        <TextField value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} name="contactNumber" required fullWidth placeholder="+91 9876543210" type="tel" />
      </FormControl>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} name="email" required fullWidth placeholder="player@example.com" type="email" />
      </FormControl>

      <FormControl>
        <FormLabel>Flat Wing</FormLabel>
        <Select value={flatWing} onChange={(e) => setFlatWing(e.target.value)} fullWidth>
          <MenuItem value="A Wing">A Wing</MenuItem>
          <MenuItem value="B Wing">B Wing</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Flat Number</FormLabel>
        <Select value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)} fullWidth required>
          <MenuItem value="">Select Flat Number</MenuItem>
          {flatOptions[flatWing].map((floorData) => [
            <ListSubheader key={`floor-${floorData.floor}`}>Floor {floorData.floor}</ListSubheader>,
            ...floorData.numbers.map((flat) => (
              <MenuItem key={flat} value={flat}>
                {flatWing} {flat}
              </MenuItem>
            )),
          ])}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Previous Team (Optional)</FormLabel>
        <TextField value={previousTeam} onChange={(e) => setPreviousTeam(e.target.value)} name="previousTeam" fullWidth placeholder="Team Name" />
      </FormControl>

      <FormControl>
        <FormLabel>Base Price (₹)</FormLabel>
        <TextField value={basePrice} onChange={(e) => setBasePrice(e.target.value)} name="basePrice" required fullWidth placeholder="5000" type="number" />
      </FormControl>

      <Button 
        type="submit" 
        fullWidth 
        size="large" 
        variant="contained" 
        disabled={loading}
        sx={{ mt: 1, py: 1.2, borderRadius: 2, background: 'linear-gradient(90deg, #1976d2, #42a5f5)' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Player'}
      </Button>
    </Box>
  );
}
