import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import PostTable from './PostTable'; 
import DepartmentList from './DepartmentList';
import { useNavigate } from 'react-router-dom';

const SecondPage: React.FC = () => {
   const navigate=useNavigate();
    useEffect(() => {
        // Check if user details are in localStorage
        const userDetails = localStorage.getItem('userDetails');
        if (!userDetails) {
          // Redirect back to the first page if details are not found
          navigate('/');
        }
      }, []);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts and Departments
      </Typography>
      <PostTable />
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
