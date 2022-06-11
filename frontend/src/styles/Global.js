import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
//import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
