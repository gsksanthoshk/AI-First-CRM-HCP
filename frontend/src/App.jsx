import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Doctors from "./page/Doctors";
import LogInteraction from "./page/LogInteraction";
import AIChat from "./page/AIChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/interactions" element={<LogInteraction />} />
        <Route path="/aichat" element={<AIChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;