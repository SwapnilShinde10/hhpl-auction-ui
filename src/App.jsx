import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import TeamRegistration from './pages/TeamRegistration';
import Login from './pages/Login';
import Main from './pages/Main';
import TeamDashboard from './pages/TeamDashboard';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<TeamRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team-dashboard" element={<TeamDashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App
