import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserForm from './components/UserForn'; // Corrected typo in import
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('userDetails') || '{}'); // Retrieve and parse user details

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/second"
          element={user.name ? <SecondPage /> : <Navigate to="/" replace />} // Check if user.name exists
        />
      </Routes>
    </Router>
  );
};

export default App;

