import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/user.store';

interface LoginResponse {
  token: string;
}

interface User {
  userId: string;
  password: string;

}

function Index() {
  const [tabValue, setTabValue] = useState<string>('user');
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [cookies, setCookie] = useCookies(['userToken', 'userType']);

  const { setUser } = useStore();
  
  const navigate = useNavigate();

  const handleTabChange = (event: ChangeEvent<object>, newValue: string) => {
    setTabValue(newValue);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // 사용자 목록을 가져옵니다.
      const usersResponse = await axios.get('http://localhost:5000/users');
      const users = usersResponse.data;
  
      // 입력된 userId와 password가 일치하는 사용자를 찾습니다.
      const user = users.find((user: User) => user.userId === userId && user.password === password);
  
      if (user) {
        // 임의의 토큰 생성 (실제 환경에서는 안전한 방식으로 생성 필요)
        const token = `faketoken-${new Date().getTime()}`;
  
        // 쿠키에 토큰과 사용자 유형 저장
        setCookie('userToken', token, { path: '/' });
        setCookie('userType', tabValue, { path: '/' });

        
        setUser(user);
  
        console.log('Login successful');

        navigate('/');
      } else {
        // 일치하는 사용자가 없는 경우
        console.error('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        mt: 30
      }}
    >
      <Typography
        component='h1'
        variant='h4'
        sx={{ textAlign: 'center', mb: 10 }}
      >
        로그인
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label='회원 계정' value='user' />
        <Tab label='관리자 계정' value='admin' />
      </Tabs>

      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box component='form' onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Index;
