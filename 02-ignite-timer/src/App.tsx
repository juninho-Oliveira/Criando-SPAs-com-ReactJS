import { ThemeProvider } from 'styled-components'
import { Router } from './Routers'
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/Global'

import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      < BrowserRouter>
      
      < CyclesContextProvider >
        <Router />
      </CyclesContextProvider>
          
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}


