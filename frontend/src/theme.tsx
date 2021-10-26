import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    // type: 'light',
    primary: {
      main: '#61dafb',
      light: '#61dafb',
      dark: '#21a1c4',
    },
    secondary: {
      main: '#b5ecfb',
      light: '#61dafb',
      dark: '#21a1c4',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#282c34',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px 10px',
          margin: '10px',
          backgroundColor: '#fff', // 5d737e
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '5px',
        }
      }
    }
  }
});

export default theme;