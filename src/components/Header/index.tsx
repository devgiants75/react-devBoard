import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useStore } from '../../stores/user.store';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const drawerWidth = 240;

export default function Index() {
  const navigator = useNavigate();
  const [cookies, , removeCookie] = useCookies(['userToken', 'userType']);
  const { user, removeUser } = useStore();
  const [open, setOpen] = React.useState(false);

  const signOutHandler = () => {
    if (user) {
      // 전역 상태의 회원 정보 삭제
      removeUser(user.id);

      // 해당 회원에 대한 쿠키 삭제
      removeCookie('userToken', { path: '/' }); // userToken 쿠키 삭제
      removeCookie('userType', { path: '/' }); // userType 쿠키 삭제
    }
    console.log('로그아웃됨');
    navigator('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <AppBar
        position='static'
        sx={{
          display: 'flex',
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }}
      >
        <Toolbar
          variant='dense'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '@media (min-width: 600px)': {
              paddingLeft: 0, // 왼쪽 패딩 제거
              paddingRight: 0 // 오른쪽 패딩 제거
            },
            paddingLeft: 0,
            paddingRight: 0
          }}
        >
          <Typography
            variant='h6'
            color='inherit'
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent', // 너비가 600px 이상일 때 배경색
              '@media (max-width: 600px)': {
                backgroundColor: 'primary.light' // 너비가 600px 미만일 때 배경색
              },
              paddingLeft: 5,
              cursor: 'pointer'
            }}
            onClick={() => navigator('/')}
          >
            DevBoard
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '50%', // 기본적으로 너비를 50%로 설정
              height: '100%',
              margin: 0,
              borderBottomLeftRadius: '30px',
              transition:
                'width 0.03s ease-in-out, borderRadius 0.03s ease-in-out', // 전환 효과 추가
              '@media (max-width: 600px)': {
                // 화면 너비가 600px 미만일 때 스타일
                width: '100%', // 전체 너비를 차지하도록 설정
                borderRadius: 0
              },
              backgroundColor: 'primary.light'
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              {cookies.userToken && user ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ marginRight: 3 }}
                  >
                    {`${user.name}님 안녕하세요`}
                  </Typography>
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ marginRight: 3, cursor: 'pointer' }}
                    onClick={signOutHandler}
                  >
                    SignOut
                  </Typography>
                  <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                    onClick={handleDrawerOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ marginRight: 3, cursor: 'pointer' }}
                    onClick={() => navigator('/login')}
                  >
                    SignIn
                  </Typography>
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ marginRight: 10, cursor: 'pointer' }}
                    onClick={() => navigator('/register')}
                  >
                    SignUp
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='right'
        open={open}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            justifyContent: 'flex-end',
            minHeight: '64px'
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
            <ChevronRightIcon />
            {/* 
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} 
            */}
          </IconButton>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label='main mailbox folders'>
            <List>
              <ListItem disablePadding>
                <Link to='/myPage'>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='마이페이지' />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to='/board'>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='게시판' />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label='secondary mailbox folders'>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='회원정보수정' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component='a' href='#simple-list'>
                  <ListItemText primary='회원탈퇴' />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>
    </Box>
  );
}
