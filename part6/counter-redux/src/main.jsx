import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { createStore } from 'redux'


const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT": 
      return state - 1
    case "ZERO":
      return 0
    default: 
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <h1>{store.getState()}</h1>
      <button
        onClick={e => store.dispatch({ type: "INCREMENT" })}
      >
        INCREMENT
      </button>
      <button
        onClick={e => store.dispatch({ type: "ZERO" })}
      >
        ZERO
      </button>
      <button
        onClick={e => store.dispatch({ type: "DECREMENT" })}
      >
        DECREMENT
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()

store.subscribe(renderApp)