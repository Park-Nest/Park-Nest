// Original Footer
// import React from "react";
// import '../styles/footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>Made with ♥️ from the Park Nest Team: Apiraam, Chris, Dane, Derek, and Jesse</p>
//     </footer>
//   )
// }

// export default Footer;


// Material UI Footer Template
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/copyright.jsx';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer2() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '10vh',
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2">
              Made with ♥️ from the Park Nest Team: Apiraam, Chris, Dane, Derek, and Jesse
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}