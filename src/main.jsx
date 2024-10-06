import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SnackbarProvider } from 'notistack';
import { Provider } from'react-redux';
import store from './store';
import { BrowserRouter, BrowserRouter as Router } from'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
      <BrowserRouter>
          <App />
          </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </StrictMode>,
)
