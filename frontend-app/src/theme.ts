// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

// Example color palette
const customColors = {
  black: {
    500 : '#000000'
  },
  red : {
    500: '#ff0000'
  },
  darkGreen: {
    500: '#386D7F'
  }
  // Add more color scales as needed
};

// Extend the theme
const theme = extendTheme({
  colors: customColors,
});

export default theme;
