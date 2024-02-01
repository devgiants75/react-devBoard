import React, { useState, useEffect, FormEvent } from 'react';
import useStore from '../../stores/user.store';
import { User } from '../../utils/types';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const UserProfile = () => {
  const { user, updateUser } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || (name === user.name && email === user.email)) {
      alert('변경사항이 없습니다.');
      return;
    }

    const updates: Partial<Pick<User, 'name' | 'email'>> = {
      ...(name !== user.name && { name }),
      ...(email !== user.email && { email }),
    };

    try {
      // Zustand 스토어 업데이트
      updateUser(user.id, { ...user, ...updates });

      // 서버에 업데이트 요청

      const updatedUser = { ...user, ...updates };

      const response = await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);
      console.log('회원 정보 수정 성공:', response.data);

      setIsChanged(true);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 30,
        mx: 'auto',
        width: '100%',
        maxWidth: '500px'
      }}
    >
      <Typography variant='h4' sx={{ mb: 4 }}>
        회원 정보 수정
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        onClick={handleSave}
      >
        저장
      </Button>
      {isChanged && <Typography color="success.main">변경사항이 저장되었습니다.</Typography>}
    </Box>
  );
};

export default UserProfile;