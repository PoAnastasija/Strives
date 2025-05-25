// import NavBar from "./components/header/navbar.tsx"
// import logo from "./assets/logo_prov.png"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Autres pages */}
      </Routes>
    </Router>
  );
}

export default App;
