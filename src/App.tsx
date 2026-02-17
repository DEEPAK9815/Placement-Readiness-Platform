
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './pages/DashboardLayout';
import Dashboard from './pages/Dashboard';
import { Practice, Assessments, Resources, Profile } from './pages/DashboardPages';
import { TestChecklist } from './pages/TestChecklist';
import { ShipPage } from './pages/ShipPage';
import { ProofPage } from './pages/ProofPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        {/* New Routes for Testing & Shipping */}
        <Route path="/prp/07-test" element={<DashboardLayout />}>
          <Route index element={<TestChecklist />} />
        </Route>
        <Route path="/prp/08-ship" element={<DashboardLayout />}>
          <Route index element={<ShipPage />} />
        </Route>
        <Route path="/prp/proof" element={<DashboardLayout />}>
          <Route index element={<ProofPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
