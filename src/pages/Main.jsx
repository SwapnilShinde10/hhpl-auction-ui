import * as React from 'react';
import { Box, Tabs, Tab, Paper, Typography, Divider, Stack } from '@mui/material';
import PlayerList from './PlayerList';
import RegisteredPlayers from './RegisteredPlayers';
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

  const handleChange = (e, newValue) => setTab(newValue);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f3f8ff,#ffffff)' }}>
      <Paper elevation={0} sx={{ px: { xs: 2, sm: 4 }, py: 3, borderRadius: 0, mb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, background: 'linear-gradient(90deg,#0d47a1,#42a5f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Harshail Hornbill Auction
            </Typography>
            <Typography variant="body2" color="text.secondary">Players, Teams and Registrations</Typography>
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
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 700,
                minWidth: 110,
                mx: 0.5,
                py: 1,
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
            <Tab label="Registered Players" />
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
        <RegisteredPlayers />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Teams />
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <Matches />
      </TabPanel>

      <TabPanel value={tab} index={4}>
        <PointsTable />
      </TabPanel>

      <TabPanel value={tab} index={5}>
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
          <TeamRegistration />
        </Box>
      </TabPanel>

      <TabPanel value={tab} index={6}>
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3, display: 'flex', justifyContent: 'center' }}>
          <Login />
        </Box>
      </TabPanel>
    </Box>
  );
}