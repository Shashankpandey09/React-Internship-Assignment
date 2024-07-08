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

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

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
          autoPageSize
          pagination
        />
      </div>
    </Container>
  );
};

export default PostTable;
