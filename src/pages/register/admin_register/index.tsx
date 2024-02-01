import React, { useState } from 'react';
import InputField from '../../../components/InputField';
import Button from '@mui/material/Button';
import SignUpPage from '../index';
import { Box, Container, Typography } from '@mui/material';

function Index() {
  const [authCode, setAuthCode] = useState('');
  const [isAuthCodeValid, setIsAuthCodeValid] = useState(false);

  const handleAuthCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  };

  const verifyAuthCode = async () => {
    // 인증 코드 검증 로직 (Axios와 async/await 사용)
    // 예시: if(authCode === "correctCode") setIsAuthCodeValid(true);
  };

  return (
    <Box
      sx={{
        width: '100%',
        mt: 30
      }}
    >
      {!isAuthCodeValid ? (
        <Container component='main' maxWidth='xs'>
          <Typography component='h1' variant='h4' sx={{ textAlign: 'center', mb: 10 }}>
            관리자 인증
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ mt: 1 }}>
              <InputField
                label='인증 코드'
                type='text'
                name='authCode'
                value={authCode}
                onChange={handleAuthCodeChange}
              />
              <Button
                onClick={verifyAuthCode}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                인증
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <SignUpPage />
      )}
    </Box>
  );
};

export default Index;