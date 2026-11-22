import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#346243',
      light: '#e0efdc',
      dark: '#264332',
    },
    background: {
      default: '#f8faf7',
      paper: '#ffffff',
    },
    text: {
      primary: '#202720',
      secondary: '#526053',
    },
    divider: '#dce3da',
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    h4: {
      fontSize: '1.75rem',
      fontWeight: 650,
    },
  },
})
