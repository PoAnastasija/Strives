import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@views/Dashboard/Dashboard';
import Shop from '@views/Shop';
import FocusPage from '@views/FocusPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} /> 
        <Route path="/focus" element={<FocusPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
