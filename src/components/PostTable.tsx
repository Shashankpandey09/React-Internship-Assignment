import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error: show user feedback, retry logic, etc.
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'body', headerName: 'Body', width: 250 },
    { field: 'userId', headerName: 'User ID', width: 90 }
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Posts
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={posts} 
          columns={columns} 
          pageSize={pageSize} 
          rowsPerPageOptions={[5, 10, 15]} 
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} 
          pagination
        />
      </div>
    </Container>
  );
};

export default PostTable;

