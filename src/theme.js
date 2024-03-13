import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#58d68d',
      main: '#43d17f',
      dark: '#2ecc71',
      contrastText: '#fff',
    },
    secondary: {
      light: '#9da1ca',
      main: '#9297C4',
      dark: '#8388b0',
      contrastText: '#FFF',
    },
    text: {
      black: "#121212",
      white: "#ffffffde",
      grey: "#4A4A4D",
    }, 
    neutral: "#8b96a2", 
    red: "#ff6d6d",
    bg: {
      primary: "#fff",
    }
  },
  typography: {
    allVariants: {
      color: "#121212"
    },
  },
  props: {
    MuiSvgIcon: {
      htmlColor: '#fff',
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      }
    }
  }
});

export default theme;