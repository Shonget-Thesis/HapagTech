import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import TeamPage from './pages/TeamPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CookieConsent from './components/CookieConsent';
import PrivateRoute from './components/PrivateRoute';
import { useAuthStore } from './hooks/auth/useauth';

function App() {
  const { isCheckingAuth, isAuthenticated } = useAuthStore();
  
  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ed3f25]"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route 
          path="/home/*" 
          element={
            <PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;