import { Platform } from 'react-native';

const platformFont = Platform.select({
  android: 'Roboto',
  ios: 'Arial',
  default: 'System',
});

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    appBarText: 'white',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 18,
    subheading: 16,
  },
  fonts: {
    main: platformFont,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
