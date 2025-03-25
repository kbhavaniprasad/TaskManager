import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import './App.css';
import Task from './components/Task';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Task/>} />  {/* Default Route */}
        {/* Route for Front.jsx */}
      </Routes>
    </Router>
  );
}

export default App;
