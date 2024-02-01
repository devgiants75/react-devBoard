import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ffdab9', // 밝은 버전
      main: '#ffcb99', // 기본 색상
      dark: '#cb997e', // 어두운 버전
      contrastText: '#000' // 대비되는 텍스트 색상
    },
    secondary: {
      light: '#b2dfdb',
      main: '#80cbc4',
      dark: '#4db6ac',
      contrastText: '#000'
    }
  },
  typography: {
    fontFamily: 'Arial',
    fontSize: 12,
    h1: {
      fontSize: '2.2rem'
    },
    body1: {
      fontWeight: 500
    },
    button: {
      fontStyle: 'italic'
    }
  },
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});
