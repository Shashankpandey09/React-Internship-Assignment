import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserForm from './components/UserForn';
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
  const user = localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/second"
          element={user ? <SecondPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
