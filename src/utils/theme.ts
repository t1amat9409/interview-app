const Palette = {
  50: '#fbe3e8',
  100: '#f5b9c5',
  200: '#ee8a9e',
  300: '#e75b77',
  400: '#e13759',
  500: '#dc143c',
  600: '#d81236',
  700: '#d30e2e',
  800: '#ce0b27',
  900: '#c5061a',
  A100: '#ffeeef',
  A200: '#ffbbc0',
  A400: '#ff8890',
  A700: '#ff6f78',
  'contrastDefaultColor': 'light',
} as const;

export const Theme = {
  palette: Palette,
  primaryColor: Palette[500],
  primaryLightColor: Palette[200],
  primaryDarkColor: Palette[800],
  mediaQueries: {
    desktop: '@media only screen and (min-width: 769px)',
    dark: '@media (prefers-color-scheme: dark)',
    mobile: '@media only screen and (max-width: 479px)',
    tablet: '@media only screen and (min-width: 600px)',
    huge: '@media only screen and (min-width: 1280px)'
  }
} as const
