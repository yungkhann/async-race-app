import { Routes, Route, Navigate } from 'react-router-dom';
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/garage" />} />
      <Route path="/garage" element={<Garage />} />
      <Route path="/winners" element={<Winners />} />
    </Routes>
  );
};

export default App;
