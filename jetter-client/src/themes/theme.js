
import { createTheme } from '@mui/material/styles';
import red from '@mui/material/colors';

// Create a theme instance.
const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#CD5C5C',
    },
    background: {
      default: '#fff',
    },
  },
});

export default DefaultTheme;