import React, { useState } from 'react';
import InputField from '../../components/InputField';
import AdminSwitchLink from '../../components/AdminSwitchLink';
import Button from '@mui/material/Button';
import { Box, Container, FormHelperText, Typography } from '@mui/material';
import axios from 'axios';

function Index() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: ''
  });
  const [isMatching, setIsMatching] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPassword') {
      setIsMatching(formData.password === value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isMatching) {
      console.error('비밀번호가 일치하지 않습니다.');
      return; // 일치하지 않으면 제출을 중단합니다.
    }

    try {
      // json-server에서 제공하는 REST API 엔드포인트를 사용합니다.
      const response = await axios.post(
        'http://localhost:5000/users',
        {
          userId: formData.userId,
          password: formData.password,
          name: formData.name,
          email: formData.email
        }
      );

      // 성공적인 회원가입 후의 로직
      console.log('회원 가입 성공:', response.data);
      // 여기에 성공 시 추가적인 로직을 구현할 수 있습니다. 예: 로그인 페이지로 리디렉션
    } catch (error) {
      // 오류 처리
      console.error('회원 가입 실패:', error);
      // 여기에 오류 시 처리 로직을 구현할 수 있습니다. 예: 오류 메시지 표시
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
        회원가입
      </Typography>

      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <InputField
              label='ID'
              type='text'
              name='userId'
              value={formData.userId}
              onChange={handleInputChange}
              autoFocus
              required
            />
            <InputField
              label='Password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <InputField
              label='Password Confirm'
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {!isMatching ? (
              <FormHelperText error>
                비밀번호가 일치하지 않습니다.
              </FormHelperText>
            ) : (
              formData.confirmPassword && (
                <FormHelperText>
                비밀번호가 일치합니다.
              </FormHelperText>
              )
            )}
            <InputField
              label='Name'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label='Email (optional)'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <AdminSwitchLink />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Index;
