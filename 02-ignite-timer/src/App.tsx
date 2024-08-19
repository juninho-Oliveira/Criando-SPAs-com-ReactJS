import {ThemeProvider} from 'styled-components'
import { Router } from './Routers'
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/Global'


export  function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      < BrowserRouter>
        <Router />
      </BrowserRouter>
      
      <GlobalStyle />
    </ThemeProvider>
  )
}


