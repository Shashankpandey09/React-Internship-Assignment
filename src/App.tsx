import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserForm from './components/UserForn'; // Corrected typo in import
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/second"
          element={ <SecondPage /> } 
        />
      </Routes>
    </Router>
  );
};

export default App;

