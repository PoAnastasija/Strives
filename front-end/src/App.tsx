import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@views/Dashboard/Dashboard';
import Shop from '@views/Shop';
import FocusPage from '@views/FocusPage/FocusPage';
import ProjectPage from '@views/ProjectPage/ProjectPage';
import QuestPage from '@views/QuestPage/QuestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} /> 
        <Route path="/focus" element={<FocusPage />} /> 
        <Route path="/projects" element={<ProjectPage />} /> 
        <Route path="/quests" element={<QuestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
