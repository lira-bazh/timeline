import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import store from '../redux/index.js'
import Home from '../components/home.jsx'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }

  body {
    background: #e5e5e5;
  }
`

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default Root