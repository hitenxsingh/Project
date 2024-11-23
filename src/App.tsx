import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 bg-gray-100 ">
          <Sidebar />
          <main className="flex-1 p-4 ">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/roles" element={<Roles />} />
              </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
