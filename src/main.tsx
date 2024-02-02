import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RoleContext } from 'context/RoleContext';
import store from 'store';

import App from './App';

import 'react-toastify/dist/ReactToastify.min.css';
import 'styles/tailwind.css';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RoleContext>
          <App />
        </RoleContext>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
