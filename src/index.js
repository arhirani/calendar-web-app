import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { enableMapSet } from 'immer'
import store from './app/store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
enableMapSet()
// Pass the store into the Provider
const AppWithStore = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(AppWithStore, document.getElementById('root'))
