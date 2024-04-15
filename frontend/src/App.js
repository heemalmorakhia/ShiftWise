import "./App.css";
import Home from "./components/home";
import Dashboard from "./components/dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from "./utils/authentication";

function App() {
  return (
    <div className="App">
      <Authentication>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Authentication>
    </div>
  );
}

export default App;
