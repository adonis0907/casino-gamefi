import { createTheme } from '@mui/material/styles';

import themeTypography from './typography';
import themePalette from './palette';
import componentStyleOveride from './componentStyleOveride';
import customStyles from "./custom";

const theme = createTheme({
  palette: themePalette(),
  typography: themeTypography(),
  components: componentStyleOveride(),
  custom: customStyles()
});

export default theme;