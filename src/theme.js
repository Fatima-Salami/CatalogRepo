import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0B3D91' },
    secondary: { main: '#00A99D' },
    background: { default: '#F4F7FB', paper: '#FFFFFF' },
    text: { primary: '#102A43', secondary: '#6B7280' }
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
        containedPrimary: { boxShadow: '0 8px 18px rgba(11,61,145,0.06)' }
      }
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } }
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 700 }
  }
});

export default theme;