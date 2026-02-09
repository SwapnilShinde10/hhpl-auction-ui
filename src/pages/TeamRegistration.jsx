import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PlayerRegistration from '../components/PlayerRegistration';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(2),
  gap: theme.spacing(2.5),
  borderRadius: 16,
  background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
  boxShadow:
    '0px 10px 25px rgba(0,0,0,0.08), 0px 4px 10px rgba(0,0,0,0.05)',
  [theme.breakpoints.up('sm')]: {
    width: 480,
    padding: theme.spacing(4),
  },
}));

const PageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100dvh',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  background:
    'radial-gradient(circle at top, #e3f2fd 0%, #ffffff 60%)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
}));

export default function TeamRegistration() {
  const [logo, setLogo] = React.useState(null);
  const [tab, setTab] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      teamName: data.get('teamName'),
      ownerName: data.get('ownerName'),
      email: data.get('email'),
      password: data.get('password'),
      logo,
    });
  };

  const handleTabChange = (e, value) => setTab(value);

  return (
    <>
      <CssBaseline />
      <PageContainer>
        <Card>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, width: '100%', overflow: 'hidden' }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              TabIndicatorProps={{ sx: { display: 'none' } }}
              sx={{
                background: 'transparent',
                borderRadius: 2,
                width: '100%',
                '& .MuiTabs-flexContainer': {
                  justifyContent: { xs: 'flex-start', sm: 'center' },
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 120, sm: 160 },
                  marginX: 0.5,
                  paddingY: 1,
                  paddingX: { xs: 1, sm: 2 },
                },
                '& .MuiTab-root:hover': {
                  color: '#0d47a1',
                },
                '& .Mui-selected': {
                  color: '#fff !important',
                  background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                  boxShadow: '0 6px 18px rgba(66,165,245,0.18)',
                  borderRadius: 1,
                },
              }}
            >
              <Tab label="Owner Registration" />
              <Tab label="Player Registration" />
            </Tabs>
          </Box>

          {tab === 0 && (
            <Box sx={{ p: 2 }}>
              <Box textAlign="center" sx={{ mb: 1 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Owner Registration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Register your team to participate in the auction
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <Box display="flex" justifyContent="center">
                  <Avatar
                    src={logo ? URL.createObjectURL(logo) : ''}
                    sx={{ width: 96, height: 96, bgcolor: '#e3f2fd', fontSize: 32 }}
                  />
                </Box>

                <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ borderStyle: 'dashed', py: 1.2 }}>
                  Upload Team Logo
                  <input hidden type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
                </Button>

                <FormControl>
                  <FormLabel>Team Name</FormLabel>
                  <TextField name="teamName" required fullWidth placeholder="Mumbai Warriors" />
                </FormControl>

                <FormControl>
                  <FormLabel>Owner Name</FormLabel>
                  <TextField name="ownerName" required fullWidth placeholder="Swapnil Shinde" />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <TextField name="email" type="email" required fullWidth />
                </FormControl>

                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <TextField name="password" type="password" required fullWidth />
                </FormControl>

                <Button type="submit" fullWidth size="large" variant="contained" sx={{ mt: 1, py: 1.2, borderRadius: 2, background: 'linear-gradient(90deg, #1976d2, #42a5f5)' }}>
                  Register Team
                </Button>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography align="center" variant="body2">
                Already registered?{' '}
                <RouterLink to="/" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
                  Login
                </RouterLink>
              </Typography>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ p: 2 }}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Player Registration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add players to your team
                </Typography>
              </Box>

              <PlayerRegistration />
            </Box>
          )}
        </Card>
      </PageContainer>
    </>
  );
}
