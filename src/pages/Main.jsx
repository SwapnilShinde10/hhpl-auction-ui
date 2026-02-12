import * as React from 'react';
import { Box, Tabs, Tab, Paper, Typography, Divider, Stack, IconButton, Modal, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayerList from './PlayerList';
import TeamRegistration from './TeamRegistration';
import Login from './Login';
import PointsTable from './PointsTable';
import Teams from '../components/Teams';
import Matches from '../components/Matches';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Main() {
  const [tab, setTab] = React.useState(0);
  const [logoError, setLogoError] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);

  const handleChange = (e, newValue) => setTab(newValue);

  const handleCloseSplash = () => setShowSplash(false);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f3f8ff,#ffffff)' }}>
      {/* Coming Soon Splash Screen */}
      <Modal
        open={showSplash}
        onClose={handleCloseSplash}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleCloseSplash}
            sx={{
              position: 'absolute',
              top: { xs: -20, sm: -30 },
              right: { xs: -20, sm: -30 },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
              '&:hover': {
                backgroundColor: '#fff',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src="/Logo/Comming soon.jpeg"
            alt="Coming Soon"
            sx={{
              maxWidth: { xs: '90vw', sm: '80vw', md: '70vw' },
              maxHeight: { xs: '80vh', sm: '85vh' },
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          />
        </Box>
      </Modal>

      <Paper elevation={0} sx={{ px: { xs: 2, sm: 4 }, py: 3, borderRadius: 0, mb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap={{ xs: 'wrap', lg: 'nowrap' }} gap={2}>
          <Box display="flex" alignItems="center" gap={2} sx={{ minWidth: { xs: 'auto', lg: 'fit-content' } }}>
            
              <Box
                component="img"
                src="/Logo/Logo.jpeg"
                alt="HHPL Logo"
                onError={() => setLogoError(true)}
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  objectFit: 'contain',
                }}
              />
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 900, 
                  background: 'linear-gradient(90deg,#0d47a1,#42a5f5)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.5rem', sm: '2rem', lg: '2.125rem' }
                }}
              >
                Harshail Hornbill Auction
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'block', md: 'block' } }}>
                Players, Teams and Registrations
              </Typography>
            </Box>
          </Box>

          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              background: 'transparent',
              borderRadius: 2,
              minWidth: { xs: '100%', lg: 'auto' },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 700,
                minWidth: { xs: 100, lg: 110 },
                mx: 0.5,
                py: 1,
                fontSize: { xs: '0.875rem', lg: '1rem' },
              },
              '& .Mui-selected': {
                color: '#fff !important',
                background: 'linear-gradient(90deg,#1976d2,#42a5f5)',
                boxShadow: '0 6px 18px rgba(66,165,245,0.18)',
                borderRadius: 1,
              },
            }}
          >
            <Tab label="Home" />
            <Tab label="Teams" />
            <Tab label="Matches" />
            <Tab label="Points Table" />
            <Tab label="Registration" />
            <Tab label="Login" />
          </Tabs>
        </Box>
      </Paper>

      <Divider />

      <TabPanel value={tab} index={0}>
        <Stack spacing={3} sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(180deg,#ffffff,#f7fbff)' }} elevation={4}>
            <PlayerList />
          </Paper>
        </Stack>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Teams />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Matches />
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <PointsTable />
      </TabPanel>

      <TabPanel value={tab} index={4}>
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
          <TeamRegistration />
        </Box>
      </TabPanel>

      <TabPanel value={tab} index={5}>
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3, display: 'flex', justifyContent: 'center' }}>
          <Login />
        </Box>
      </TabPanel>
    </Box>
  );
}