import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import Login from './components/pages/auth/Login';
import { AllProvider } from './components/CustomHook';
import Register from './components/pages/auth/Register';
import AuthLayout from './components/layouts/AuthLayout';
import Dashboard from './components/pages/dashboard/Dashboard';
import DashboardLayout from './components/layouts/DashboardLayout';
import ForgotPassword from './components/pages/auth/ForgotPassword';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <AllProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster richColors/>
        </AllProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
