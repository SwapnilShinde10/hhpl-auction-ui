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

export default function PlayerRegistration() {
  const [playerPhoto, setPlayerPhoto] = React.useState(null);
  const [playerRole, setPlayerRole] = React.useState('Batsman');
  const [playerName, setPlayerName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [ageCategory, setAgeCategory] = React.useState('Above 18');
  const [flatWing, setFlatWing] = React.useState('A Wing');
  const [flatNumber, setFlatNumber] = React.useState('');

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

  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullName: playerName,
      dob,
      role: playerRole,
      ageCategory,
      flatWing,
      flatNumber,
      photo: playerPhoto,
    });
  };

  return (
    <Box component="form" onSubmit={handlePlayerSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <FormLabel>Age Category</FormLabel>
        <Select value={ageCategory} onChange={(e) => setAgeCategory(e.target.value)} fullWidth>
          <MenuItem value="Above 18">Above 18</MenuItem>
          <MenuItem value="Below 18">Below 18</MenuItem>
        </Select>
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
        <Select value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)} fullWidth>
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

      <Button type="submit" fullWidth size="large" variant="contained" sx={{ mt: 1, py: 1.2, borderRadius: 2, background: 'linear-gradient(90deg, #1976d2, #42a5f5)' }}>
        Add Player
      </Button>
    </Box>
  );
}
